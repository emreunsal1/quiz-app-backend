
const admin = [];
let users = [];
const usersResponses = [];

const isRoomExist = (socket, data) => socket.adapter.rooms.has(data.roomKey);
const isUserAlreadyInRoom = (socket, roomKey) => socket.adapter.rooms.get(roomKey).has(socket.id);
const isUsernameExist = (name) => users.some((userName) => userName.name === name);

const emitError = (io, socket, message) => {
  io.to(socket.id).emit('errorMessage', message);
};

const createRoomHandler = (io, socket, roomKey) => {
  socket.join(roomKey);
  io.to(roomKey).emit('userInfo', users.filter((user) => user.roomKey === roomKey));
  admin.push({ roomKey: roomKey, id: socket.id });
};

const joinRoomHandler = (io, socket, data) => {
  const { roomKey, name } = data;

  if (!isRoomExist(socket, data)) {
    return emitError(io, socket, 'böyle bir oda bulunamadı');
  }
  if (isUserAlreadyInRoom(socket, roomKey)) {
    return emitError(io, socket, 'iki kere giriş yapamazsınız :(');
  }
  if (isUsernameExist(name)) {
    return emitError(io, socket, 'aynı isimli kullanıcı içeride var');
  }

  users.push({ id: socket.id, name: name, roomKey: roomKey, score: 0 });
  socket.join(roomKey);
  io.to(roomKey).emit('userInfo', users.filter((user) => user.roomKey === roomKey));
  io.to(socket.id).emit('isLogin', true);
};

const questionsHandler = (io, socket, data) => {
  const question = data;
  const adminRoom = admin.find((admin) => admin.id === socket.id);
  io.to(adminRoom.roomKey).emit('question', question);
};

const answerHandler = (io, socket, data) => {
  const thisUser = users.find((user) => user.id === socket.id);

  if (data) {
    usersResponses.push({ id: socket.id, correct: data.answer.correct });
    if (data.answer.correct === true) {
      const point = 10 * data.timer;
      thisUser.score = thisUser.score += point;
    }
  }
};

const endQuestion = (io, socket, data) => {
  const thisAdmin = admin.find((admin) => admin.id === socket.id);
  const userScoreList = users.filter((user) => user.roomKey === thisAdmin.roomKey);
  io.to(thisAdmin.id).emit('scoreTable', userScoreList);
  usersResponses.map((user) => io.to(user.id).emit('result', user.correct));
};

const disconnectedRoom = (io, socket) => {
  const roomKey = admin.find((_admin) => _admin.id === socket.id).roomKey;
  io.to(roomKey).emit('gameEnded', users.filter((user) => user.roomKey === roomKey));
  io.socketsLeave(roomKey);
  users = users.filter((user) => user.roomKey !== roomKey);
};

const onUserDisconnect = (io, socket) => {
  const user = users.find((user) => user.id === socket.id);
  if (!user) return;
  console.log('geldi');
  users = users.filter((user) => user.id !== socket.id);
  io.to(user.roomKey).emit('userInfo', users.filter((_user) => _user.roomKey === user.roomKey));
};

module.exports = { createRoomHandler, joinRoomHandler, questionsHandler, answerHandler, endQuestion, disconnectedRoom, onUserDisconnect };

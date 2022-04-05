
const admin = [];
const users = [];
const usersResponses = [];

const isRoomExist = (socket, data) => socket.adapter.rooms.has(data.roomKey);
const isUserAlreadyInRoom = (socket, roomKey) => socket.adapter.rooms.get(roomKey).has(socket.id);
const isUsernameExist = (name) => users.some((userName) => userName.name === name);

const emitError = (io, socket, message) => {
  io.to(socket.id).emit('errorMessage', message);
};

const createRoomHandler = (socket, roomKey) => {
  socket.join(roomKey);
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
  socket.to(roomKey).emit('userInfo', users.filter((user) => user.roomKey === roomKey));
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
      thisUser.score = thisUser.score + 1;
    }
  }
};

const endQuestion = (io, socket, data) => {
  const thisAdmin = admin.find((admin) => admin.id === socket.id);
  io.to(thisAdmin.id).emit('scoreTable', users);
  usersResponses.map((user) => io.to(user.id).emit('result', user.correct));
};

module.exports = { createRoomHandler, joinRoomHandler, questionsHandler, answerHandler, endQuestion };

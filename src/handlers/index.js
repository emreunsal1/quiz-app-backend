
const admin = [];
const users = [];
let scoreList = [];

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
  users.push({ id: socket.id, name: name, roomKey: roomKey });

  socket.join(roomKey);
  socket.to(roomKey).emit('userInfo', users.filter((user) => user.roomKey === roomKey));
  io.to(socket.id).emit('isLogin', true);
};

const questionsHandler = (io, socket, data) => {
  const question = data[0];
  const adminRoom = admin.find((admin) => admin.id === socket.id);
  io.to(adminRoom.roomKey).emit('question', question);
};

const answerHandler = (io, socket, data) => {
  const isUserExist = scoreList.some((user) => user.id === socket.id);
  if (!isUserExist) {
    scoreList.push({ userId: socket.id, score: 0 });
  }
  if (data.correct === true) {
    io.to(socket.id).emit('result', 'cevabınız doğru');
    const list = scoreList.filter((user) => user.userId !== socket.id);
    const user = scoreList.find((user) => user.userId === socket.id);
    const newScore = user.score + 1;
    list.push({ userId: user.userId, score: newScore });
    scoreList = list;
  }
  io.emit('scoreTable', scoreList);
};

module.exports = { createRoomHandler, joinRoomHandler, questionsHandler, answerHandler };

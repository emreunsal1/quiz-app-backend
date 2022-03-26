const { createRoomHandler, joinRoomHandler, questionsHandler, answerHandler } = require('../handlers');

const connectionController = (io, socket) => {
  socket.on('createRoom', (roomKey) => createRoomHandler(socket, roomKey));

  socket.on('joinRoom', (data) => joinRoomHandler(io, socket, data));

  socket.on('showQuestions', (data) => questionsHandler(io, socket, data));

  socket.on('answer', (data) => answerHandler(io, socket, data));
};

module.exports = { connectionController };

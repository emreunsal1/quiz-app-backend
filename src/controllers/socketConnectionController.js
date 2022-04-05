const { createRoomHandler, joinRoomHandler, questionsHandler, answerHandler, endQuestion } = require('../handlers');

const connectionController = (io, socket) => {
  socket.on('createRoom', (roomKey) => createRoomHandler(socket, roomKey));

  socket.on('joinRoom', (data) => joinRoomHandler(io, socket, data));

  socket.on('showQuestions', (data) => questionsHandler(io, socket, data));

  socket.on('answer', (data) => answerHandler(io, socket, data));

  socket.on('questionend', (data) => endQuestion(io, socket, data));
};

module.exports = { connectionController };

const socket = require('socket.io');
const express = require('express');
require('dotenv').config();
const { indexRouter } = require('./router/indexRouter');
const { connectDB } = require('./database/connectToDatabase');

const app = express();
const http = require('http').Server(app);

app.use(express.json());
const users = [];
const io = socket(http);
io.on('connection', (socket) => {
  socket.on('joinRoom', (data) => {
    socket.join(data.roomKey);
    users.push({ name: data.name, id: socket.id, roomKey: data.roomKey });
    const filtersUsers = users.filter((user) => user.roomKey === data.roomKey);
    io.to(data.roomKey).emit('studentJoined', filtersUsers);
  });

  socket.on('createRoom', (data) => {
    const roomKey = data.roomKey;
    socket.join(roomKey);
    io.emit('roomCreated', { roomKey });
  });
});

connectDB();
app.use('/', indexRouter);
http.listen(process.env.PORT);

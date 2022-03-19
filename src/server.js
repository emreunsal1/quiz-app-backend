const socket = require('socket.io');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { indexRouter } = require('./router/indexRouter');
const { connectDB } = require('./database/connectToDatabase');

const app = express();
const http = require('http').Server(app);

app.use(express.json());
app.use(cors());

const io = socket(http);
io.on('connection', (socket) => {
  socket.on('createRoom', (roomKey) => {
    socket.join(roomKey);
    console.log(roomKey);
  });

  socket.on('joinRoom', (roomKey) => {
    if (!socket.adapter.rooms.has(roomKey)) { return console.log('olmadı'); }
    socket.join(roomKey);
    console.log(roomKey);
  });
  socket.on('cevap1', (data) => {
    const room = Array.from(socket.adapter.sids.get(socket.id))[1];
    console.log(socket.adapter.rooms);
    // console.log(socket.id);
    socket.to(room).emit('cevap1', data);
  });
});

connectDB();
app.use('/', indexRouter);
http.listen(process.env.PORT);

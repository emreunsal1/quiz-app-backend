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

// const users = [];
// const io = socket(http);
// io.on('connection', (socket) => {
//   socket.on('joinRoom', (data) => {
//     socket.join(data.roomKey);
//     users.push({ name: data.name, id: socket.id, roomKey: data.roomKey });
//     const filtersUsers = users.filter((user) => user.roomKey === data.roomKey);
//     io.to(data.roomKey).emit('studentJoined', filtersUsers);
//     const userId = io.sockets.adapter.rooms.get(data.roomKey);
//     console.log(userId);
//   });

//   socket.on('createRoom', (data) => {
//     const roomKey = data.roomKey;
//     socket.join(roomKey);
//     io.emit('roomCreated', { roomKey });
//   });
// });

connectDB();
app.use('/', indexRouter);
http.listen(process.env.PORT);

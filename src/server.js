const express = require('express');
const socket = require('socket.io');
const { indexRouter } = require('./router/indexRouter');
const { connectDB } = require('./database/connectToDatabase');

const app = express();

const server = app.listen(3000);
const io = socket(server);
io.on('connection', (socket) => {
  console.log(socket.id);
});

app.use(express.json());
connectDB();
app.use('/', indexRouter);
app.get('/', (req, res) => {
  res.sendFile('./web/index.html', { root: __dirname });
});

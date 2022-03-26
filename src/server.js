const socketio = require('socket.io');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { indexRouter } = require('./router/indexRouter');
const { connectDB } = require('./database/connectToDatabase');
const { connectionController } = require('./controllers/socketConnectionController');

const app = express();
const http = require('http').Server(app);

app.use(express.json());
app.use(cors());

const io = socketio(http);

io.on('connection', (socket) => connectionController(io, socket));

connectDB();
app.use('/', indexRouter);
http.listen(process.env.PORT);

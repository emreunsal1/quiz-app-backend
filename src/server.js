const express = require('express');
const { indexRouter } = require('./router/indexRouter');
const { connectDB } = require('./database/connectToDatabase');

const app = express();

app.listen(3000);
app.use(express.json());
connectDB();
app.use('/', indexRouter);

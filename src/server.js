const express = require("express");
const { indexRouter } = require("./router/indexRouter");
const { connectDB } = require("./db");

const app = express();

app.listen(3000);
app.use(express.json());
connectDB();
app.use("/", indexRouter);

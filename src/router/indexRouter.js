const express = require("express");
const { questionRouter } = require("./questionsRouter");
const { userRouter } = require("./userRouter");
const indexRouter = express.Router();

indexRouter.use("/user", userRouter);
indexRouter.use("/question", questionRouter);

module.exports = { indexRouter };

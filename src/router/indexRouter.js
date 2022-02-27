const express = require("express");
const { listRouter } = require("./listRouter");
const { questionRouter } = require("./questionsRouter");
const { userRouter } = require("./userRouter");
const indexRouter = express.Router();

indexRouter.use("/user", userRouter);
indexRouter.use("/question", questionRouter);
indexRouter.use("/list", listRouter);

module.exports = { indexRouter };

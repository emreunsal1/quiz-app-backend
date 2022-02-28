const express = require("express");
const { jsonWebTokenControl } = require("../auth");
const { authRouter } = require("./authRouter");
const { listRouter } = require("./listRouter");
const { questionRouter } = require("./questionsRouter");
const { userRouter } = require("./userRouter");
const indexRouter = express.Router();

indexRouter.use("/user", jsonWebTokenControl, userRouter);
indexRouter.use("/question", questionRouter);
indexRouter.use("/list", listRouter);
indexRouter.use("/auth", authRouter);

module.exports = { indexRouter };

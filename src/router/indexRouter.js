const express = require("express");
const { userRouter } = require("./userRouter");
const indexRouter = express.Router();

indexRouter.use("/user", userRouter);

module.exports = { indexRouter };

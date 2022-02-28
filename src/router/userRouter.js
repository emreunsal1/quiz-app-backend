const express = require("express");
const { jsonWebTokenControl } = require("../auth");

const userRouter = express.Router();

userRouter.post("/post", jsonWebTokenControl, (req, res) => {
  res.send("token geldi ");
});

module.exports = { userRouter };

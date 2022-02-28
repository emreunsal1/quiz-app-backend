const express = require("express");
const { jsonWebTokenControl } = require("../auth");
const {
  addUserController,
  loginUserController,
} = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post("/register", addUserController);
userRouter.post("/login", loginUserController);
userRouter.post("/post", jsonWebTokenControl, (req, res) => {
  res.send("token geldi ");
});

module.exports = { userRouter };

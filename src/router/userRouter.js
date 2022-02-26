const express = require("express");
const { addUserController } = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post("/register", addUserController);

module.exports = { userRouter };

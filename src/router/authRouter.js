const express = require('express');
const {
  addUserController,
  loginUserController
} = require('../controllers/userController');

const authRouter = express.Router();

authRouter.post('/register', addUserController);
authRouter.post('/login', loginUserController);

module.exports = { authRouter };

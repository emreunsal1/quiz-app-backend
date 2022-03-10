const { checkUserExists, addUser } = require('../models/usersModel');
const { config } = require('dotenv');
const { createToken } = require('../utils/token');
config();

const addUserController = async (req, res) => {
  const { username, password } = req.body;
  const user = await checkUserExists({ username });
  if (!user) {
    const newUser = await addUser({ username, password });
    const userId = newUser._id;
    const token = createToken({ username, userId });
    return res.send({ token });
  }
  res.send('kaydedilemedi');
};

const loginUserController = async (req, res) => {
  const { username, password } = req.body;

  const user = await checkUserExists({ username, password });
  const userId = user._id;
  if (!user) {
    return res.status(404).send({
      error: true,
      message: 'user not found'
    });
  }
  const token = createToken({ username, userId });
  res.send({ token });
};

module.exports = { addUserController, loginUserController };

const { checkUserExists, addUser } = require('../models/usersModel');
const { config } = require('dotenv');
const { createToken } = require('../utils/token');
config();

const addUserController = async (req, res) => {
  const { username, password } = req.body;
  const user = await checkUserExists({ username });
  if (!user) {
    const newUser = await addUser({ username, password });
    return res.send(newUser);
  }
  res.send('kaydedilemedi');
};

const loginUserController = async (req, res) => {
  const { username, password } = req.body;
  const user = await checkUserExists({ username, password });

  if (!user) {
    return res.status(404).send({
      error: true,
      message: 'user not found'
    });
  }

  const token = createToken({ username });
  res.send({ token });
};

module.exports = { addUserController, loginUserController };

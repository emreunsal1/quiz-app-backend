const mongoose = require('mongoose');

const user = new mongoose.Schema(
  {
    username: String,
    password: String
  },
  { timestamps: true }
);
const userModel = mongoose.model('users', user);

const addUser = async (user) => {
  try {
    return await userModel.create(user);
  } catch (err) {
    console.log(err);
    return false;
  }
};

const checkUserExists = async (query) => {
  const foundUser = await userModel.findOne(query);
  return foundUser || false;
};

module.exports = { userModel, checkUserExists, addUser };

const { addUser } = require("../models/usersModel");

const addUserController = (req, res) => {
  const user = req.body;
  addUser(user);
  res.send("Complete user register");
};

module.exports = { addUserController };

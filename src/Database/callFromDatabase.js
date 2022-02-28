const { userModel } = require("../models/usersModel");
const { listModel } = require("../models/listModel");
const { questionModel } = require("../models/questionModel");

const userControl = async (username, password) => {
  const data = await userModel.find({ username: username, password: password });
  console.log(data);
};

module.exports = { userControl };

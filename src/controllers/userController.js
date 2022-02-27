const { getAllUser } = require("../Database/callFromDatabase");
const { addUser } = require("../Database/writeToDatabase");

const addUserController = (req, res) => {
  const user = req.body;
  addUser(user);
};

module.exports = { addUserController };

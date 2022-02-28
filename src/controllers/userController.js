const jwt = require("jsonwebtoken");
const { userControl } = require("../Database/callFromDatabase");
const { addUser } = require("../Database/writeToDatabase");

const addUserController = (req, res) => {
  const user = req.body;
  addUser(user);
};

const loginUserController = (req, res) => {
  const { username, password } = req.body;
  userControl(username, password);
  const token = jwt.sign(
    {
      username: username,
      exp: Math.floor(Date.now() / 1000) + 60,
    },
    "secretkey"
  );
  res.send(token);
};

module.exports = { addUserController, loginUserController };

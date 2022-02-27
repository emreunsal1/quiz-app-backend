const mongoose = require("mongoose");

const user = new mongoose.Schema({
  username: String,
  password: String,
});
const userModel = mongoose.model("users", user);
module.exports = { userModel };

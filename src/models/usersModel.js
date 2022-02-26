const mongoose = require("mongoose");

const user = new mongoose.Schema({
  username: String,
  password: String,
});
const userModel = mongoose.model("users", user);

const addUser = (userJson) => {
  const newUsers = new userModel(userJson);

  newUsers.save((error) => {
    if (error) {
      console.log("hata");
    } else {
      console.log("kaydedildi yupiii");
    }
  });
};

module.exports = { addUser };

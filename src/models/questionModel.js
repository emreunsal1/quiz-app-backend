const mongoose = require("mongoose");

const questions = new mongoose.Schema({
  listId: String,
  question: String,
  options: [{ optionsContent: String, correct: Boolean }],
});
const questionModel = mongoose.model("questions", questions);

module.exports = { questionModel };

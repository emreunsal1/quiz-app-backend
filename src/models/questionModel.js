const mongoose = require("mongoose");

const questions = new mongoose.Schema(
  {
    listId: String,
    question: String,
    options: [{ optionsContent: String, correct: Boolean }],
  },
  { timestamps: true }
);
const questionModel = mongoose.model("questions", questions);

module.exports = { questionModel };

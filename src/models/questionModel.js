const mongoose = require("mongoose");

const questions = new mongoose.Schema({
  listId: String,
  question: String,
  options: [{ optionsContent: String, correct: Boolean }],
});
const questionModel = mongoose.model("questions", questions);

const addQuestion = (questionJson) => {
  const newQuestion = new questionModel(questionJson);

  newQuestion.save((error) => {
    if (error) {
      console.log("hata");
    } else {
      console.log("kaydedildi yupiii");
    }
  });
};

module.exports = { addQuestion };

const mongoose = require('mongoose');

const questions = new mongoose.Schema(
  {
    listId: String,
    question: String,
    options: [{ optionsContent: String, correct: Boolean }]
  },
  { timestamps: true }
);
const QuestionModel = mongoose.model('questions', questions);

const addQuestion = (questionJson) => {
  const newQuestion = new QuestionModel(questionJson);

  newQuestion.save((error) => {
    if (error) {
      console.log('hata');
    } else {
      console.log('kaydedildi yupiii');
    }
  });
};

module.exports = { addQuestion };

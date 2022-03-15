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

const addQuestion = async (questionJson) => {
  const newQuestion = await QuestionModel.create(questionJson.question);
  return newQuestion || false;
};

const getQestionWithListId = async (listId) => {
  const questions = await QuestionModel.find(listId);
  return questions || false;
};

module.exports = { addQuestion, getQestionWithListId };

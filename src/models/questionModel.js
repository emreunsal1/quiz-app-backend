const mongoose = require('mongoose');

const questions = new mongoose.Schema(
  {
    listId: String,
    question: String,
    options: [{ optionsContent: String, correct: Boolean }],
    time: Number
  },
  { timestamps: true }
);
const QuestionModel = mongoose.model('questions', questions);

const addQuestion = async (questionJson) => {
  const newQuestion = await QuestionModel.create(questionJson.question);
  return newQuestion || false;
};

const deleteQuestion = async (questionsId) => {
  const questions = questionsId.split(',');
  const response = await QuestionModel.deleteMany({ _id: { $in: questions } });
  return response;
};

const deleteListWithQestion = async (listId) => {
  await QuestionModel.deleteMany({ listId: listId });
};

const getQestionWithListId = async (listId) => {
  const questions = await QuestionModel.find(listId);
  return questions || false;
};

module.exports = { addQuestion, getQestionWithListId, deleteQuestion, deleteListWithQestion };

const { addQuestion } = require('../models/QuestionModel');

const addQuestionController = (req, res) => {
  const question = req.body;
  addQuestion(question);
  res.send('completed add question');
};

const getQuestionsWithListId = (req, res) => {
  const listId = req.params;
  res.send(listId);
};

module.exports = { addQuestionController, getQuestionsWithListId };

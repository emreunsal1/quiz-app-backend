const { addQuestion, getQestionWithListId } = require('../models/QuestionModel');

const addQuestionController = (req, res) => {
  const question = req.body;
  addQuestion(question);
  res.send('completed add question');
};

const listBesideQuestion = async (req, res) => {
  const listId = req.params;
  const response = await getQestionWithListId(listId);
  if (!response) {
    return res.status(404).send({
      error: true,
      message: 'hiç soru bulunamadı'
    });
  }
  res.send(response);
};

module.exports = { addQuestionController, listBesideQuestion };

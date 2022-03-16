const { addQuestion, getQestionWithListId, deleteQuestion } = require('../models/QuestionModel');

const addQuestionController = async (req, res) => {
  const question = req.body;
  const isAdd = await addQuestion(question);
  if (!isAdd) {
    return res.status(404).send({ message: 'question not add to database', error: true });
  }
  return res.send('add question');
};

const deleteQuestionController = async (req, res) => {
  const { questionId } = req.params;
  const response = await deleteQuestion(questionId);
  res.send(response);
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

module.exports = { addQuestionController, listBesideQuestion, deleteQuestionController };

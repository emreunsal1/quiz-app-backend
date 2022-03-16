const {
  addQuestionController,
  listBesideQuestion,
  deleteQuestionController
} = require('../controllers/questionController');

const questionRouter = require('express').Router();

questionRouter.post('/add', addQuestionController);
questionRouter.get('/:listId', listBesideQuestion);
questionRouter.delete('/delete/:questionId', deleteQuestionController);

module.exports = { questionRouter };

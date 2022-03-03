const {
  addQuestionController,
  listBesideQuestion
} = require('../controllers/questionController');

const questionRouter = require('express').Router();

questionRouter.post('/add', addQuestionController);
questionRouter.get('/:listId', listBesideQuestion);

module.exports = { questionRouter };

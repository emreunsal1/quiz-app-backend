const {
  addNewListController,
  getAllListCOntroller
} = require('../controllers/listController');

const listRouter = require('express').Router();

listRouter.post('/new', addNewListController);
listRouter.get('/all', getAllListCOntroller);

module.exports = { listRouter };

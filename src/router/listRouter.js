
const {
  addNewListController,
  getAllListController
} = require('../controllers/listController');

const listRouter = require('express').Router();

listRouter.post('/new', addNewListController);
listRouter.get('/', getAllListController);

module.exports = { listRouter };

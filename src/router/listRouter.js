
const {
  addNewListController,
  getAllListController,
  deleteListController,
  editListController
} = require('../controllers/listController');

const listRouter = require('express').Router();

listRouter.get('/', getAllListController);
listRouter.post('/', addNewListController);
listRouter.delete('/:listid', deleteListController);
listRouter.put('/:listid', editListController);

module.exports = { listRouter };

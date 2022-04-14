
const {
  addNewListController,
  getAllListController,
  deleteListController,
  editListController
} = require('../controllers/listController');

const listRouter = require('express').Router();

listRouter.get('/', getAllListController);
listRouter.post('/new', addNewListController);
listRouter.delete('/delete/:listid', deleteListController);
listRouter.post('/edit', editListController);

module.exports = { listRouter };

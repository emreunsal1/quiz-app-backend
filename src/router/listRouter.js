
const {
  addNewListController,
  getAllListController,
  deleteListController
} = require('../controllers/listController');

const listRouter = require('express').Router();

listRouter.get('/', getAllListController);
listRouter.post('/new', addNewListController);
listRouter.delete('/delete/:listid', deleteListController);

module.exports = { listRouter };

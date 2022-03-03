const { jsonWebTokenControl } = require('../auth');

const {
  addNewListController,
  getAllListController
} = require('../controllers/listController');

const listRouter = require('express').Router();

listRouter.post('/new', jsonWebTokenControl, addNewListController);
listRouter.get('/', jsonWebTokenControl, getAllListController);

module.exports = { listRouter };

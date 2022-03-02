const { addList, checkListExist } = require('../models/ListModel');

const addNewListController = async (req, res) => {
  const { name } = req.body;
  const token = req.token;
  const { userId } = token;

  const checkList = await checkListExist({ userId, name });
  if (checkList) {
    return res.status('401').send({
      error: true,
      message: 'name must be unique'
    });
  }
  const response = await addList({ userId, name });
  if (!response) {
    return res.status(404).send({
      message: 'liste eklenemedi',
      error: true
    });
  }
  res.send('added new list');
};

const getAllListController = (req, res) => {};

module.exports = { addNewListController, getAllListController };

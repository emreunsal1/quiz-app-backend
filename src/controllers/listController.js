const { addList, checkListExist, getUserLists } = require('../models/ListModel');

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

const getAllListController = async (req, res) => {
  const token = req.token;
  const response = await getUserLists(token.userId);

  if (!response) {
    return res.status(401).send({
      message: 'liste bulunmadı',
      error: true
    });
  }
  res.send(response);
};

module.exports = { addNewListController, getAllListController };

const { addList, checkListExist, getUserLists, deleteList } = require('../models/ListModel');

const addNewListController = async (req, res) => {
  const { name } = req.body;
  const token = req.token;
  const { userId } = token;

  const checkList = await checkListExist({ userId, name });
  if (checkList) {
    return res.status('400').send({
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

const deleteListController = async (req, res) => {
  const { listid } = req.params;
  const response = await deleteList(listid);
  if (!response) {
    return res.status(404).send({ message: 'Fail to delete list', error: 'true' });
  }
  return res.send('list deleted');
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
  const data = response.map((list) => {
    list.userId = undefined;
    return list;
  });
  res.send(data);
};

module.exports = { addNewListController, getAllListController, deleteListController };

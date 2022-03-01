const { addList } = require('../models/ListModel');

const addNewListController = async (req, res) => {
  const { userId, name } = req.body;
  const response = await addList({ userId, name });
  console.log(response);
  if (!response) {
    return res.status(404).send({
      message: 'liste eklenemedi',
      error: true
    });
  }
  res.send(response);
};

const getAllListCOntroller = (req, res) => {};

module.exports = { addNewListController, getAllListCOntroller };

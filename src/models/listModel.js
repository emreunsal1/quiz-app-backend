const mongoose = require('mongoose');
const list = new mongoose.Schema(
  {
    userId: String,
    name: String
  },
  { timestamps: true }
);

const ListModel = mongoose.model('questionsList', list);

const addList = async (list) => {
  const newList = await ListModel.create(list);
  return newList || false;
};

const checkListExist = async (listInfo) => {
  const list = await ListModel.findOne(listInfo).exec();
  return list || false;
};

module.exports = { addList, checkListExist };

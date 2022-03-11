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
const checkListExist = (userInfo) => {
  const list = ListModel.findOne(userInfo).exec();
  return list;
};

const deleteList = async (listId) => {
  const list = listId.split(',');
  const response = await ListModel.deleteMany({ _id: { $in: list } });
  console.log(response);
  return response;
};

const getUserLists = async (userId) => {
  const data = await ListModel.find({ userId }).exec();
  return data || false;
};

module.exports = { addList, getUserLists, checkListExist, deleteList };

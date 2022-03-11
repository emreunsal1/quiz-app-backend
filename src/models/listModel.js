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
  const response = await ListModel.deleteOne({ _id: listId }, (err) => {
    if (err) {
      return false;
    }
    return true;
  });
  return response;
};

const getUserLists = async (userId) => {
  const data = await ListModel.find({ userId }).exec();
  return data || false;
};

module.exports = { addList, getUserLists, checkListExist, deleteList };

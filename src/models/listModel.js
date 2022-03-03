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

const getUserLists = async (userId) => {
  const data = await ListModel.find({ userId }).exec();
  return data || false;
};

module.exports = { addList, getUserLists, checkListExist };

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

module.exports = { addList };

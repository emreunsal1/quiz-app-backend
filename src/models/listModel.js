const mongoose = require("mongoose");
const list = new mongoose.Schema(
  {
    userId: String,
    name: String,
  },
  { timestamps: true }
);

const listModel = mongoose.model("questionsList", list);
module.exports = { listModel };

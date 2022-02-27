const { addQuestion } = require("../models/questionModel");

const addQuestionController = (req, res) => {
  const question = req.body;
  addQuestion(question);
  res.send("completed add question");
};

module.exports = { addQuestionController };

const {
  addQuestionController,
  getQuestionsWithListId,
} = require("../controllers/questionController");

const questionRouter = require("express").Router();

questionRouter.post("/add", addQuestionController);
questionRouter.get("/:listId", getQuestionsWithListId);

module.exports = { questionRouter };

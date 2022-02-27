const { addQuestionController } = require("../controllers/questionController");

const questionRouter = require("express").Router();

questionRouter.post("/add", addQuestionController);

module.exports = { questionRouter };

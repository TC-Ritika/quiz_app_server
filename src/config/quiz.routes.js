const express = require("express");
const { quizController } = require("../api/controller");
const {
  supremeAuthenticate,
  adminAuthenticate,
} = require("../middleware/access.authenticate");

const quizRouter = express.Router();

quizRouter.get("/", quizController.getAllQuiz);
quizRouter.get("/:id", quizController.getQuiz);
quizRouter.post("/add", adminAuthenticate, quizController.addQuiz);
quizRouter.patch("/:id", supremeAuthenticate, quizController.updateQuiz);
quizRouter.delete("/:id", supremeAuthenticate, quizController.deleteQuiz);

module.exports = {
  quizRouter,
};

const mongoose = require("mongoose");
const { Quiz } = require("../model/quiz.model");

// get quiz list
const getAllQuiz = async (req, res) => {
  try {
    // Retrieve all quizzes from the database
    const quizList = await Quiz.find({});

    // Check if there are no quiz yet
    if (!quizList || quizList.length === 0) {
      return res.status(404).json({
        message: "No quiz is added",
      });
    }

    // Send successful response with quizList
    return res.status(200).json({
      message: "QuizList retrieved successfully",
      data: quizList,
    });
  } catch (error) {
    return res.status(500).json({
      message: "server error",
      error: error.message,
    });
  }
};

// get one quiz
const getQuiz = async (req, res) => {
  try {
    let id = req.params.id;

    // Validate the provided ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid Quiz ID format",
      });
    }

    // Retrieve quiz from the database
    const quizDoc = await Quiz.findOne({ _id: id });

    // Check if there are no quiz yet
    if (!quizDoc) {
      return res.status(404).json({
        message: "No quiz found with ID",
      });
    }

    // Send successful response with quizList
    return res.status(200).json({
      message: "Quiz retrieved successfully",
      data: quizDoc,
    });
  } catch (error) {
    return res.status(500).json({
      message: "server error",
      error: error.message,
    });
  }
};

// add quiz
const addQuiz = async (req, res) => {
  try {
    const { title, description, questions } = req.body;
    // Ensure minimum 5 questions
    if (!questions || questions.length < 5) {
      return res.status(400).json({
        message: "A quiz must have at least 5 questions",
      });
    }

    const existingQuizDoc = await Quiz.findOne({ title });

    // if doc is not null
    if (existingQuizDoc) {
      return res.status(400).json({
        message: "Quiz already exist with same Title",
      });
    }

    let quizBody = {
      _id: new mongoose.Types.ObjectId(),
      title,
      description,
      questions,
    };
    console.log(JSON.stringify(quizBody));
    // Add the Quiz
    await Quiz.create(quizBody);
    // Send success response
    return res.status(200).json({
      message: "Quiz added successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "server error",
      error: error.message,
    });
  }
};

// Update Quiz
const updateQuiz = async (req, res) => {
  try {
    const id = req.params.id;
    const { questions } = req.body;
    const updatedQuizDoc = await Quiz.findOneAndUpdate(
      { _id: id },
      { questions },
      { new: true }
    );

    // check if it is null
    if (!updatedQuizDoc) {
      return res.status(404).json({
        message: "Entry not found on id",
      });
    }

    // Send success response
    return res.status(200).json({
      message: "Quiz updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "server error",
      error: error.message,
    });
  }
};

// delete quiz
const deleteQuiz = async (req, res) => {
  try {
    const id = req.params.id;

    // delete record from DB
    const deletedQuiz = await Quiz.findByIdAndDelete(id);
    if (!deletedQuiz) {
      return res.status(404).json({
        message: "Entry not found on id",
      });
    }

    // Send success response
    return res.status(200).json({
      message: "Quiz deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "server error",
      error: error.message,
    });
  }
};

module.exports = { getAllQuiz, addQuiz, updateQuiz, deleteQuiz, getQuiz };

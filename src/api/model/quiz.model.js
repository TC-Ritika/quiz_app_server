const mongoose = require("mongoose");
const { QUIZ } = require("../../utils/constants");
const Schema = mongoose.Schema;
const QuizSchema = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    questions: [
      {
        questionText: {
          type: String,
          required: true,
        },
        options: {
          type: [String],
          validate: {
            validator: function (v) {
              return v.length >= 4; // Ensure at least 4 options
            },
            message: "A question must have at least 4 options.",
          },
          required: true,
        },
        correctAnswer: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields);
);

// Custom validation for minimum 5 questions
QuizSchema.path("questions").validate(function (value) {
  return value.length >= 5;
}, "A quiz must have at least 5 questions.");

const Quiz = mongoose.model(QUIZ, QuizSchema);
module.exports = { Quiz };

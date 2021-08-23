const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionSchema = new Schema(
  {
    content: String,
    answers: Array,
    correct: Array,
    timer: {
      type: Number,
      min: 30,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    point: {
      type: Number,
      min: 0,
      max: 10,
    },
    scored: {
      type: Number,
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Question", QuestionSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuizSchema = new Schema({
  questions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    unique: true,
  },
});

module.exports = mongoose.model("Quiz", QuizSchema);

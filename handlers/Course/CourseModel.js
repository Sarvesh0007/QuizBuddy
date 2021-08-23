const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    quiz: {
      type: Schema.Types.ObjectId,
      ref: "Quiz",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", CourseSchema);

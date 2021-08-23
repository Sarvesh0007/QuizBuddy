const CourseModel = require("../Course/CourseModel.js");
const QuizModel = require("./QuizModel.js");

/**
 * QuizController.js
 *
 * @description :: Server-side logic for managing Quizs.
 */
module.exports = {
  /**
   * QuizController.list()
   */
  list: function (req, res) {
    QuizModel.find(function (err, Quizs) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting Quiz.",
          error: err,
        });
      }

      return res.json(Quizs);
    });
  },

  /**
   * QuizController.show()
   */
  show: function (req, res) {
    const id = req.params.id;

    QuizModel.findOne({ _id: id })
      .populate("questions")
      .exec(function (err, Quiz) {
        if (err) {
          return res.status(500).json({
            message: "Error when getting Quiz.",
            error: err,
          });
        }

        if (!Quiz) {
          return res.status(404).json({
            message: "No such Quiz",
          });
        }
        console.log(Quiz);

        return res.render("Quiz/dash", { quiz: Quiz });
      });
  },

  /**
   * QuizController.create()
   */
  create: function (req, res) {
    const Quiz = new QuizModel({
      questions: req.body.questions,
      course: req.body.course,
    });

    Quiz.save(function (err, Quiz) {
      if (err) {
        console.log(err);

        return res.redirect("/courses");
      }

      CourseModel.findByIdAndUpdate(
        req.body.course,
        { quiz: Quiz._id },
        { new: true },
        (err, Course) => {
          if (err) {
            console.log(err);
            return res.redirect("/courses");
          }
          return res.redirect("/courses");
        }
      );
    });
  },

  /**
   * QuizController.update()
   */
  update: function (req, res) {
    const id = req.params.id;

    QuizModel.findOne({ _id: id }, function (err, Quiz) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting Quiz",
          error: err,
        });
      }

      if (!Quiz) {
        return res.status(404).json({
          message: "No such Quiz",
        });
      }

      Quiz.questions = req.body.questions ? req.body.questions : Quiz.questions;
      Quiz.course = req.body.course ? req.body.course : Quiz.course;

      Quiz.save(function (err, Quiz) {
        if (err) {
          return res.status(500).json({
            message: "Error when updating Quiz.",
            error: err,
          });
        }

        return res.json(Quiz);
      });
    });
  },

  /**
   * QuizController.remove()
   */
  remove: function (req, res) {
    const id = req.params.id;

    QuizModel.findByIdAndRemove(id, function (err, Quiz) {
      if (err) {
        return res.status(500).json({
          message: "Error when deleting the Quiz.",
          error: err,
        });
      }

      return res.status(204).json();
    });
  },
  attempt: function (req, res) {
    const sutdentid = req.user._id;
    const quiz = req.body.quiz;
    delete req.body["quiz"];
    const answers = req.body;
    console.log(answers);
    // fetch quiz
    QuizModel.findById(quiz)
      .populate("questions")
      .exec((err, quiz) => {
        let scored = 0;
        let totalScore = 0;
        quiz.questions.map((question, index) => {
         question.correct =  question.correct.map(ans => ans.toLowerCase())
          totalScore += question.point;
          console.log(question.correct[0], answers[`answers-${index}`]);
          if (question.correct.length === 1) {
            if (question.correct[0] === answers[`answers-${index}`]) {
              scored += question.point;
              console.log(question.point, scored);
            }
          } else {
            if (question.correct.equals(answers[`answers-${index}`])) {
              scored += question.point;
              console.log(question.point, scored);
            }
          }
        });
        console.log(scored);
        return res.render("quiz/result", {
          scored: scored,
          totalScore: totalScore,
        });
      });
  },
};

// Warn if overriding existing method
if (Array.prototype.equals)
  console.warn(
    "Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code."
  );
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
  // if the other array is a falsy value, return
  if (!array) return false;

  // compare lengths - can save a lot of time
  if (this.length != array.length) return false;

  for (var i = 0, l = this.length; i < l; i++) {
    // Check if we have nested arrays
    if (this[i] instanceof Array && array[i] instanceof Array) {
      // recurse into the nested arrays
      if (!this[i].equals(array[i])) return false;
    } else if (this[i] != array[i]) {
      // Warning - two different object instances will never be equal: {x:20} != {x:20}
      return false;
    }
  }
  return true;
};
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", { enumerable: false });

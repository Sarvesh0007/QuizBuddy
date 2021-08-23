const QuizModel = require("../Quiz/QuizModel.js");
const QuestionModel = require("./QuestionModel.js");

/**
 * QuestionController.js
 *
 * @description :: Server-side logic for managing Questions.
 */
module.exports = {
  /**
   * QuestionController.list()
   */
  list: function (req, res) {
    QuestionModel.find(function (err, Questions) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting Question.",
          error: err,
        });
      }

      return res.json(Questions);
    });
  },

  /**
   * QuestionController.show()
   */
  show: function (req, res) {
    const id = req.params.id;

    QuestionModel.findOne({ _id: id }, function (err, Question) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting Question.",
          error: err,
        });
      }

      if (!Question) {
        return res.status(404).json({
          message: "No such Question",
        });
      }

      return res.json(Question);
    });
  },

  /**
   * QuestionController.create()
   */
  create: function (req, res) {
    const Question = new QuestionModel({
      content: req.body.content,
      answers: req.body.answers.split(","),
      correct: req.body.correct.split(","),
      timer: req.body.timer,
      point: req.body.point,
      disabled: req.body.disabled,
    });

    Question.save(function (err, Question) {
      if (err) {
        return res.status(500).json({
          message: "Error when creating Question",
          error: err,
        });
      }
      QuizModel.findByIdAndUpdate(
        req.body.quiz,
        {
          $push: { questions: Question._id },
        },
        { new: true, upsert: true },
        (err, Quiz) => {
          if (err) {
            console.log(err);
            return res.render("/courses");
          }
          return res.render("/courses");
        }
      );

      return res.redirect("/courses");
    });
  },

  /**
   * QuestionController.update()
   */
  update: function (req, res) {
    const id = req.params.id;

    QuestionModel.findOne({ _id: id }, function (err, Question) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting Question",
          error: err,
        });
      }

      if (!Question) {
        return res.status(404).json({
          message: "No such Question",
        });
      }

      Question.content = req.body.content ? req.body.content : Question.content;
      Question.answers = req.body.answers ? req.body.answers : Question.answers;
      Question.correct = req.body.correct ? req.body.correct : Question.correct;
      Question.timer = req.body.timer ? req.body.timer : Question.timer;
      Question.disabled = req.body.disabled
        ? req.body.disabled
        : Question.disabled;

      Question.save(function (err, Question) {
        if (err) {
          return res.status(500).json({
            message: "Error when updating Question.",
            error: err,
          });
        }

        return res.json(Question);
      });
    });
  },

  /**
   * QuestionController.remove()
   */
  remove: function (req, res) {
    const id = req.params.id;

    QuestionModel.findByIdAndRemove(id, function (err, Question) {
      if (err) {
        return res.status(500).json({
          message: "Error when deleting the Question.",
          error: err,
        });
      }

      return res.status(204).json();
    });
  },
};

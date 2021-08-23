const CourseModel = require("./CourseModel.js");

/**
 * CourseController.js
 *
 * @description :: Server-side logic for managing Courses.
 */
module.exports = {
  /**
   * CourseController.list()
   */
  list: function (req, res) {
    if (req.user.role === "TEACHER") {
      CourseModel.find({ owner: req.user._id })
        .populate("owner")
        .exec(function (err, Courses) {
          if (err) {
            return res.status(500).json({
              message: "Error when getting Course.",
              error: err,
            });
          }

          return res.render("course/dash", { courses: Courses });
        });
    } else {
      CourseModel.find()
        .populate("owner")
        .exec(function (err, Courses) {
          if (err) {
            return res.status(500).json({
              message: "Error when getting Course.",
              error: err,
            });
          }

          return res.render("course/dash", { courses: Courses });
        });
    }
  },

  /**
   * CourseController.show()
   */
  show: function (req, res) {
    const id = req.params.id;

    CourseModel.findOne({ _id: id }, function (err, Course) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting Course.",
          error: err,
        });
      }

      if (!Course) {
        return res.status(404).json({
          message: "No such Course",
        });
      }

      return res.json(Course);
    });
  },

  /**
   * CourseController.create()
   */
  create: function (req, res) {
    const Course = new CourseModel({
      name: req.body.name,
      owner: req.body.owner,
      quiz: req.body.quiz,
    });
    Course.save(function (err, Course) {
      if (err) {
        console.log(err);
        return res.redirect("/courses");
      }

      return res.redirect("/courses");
    });
  },

  /**
   * CourseController.update()
   */
  update: function (req, res) {
    const id = req.params.id;
    const pname = req.body.pname;
    console.log(pname);
    CourseModel.findOne({ name: pname }, function (err, Course) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting Course",
          error: err,
        });
      }

      if (!Course) {
        return res.status(404).json({
          message: "No such Course",
        });
      }

      Course.name = req.body.name ? req.body.name : Course.name;
      Course.owner = req.body.owner ? req.body.owner : Course.owner;
      Course.quiz = req.body.quiz ? req.body.quiz : Course.quiz;

      Course.save(function (err, Course) {
        if (err) {
          return res.status(500).json({
            message: "Error when updating Course.",
            error: err,
          });
        }

        return res.redirect("/courses");
      });
    });
  },

  /**
   * CourseController.remove()
   */
  remove: function (req, res) {
    const name = req.body.name;
    console.log(name);
    CourseModel.findByIdAndRemove(name, function (err, Course) {
      if (err) {
        return res.status(500).json({
          message: "Error when deleting the Course.",
          error: err,
        });
      }
      console.log(Course);
      return res.redirect("/courses");
    });
  },
};

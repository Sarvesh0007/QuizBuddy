const UserModel = require("./UserModel.js");

/**
 * UserController.js
 *
 * @description :: Server-side logic for managing Users.
 */
module.exports = {
  /**
   * UserController.login()
   */
  login: function (req, res) {
    return res.render("user/login");
  },
  register: function (req, res) {
    return res.render("user/register");
  },
  /**
   * UserController.listTeachers()
   */
  listTeachers: function (req, res) {
    UserModel.find({ role: "TEACHER" }, function (err, Users) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting User.",
          error: err,
        });
      }

      return res.render("user/teachers.ejs", { users: Users });
    });
  },
  /**
   * UserController.listStudents()
   */
  listStudents: function (req, res) {
    UserModel.find({ role: "STUDENT" }, function (err, Users) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting User.",
          error: err,
        });
      }

      return res.render("user/students", { users: Users });
    });
  },

  /**
   * UserController.show()
   */
  show: function (req, res) {
    const id = req.params.id;

    UserModel.findOne({ email: id }, function (err, User) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting User.",
          error: err,
        });
      }

      if (!User) {
        return res.status(404).json({
          message: "No such User",
        });
      }

      return res.render("user/card", { user: User });
    });
  },

  /**
   * UserController.create()
   */
  create: async function (req, res) {
    const user = await UserModel.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({
        message: "Error email already exist",
      });
    }
    const User = new UserModel({
      name: req.body.name,
      email: req.body.email,
      courses: req.body.courses,
      role: req.body.role,
      history: req.body.history,
    });

    User.save(function (err, User) {
      if (err) {
        return res.status(500).json({
          message: "Error when creating User",
          error: err,
        });
      }
      console.log(User);

      return res.status(201).json(User);
    });
  },

  /**
   * UserController.update()
   */
  update: function (req, res) {
    const id = req.params.id;
    console.log(req.body);
    UserModel.findOne({ email: id }, function (err, User) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting User",
          error: err,
        });
      }

      if (!User) {
        return res.status(404).json({
          message: "No such User",
        });
      }

      User.name = req.body.name ? req.body.name : User.name;
      User.courses = req.body.courses ? req.body.courses : User.courses;
      User.role = req.body.role ? req.body.role : User.role;
      User.history = req.body.history ? req.body.history : User.history;

      User.save(function (err, User) {
        if (err) {
          return res.status(500).json({
            message: "Error when updating User.",
            error: err,
          });
        }

        return res.json(User);
      });
    });
  },

  /**
   * UserController.remove()
   */
  remove: function (req, res) {
    const id = req.params.id;

    UserModel.findByIdAndRemove(id, function (err, User) {
      if (err) {
        return res.status(500).json({
          message: "Error when deleting the User.",
          error: err,
        });
      }

      return res.status(204).json();
    });
  },
};

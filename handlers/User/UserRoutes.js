const express = require("express");
const authController = require("../auth/authController");
const router = express.Router();
const UserController = require("./UserController.js");

/*
 * GET
 */
router.get("/login", UserController.login);
router.get("/register", UserController.register);
router.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("/users/login");
});

router.get("/teachers", authController.isVerified, UserController.listTeachers);
router.get("/students", UserController.listStudents);

/*
 * GET
 */
router.get("/:id", UserController.show);

/*
 * POST
 */
router.post("/register", authController.signup);
router.post("/login", authController.signin);

/*
 * PUT
 */
router.put("/:id", UserController.update);

/*
 * DELETE
 */
router.delete("/:id", UserController.remove);

module.exports = router;

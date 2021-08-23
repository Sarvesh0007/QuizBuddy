const express = require("express");
const { isVerified } = require("../auth/authController.js");
const router = express.Router();
const CourseController = require("./CourseController.js");

/*
 * GET
 */
router.get("/", isVerified, CourseController.list);

/*
 * GET
 */
router.get("/:id", CourseController.show);

/*
 * POST
 */
router.post("/", CourseController.create);

/*
 * DELETE
 */
router.post("/delete", CourseController.remove);

/*
 * PUT
 */
router.post("/:id", CourseController.update);

module.exports = router;

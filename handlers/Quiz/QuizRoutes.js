const express = require("express");
const { isVerified } = require("../auth/authController.js");
const router = express.Router();
const QuizController = require("./QuizController.js");

/*
 * GET
 */
router.get("/", QuizController.list);

/*
 * GET
 */
router.get("/:id", isVerified, QuizController.show);

/*
 * POST
 */
router.post("/", QuizController.create);

router.post("/attempt", isVerified, QuizController.attempt);

/*
 * PUT
 */
router.put("/:id", QuizController.update);

/*
 * DELETE
 */
router.delete("/:id", QuizController.remove);

module.exports = router;

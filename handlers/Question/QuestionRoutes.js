const express = require("express");
const router = express.Router();
const QuestionController = require("./QuestionController.js");

/*
 * GET
 */
router.get("/", QuestionController.list);

/*
 * GET
 */
router.get("/:id", QuestionController.show);

/*
 * POST
 */
router.post("/", QuestionController.create);

/*
 * PUT
 */
router.put("/:id", QuestionController.update);

/*
 * DELETE
 */
router.delete("/:id", QuestionController.remove);

module.exports = router;

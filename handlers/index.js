const router = require("express").Router();

router.get("/", (req, res) => {
  return res.render("index", { title: "Navigus Teaching buddy" });
});

module.exports = router;

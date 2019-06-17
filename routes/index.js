const express = require("express");

const router = express.Router();

router.get("/story", (req, res) => {
  res.render("story", { tab: "story" });
});

router.get("/program", (req, res) => {
  res.render("program", { tab: "program" });
});

router.get("/reading", (req, res) => {
  res.render("reading", { tab: "reading" });
});

module.exports = router;

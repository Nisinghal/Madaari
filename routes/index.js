const express = require("express");
const SSH = require("simple-ssh");

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

var ssh = new SSH({
  host: "192.168.2.2", // Need to find out the IP address when connected to your laptop!
  user: "pi",
  pass: "weave90"
});

router.post("/moveMotor", function(req, res) {
  console.log(
    "Requested to move: " +
      req.body.motor +
      " at speed: " +
      req.body.speed +
      " to position: " +
      req.body.rotation
  );
  ssh
    .exec(
      "python moveTest.py MOVE req.body.motor req.body.rotation req.body.speed",
      {
        out: function(stdout) {
          console.log(stdout);
        }
      }
    )
    .start();

  ssh = new SSH({
    host: "192.168.2.2", // Need to find out the IP address when connected to your laptop!
    user: "pi",
    pass: "weave90"
  });
});

module.exports = router;

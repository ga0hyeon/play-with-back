const express = require("express");
const router = express.Router();
const db = require("../config/db");
const auth = require("../lib/auth");

//admins
router.get("/", auth.ensureAuthenticated, (req, res) => {
  console.log("session", req.sessionID);
  db.query("SELECT * FROM admin", (err, data) => {
    if (!err) {
      res.send({ result: data });
    } else res.send(err);
  });
});

module.exports = router;

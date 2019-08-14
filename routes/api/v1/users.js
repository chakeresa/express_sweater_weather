var express = require("express");
var router = express.Router();
var User = require('../../../models').User;
const bcrypt = require('bcrypt');
const saltRounds = 10;

/*POST new user*/
router.post("/", function (req, res, next) {
  if (req.body.password && req.body.password == req.body.password_confirmation) {
    var hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
    User.create({
      email: req.body.email,
      passwordDigest: hashedPassword
    })
      .then(user => {
        res.setHeader("Content-Type", "application/json");
        res.status(201).send(JSON.stringify(user));
      })
      .catch(error => {
        res.setHeader("Content-Type", "application/json");
        res.status(500).send({ error });
      });
  } else {
    res.status(400).send({"error":"Passwords don't match"});
  }
});

module.exports = router;

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
      passwordDigest: hashedPassword,
      apiKey: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    })
      .then(user => {
        res.setHeader("Content-Type", "application/json");
        res.status(201).send(JSON.stringify({api_key: user.apiKey}));
      })
      .catch(error => {
        res.setHeader("Content-Type", "application/json");
        res.status(500).send({ error });
      });
  } else {
    res.status(400).send(JSON.sringify({error:"Passwords don't match"}));
  }
});

module.exports = router;

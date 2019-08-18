var express = require("express");
var router = express.Router();
var User = require('../../../models').User;
var security = require('../../../util/security');

/*POST new user*/
router.post("/", function (req, res, next) {
  let passwordEntered = req.body.password
  if (passwordEntered && passwordEntered == req.body.password_confirmation) {
    User.create({
      email: req.body.email,
      passwordDigest: security.hashedPassword(passwordEntered),
      apiKey: security.randomString()
    })
      .then(user => {
        res.setHeader("Content-Type", "application/json");
        res.status(201).send(JSON.stringify({api_key: user.apiKey}));
      })
      .catch(error => {
        res.setHeader("Content-Type", "application/json");
        res.status(422).send({ error: 'Email has already been taken' })
      });
  } else {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({error:"Passwords don't match"}));
  }
});

module.exports = router;

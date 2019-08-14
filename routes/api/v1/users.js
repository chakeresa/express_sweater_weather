var express = require("express");
var router = express.Router();
var User = require('../../../models').User;
const bcrypt = require('bcrypt');
const saltRounds = 10;

/*POST new user*/
router.post("/", function (req, res, next) {
  if (req.body.password && req.body.password == req.body.password_confirmation) {
    let hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
    let randomString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    User.create({
      email: req.body.email,
      passwordDigest: hashedPassword,
      apiKey: randomString
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

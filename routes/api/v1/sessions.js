var express = require("express");
var router = express.Router();
var User = require('../../../models').User;
var security = require('../../../util/security');
const bcrypt = require('bcrypt');

/*POST new session (user login)*/
router.post("/", function (req, res, next) {
  let passwordEntered = req.body.password;
  User.findOne({
    where: { email: req.body.email } 
  }).then(user => {
    if (user) {
      bcrypt.compareSync(passwordEntered, user.apiKey)
        .then(authenticated => {
          if (authenticated) {
            res.setHeader("Content-Type", "application/json");
            res.status(201).send(JSON.stringify({ api_key: user.apiKey }));
          } else {
            res.setHeader("Content-Type", "application/json");
            res.status(400).send(JSON.stringify({ error: "Invalid username or password" }));
          }
        })
        .catch(error => {
          res.setHeader("Content-Type", "application/json");
          res.status(500).send({ error });
        });
    } else {
      res.setHeader("Content-Type", "application/json");
      res.status(400).send(JSON.stringify({ error: "Invalid username or password" }));
    }
  })
});

module.exports = router;

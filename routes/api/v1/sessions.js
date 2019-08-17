var express = require("express");
var router = express.Router();
var User = require('../../../models').User;
var security = require('../../../util/security');
const bcrypt = require('bcrypt');

/*POST new session (user login)*/
router.post("/", function (req, res, next) {
  let passwordEntered = req.body.password;

  function unauthorized() {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ error: "Invalid username or password" }));
  }

  if (!req.body.email || !passwordEntered) {
    unauthorized();
  } else {
    User.findOne({
      where: { email: req.body.email } 
    }).then(user => {
      if (user) {
        authenticated = bcrypt.compareSync(passwordEntered, user.passwordDigest);
        if (authenticated) {
          res.setHeader("Content-Type", "application/json");
          res.status(200).send(JSON.stringify({ api_key: user.apiKey }));
        } else {
          unauthorized();
        }
      } else {
        unauthorized();
      }
    }).catch(err => {
      res.status(500).send(JSON.stringify({ error: err }));
    })
  }
});

module.exports = router;

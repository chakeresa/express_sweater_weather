var express = require("express");
var router = express.Router();
var User = require('../../../models').User;

/*GET forecast for a city*/
router.get("/", function (req, res, next) {
  let apiKey = req.body.api_key;

  function unauthorized() {
    res.setHeader("Content-Type", "application/json");
    res.status(401).send(JSON.stringify({ error: "Invalid API key" }));
  }

  if (!apiKey) {
    unauthorized();
  } else {
    User.findOne({
      where: { apiKey: apiKey }
    }).then(user => {
      if (user) {
        res.setHeader("Content-Type", "application/json");
        res.status(200).send(JSON.stringify({ data: "TODO" }));
      } else {
        unauthorized();
      }
    })
  }
});

module.exports = router;

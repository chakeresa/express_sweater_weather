var express = require("express");
var router = express.Router();
var User = require('../../../models').User;

function unauthorized(res) {
  res.setHeader("Content-Type", "application/json");
  res.status(401).send(JSON.stringify({ error: "Invalid API key" }));
}

/*POST new favorite location for the user*/
router.post("/", function (req, res, next) {
  let apiKey = req.body.api_key;

  if (!apiKey) {
    unauthorized(res);
  } else {
    User.findOne({
      where: { apiKey: apiKey }
    }).then(user => {
      if (user) {
        res.setHeader("Content-Type", "application/json");
        // add new favorite for the user
        res.status(200).send(JSON.stringify({
          TODO: "something"
        }));
      } else {
        unauthorized(res);
      }
    })
  }
});

module.exports = router;

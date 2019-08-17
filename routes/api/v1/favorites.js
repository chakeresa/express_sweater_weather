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
  let locationString = req.body.location;

  if (!apiKey) {
    unauthorized(res);
  } else {
    User.findOne({
      where: { apiKey: apiKey }
    }).then(user => {
      if (user) {
        res.setHeader("Content-Type", "application/json");
        return user.createFavoriteLocation({
          name: locationString
        })
        .then(response => {
          res.status(200).send(JSON.stringify({
            message: locationString + ' has been added to your favorites'
          }));
        })
      } else {
        unauthorized(res);
      }
    })
    .catch(err => {
      res.status(500).send(JSON.stringify({ error: err }));
    })
  }
});

module.exports = router;

var express = require("express");
var router = express.Router();
var User = require('../../../models').User;
var GoogleApiService = require('../../../util/google_api_service').GoogleApiService;

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
        let service = new GoogleApiService(req.query.location);
        return service.geocodingResults()
          .then(response => {
            let result = response.results[0];
            let latLngObj = result.geometry.location
            res.status(200).send(JSON.stringify({
              location: result.formatted_address,
              lat: latLngObj.lat,
              long: latLngObj.lng
            }));
          })
          .catch(error => {
            res.status(500).send(JSON.stringify(error));
          })
      } else {
        unauthorized();
      }
    })
  }
});

module.exports = router;

var express = require("express");
var router = express.Router();
var User = require('../../../models').User;
var GoogleApiService = require('../../../util/google_api_service').GoogleApiService;
var DarkSkyApiService = require('../../../util/dark_sky_api_service').DarkSkyApiService;
var formattedLocation

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
        let googleService = new GoogleApiService(req.query.location);
        return googleService.geocodingResults()
          .then(response => {
            let result = response.results[0];
            formattedLocation = result.formatted_address;
            let latLngObj = result.geometry.location;
            let lat = latLngObj.lat;
            let long = latLngObj.lng;
            let darkSkyService = new DarkSkyApiService(lat, long);
            return darkSkyService.forecastResults()
            .then(forecastResponse => {
                res.status(200).send(JSON.stringify({
                  location: formattedLocation,
                  currently: forecastResponse.currently,
                  hourly: forecastResponse.hourly,
                  daily: forecastResponse.daily
                }));
              })
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

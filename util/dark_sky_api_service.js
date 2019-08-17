var rp = require('request-promise');

class DarkSkyApiService {
  constructor(lat, long) {
    this.lat = lat;
    this.long = long;
  }

  forecastResults() {
    let domain = 'https://api.darksky.net';
    let uriPath = `/forecast/${process.env.DARK_SKY_API_KEY}/${this.lat},${this.long}`;
    var options = {
      uri: domain + uriPath,
      qs: {
        exclude: 'minutely'
      },
      json: true
    };

    return rp(options)
  }
}

module.exports = {
  DarkSkyApiService: DarkSkyApiService
}

var rp = require('request-promise');

class DarkSkyApiService {
  // constructor(locationStr) {
  //   this.locationStr = locationStr;
  // }

  // geocodingResults() {
  //   let domain = 'https://maps.googleapis.com'
  //   var options = {
  //     uri: domain + '/maps/api/geocode/json',
  //     qs: {
  //       key: process.env.GOOGLE_MAPS_API_KEY,
  //       address: this.locationStr
  //     },
  //     json: true
  //   };

  //   return rp(options)
  // }
}

module.exports = {
  DarkSkyApiService: DarkSkyApiService
}

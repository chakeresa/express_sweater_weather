var request = require("supertest");
var app = require('../../app');
var DarkSkyApiService = require('../../util/dark_sky_api_service').DarkSkyApiService;

describe('DarkSkyApiService', () => {
  describe('#constructor', () => {
    test('inits with lat & long', () => {
      let lat = 39.7392358
      let long = -104.990251
      let service = new DarkSkyApiService(lat, long);

      expect(service.lat).toEqual(lat);
      expect(service.long).toEqual(long);
    });
  });

  // describe('#geocodingResults', () => {
  //   test('returns the lat & long', () => {
  //     let locationStr = 'denver,co'
  //     let service = new DarkSkyApiService(locationStr);

  //     return service.geocodingResults()
  //       .then(response => {
  //         let result = response.results[0]
  //         expect(result.formatted_address).toEqual("Denver, CO, USA");
  //         expect(result.geometry.location.lat).toEqual(39.7392358);
  //         expect(result.geometry.location.lng).toEqual(-104.990251);
  //       })
  //   });
  // });
});

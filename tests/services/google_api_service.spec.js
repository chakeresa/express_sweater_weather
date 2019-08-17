var request = require("supertest");
var app = require('../../app');
var GoogleApiService = require('../../util/google_api_service').GoogleApiService;

describe('GoogleApiService', () => {
  describe('#constructor', () => {
    test('inits with locationStr', () => {
      let locationStr = 'denver,co'
      let service = new GoogleApiService(locationStr);

      expect(service.locationStr).toEqual(locationStr);
    });
  });

  describe('#geocodingResults', () => {
    test('returns the lat & long', () => {
      let locationStr = 'denver,co'
      let service = new GoogleApiService(locationStr);

      return service.geocodingResults()
        .then(response => {
          result = response.results[0]
          expect(result.formatted_address).toEqual("Denver, CO, USA");
          expect(result.geometry.location.lat).toEqual(39.7392358);
          expect(result.geometry.location.lng).toEqual(-104.990251);
        })
    });
  });
});

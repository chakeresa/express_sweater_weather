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
});

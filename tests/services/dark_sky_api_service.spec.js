var request = require("supertest");
var app = require('../../app');
var DarkSkyApiService = require('../../util/dark_sky_api_service').DarkSkyApiService;

describe('DarkSkyApiService', () => {
  let lat = 39.7392358
  let long = -104.990251
  let service = new DarkSkyApiService(lat, long);

  describe('#constructor', () => {
    test('inits with lat & long', () => {
      expect(service.lat).toEqual(lat);
      expect(service.long).toEqual(long);
    });
  });

  describe('#forecastResults', () => {
    test('returns the forecast details', () => {
      return service.forecastResults()
        .then(response => {
          expect(Object.keys(response)).toContain('currently');
          let currently = response.currently;
          expect(currently.summary).toEqual(expect.any(String));
          expect(currently.icon).toEqual(expect.any(String));
          expect(currently.precipIntensity).toEqual(expect.any(Number));
          expect(currently.precipProbability).toEqual(expect.any(Number));
          expect(currently.temperature).toEqual(expect.any(Number));
          expect(currently.humidity).toEqual(expect.any(Number));
          expect(currently.pressure).toEqual(expect.any(Number));
          expect(currently.windSpeed).toEqual(expect.any(Number));
          expect(currently.windGust).toEqual(expect.any(Number));
          expect(currently.windBearing).toEqual(expect.any(Number));
          expect(currently.cloudCover).toEqual(expect.any(Number));
          expect(currently.visibility).toEqual(expect.any(Number));

          expect(Object.keys(response)).toContain('hourly');
          let hourly = response.hourly
          expect(hourly.summary).toEqual(expect.any(String));
          expect(hourly.icon).toEqual(expect.any(String));
          expect(Object.keys(hourly)).toContain('data');
          let firstHour = hourly.data[0];
          expect(firstHour.time).toEqual(expect.any(Number));
          expect(firstHour.summary).toEqual(expect.any(String));
          expect(firstHour.icon).toEqual(expect.any(String));
          expect(firstHour.precipIntensity).toEqual(expect.any(Number));
          expect(firstHour.precipProbability).toEqual(expect.any(Number));
          expect(firstHour.temperature).toEqual(expect.any(Number));
          expect(firstHour.humidity).toEqual(expect.any(Number));
          expect(firstHour.pressure).toEqual(expect.any(Number));
          expect(firstHour.windSpeed).toEqual(expect.any(Number));
          expect(firstHour.windGust).toEqual(expect.any(Number));
          expect(firstHour.windBearing).toEqual(expect.any(Number));
          expect(firstHour.cloudCover).toEqual(expect.any(Number));
          expect(firstHour.visibility).toEqual(expect.any(Number));

          expect(Object.keys(response)).toContain('daily');
          let daily = response.daily
          expect(daily.summary).toEqual(expect.any(String));
          expect(daily.icon).toEqual(expect.any(String));
          expect(Object.keys(daily)).toContain('data');
          let firstDay = daily.data[0];
          expect(firstDay.time).toEqual(expect.any(Number));
          expect(firstDay.summary).toEqual(expect.any(String));
          expect(firstDay.icon).toEqual(expect.any(String));
          expect(firstDay.sunriseTime).toEqual(expect.any(Number));
          expect(firstDay.sunsetTime).toEqual(expect.any(Number));
          expect(firstDay.precipIntensity).toEqual(expect.any(Number));
          expect(firstDay.precipIntensityMax).toEqual(expect.any(Number));
          expect(firstDay.precipIntensityMaxTime).toEqual(expect.any(Number));
          expect(firstDay.precipProbability).toEqual(expect.any(Number));
          expect(firstDay.precipType).toEqual(expect.any(String));
          expect(firstDay.temperatureHigh).toEqual(expect.any(Number));
          expect(firstDay.temperatureLow).toEqual(expect.any(Number));
          expect(firstDay.humidity).toEqual(expect.any(Number));
          expect(firstDay.pressure).toEqual(expect.any(Number));
          expect(firstDay.windSpeed).toEqual(expect.any(Number));
          expect(firstDay.windGust).toEqual(expect.any(Number));
          expect(firstDay.windBearing).toEqual(expect.any(Number));
          expect(firstDay.cloudCover).toEqual(expect.any(Number));
          expect(firstDay.visibility).toEqual(expect.any(Number));
          expect(firstDay.temperatureMin).toEqual(expect.any(Number));
          expect(firstDay.temperatureMax).toEqual(expect.any(Number));
        })
    });
  });
});

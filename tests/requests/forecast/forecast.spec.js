var request = require("supertest");
var app = require('../../../app');
var User = require('../../../models').User;
var security = require('../../../util/security');
var cleanup = require('../../helper/testCleanup');

describe('api v1 forecast', () => {
  beforeEach(() => {
    cleanup()
  });

  describe('Test the forecast path', () => {
    test('returns a forecast', () => {
      let email = "email11@example.com"
      let password = "password"
      const apiKey = security.randomString()
      return User.create({
        email: email,
        passwordDigest: security.hashedPassword(password),
        apiKey: apiKey
      })
        .then(user => {
          return request(app)
            .get('/api/v1/forecast?location=denver,co')
            .send({
              "api_key": apiKey
            })
        })
        .then(response => {
          expect(response.statusCode).toBe(200);

          expect(Object.keys(response.body)).toContain('location');
          // TODO: change to just Denver, CO:
          // expect(response.body.location).toEqual('Denver, CO');
          expect(response.body.location).toEqual('Denver, CO, USA');

          expect(Object.keys(response.body)).toContain('currently');
          let currently = response.body.currently;
          // TODO: currently should not contain all keys from the original API request (such as apparentTemperature, dewPoint, or ozone)
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

          expect(Object.keys(response.body)).toContain('hourly');
          let hourly = response.body.hourly;
          // TODO: hourly should not contain all keys from the original API request (such as apparentTemperature, dewPoint, or ozone)
          expect(hourly.summary).toEqual(expect.any(String));
          expect(hourly.icon).toEqual(expect.any(String));
          expect(Object.keys(hourly)).toContain('data');
          expect(hourly.data.length).toBeGreaterThanOrEqual(8);
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

          expect(Object.keys(response.body)).toContain('daily');
          let daily = response.body.daily;
          // TODO: daily should not contain all keys from the original API request (such as moonPhase, temperatureHighTime, temperatureLowTime, apparentTemperatureHigh/HighTime/Low/LowTime, dewPoint, windGustTime, windBearing, uvIndex, uvIndexTime, ozone, temperatureMinTime/MaxTime, or apparentTemperatureMin/MinTime/Max/MaxTime)
          expect(daily.summary).toEqual(expect.any(String));
          expect(daily.icon).toEqual(expect.any(String));
          expect(Object.keys(daily)).toContain('data');
          expect(daily.data.length).toBeGreaterThanOrEqual(7);
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

    test('no matching API key', () => {
      let email = "email12@example.com"
      let password = "password"
      const apiKey = security.randomString()
      return User.create({
        email: email,
        passwordDigest: security.hashedPassword(password),
        apiKey: apiKey
      })
        .then(user => {
          return request(app)
            .get('/api/v1/forecast?location=denver,co')
            .send({
              "api_key": "bogusAPIkey"
            })
        })
        .then(response => {
          expect(response.statusCode).toBe(401);
          
          expect(Object.keys(response.body)).toContain('error');
          expect(response.body.error).toEqual("Invalid API key");
        })
    });

    test('no API key sent', () => {
      let email = "email13@example.com"
      let password = "password"
      const apiKey = security.randomString()
      return User.create({
        email: email,
        passwordDigest: security.hashedPassword(password),
        apiKey: apiKey
      })
        .then(user => {
          return request(app)
            .get('/api/v1/forecast?location=denver,co')
        })
        .then(response => {
          expect(response.statusCode).toBe(401);
          
          expect(Object.keys(response.body)).toContain('error');
          expect(response.body.error).toEqual("Invalid API key");
        })
    });
  });
});

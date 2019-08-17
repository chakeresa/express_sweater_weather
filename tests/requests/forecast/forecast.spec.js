var shell = require('shelljs');
var request = require("supertest");
var app = require('../../../app');
var User = require('../../../models').User;
var security = require('../../../util/security');

describe('api v1 forecast', () => {
  async function cleanup() {
    await User.destroy({ where: {} })
  }

  beforeAll(() => {
    shell.exec('npx sequelize db:drop')
    shell.exec('npx sequelize db:create')
    shell.exec('npx sequelize db:migrate')
  });
  beforeEach(() => {
    cleanup()
    // shell.exec('npx sequelize db:migrate')
  });
  // afterEach(() => {
  //   shell.exec('npx sequelize db:migrate:undo:all')
  // });

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
          expect(response.body.location).toEqual('Denver, CO');

          expect(Object.keys(response.body)).toContain('currently');
          let currently = response.body.currently
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
          let hourly = response.body.hourly
          expect(hourly.summary).toEqual(expect.any(String));
          expect(hourly.icon).toEqual(expect.any(String));
          expect(Object.keys(hourly)).toContain('data');
          expect(hourly.data.length).toEqual(8);
          let firstHour = hourly.data.first;
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
          let daily = response.body.daily
          expect(daily.summary).toEqual(expect.any(String));
          expect(daily.icon).toEqual(expect.any(String));
          expect(Object.keys(daily)).toContain('data');
          expect(daily.data.length).toEqual(7);
          let firstDay = daily.data.first;
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
      let email = "email111@example.com"
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
          expect(Object.keys(response.body)).toContain('error')
          expect(response.body.error).toEqual("Invalid API key")
        })
    });
  });
});

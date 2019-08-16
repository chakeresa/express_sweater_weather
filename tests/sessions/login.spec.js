var shell = require('shelljs');
var request = require("supertest");
var app = require('../../app');
var User = require('../../models').User;
var security = require('../../util/security');

describe('api', () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:create')
  });
  beforeEach(() => {
    shell.exec('npx sequelize db:migrate')
  });
  afterEach(() => {
    shell.exec('npx sequelize db:migrate:undo:all')
  });

  describe('Test the login path', () => {
    test('returns an api_key', () => {
      let email = "email@example.com"
      let password = "password"
      const apiKey = security.randomString()
      User.create({
        email: email,
        passwordDigest: security.hashedPassword(password),
        apiKey: apiKey
      })
      .then (user => {
        return request(app)
          .post('/api/v1/sessions')
          .send({
            "email":email, 
            "password":password
          })
      })
      .then (response => {
        expect(response.statusCode).toBe(200);
        expect(Object.keys(response.body)).toContain('api_key');
        expect(response.body.api_key).toEqual(apiKey);
      })
    });

    test('wrong password', () => {
      let email = "blah@example.com"
      let password = "password"
      const apiKey = security.randomString()
      User.create({
        email: email,
        passwordDigest: security.hashedPassword(password),
        apiKey: apiKey
      })
      .then (user => {
        return request(app)
          .post('/api/v1/sessions')
          .send({
            "email":email, 
            "password":"wrongpassword"
          })
      })
      .then (response => {
        expect(response.statusCode).toBe(400)
        expect(Object.keys(response.body)).toContain('error')
        expect(response.body.error).toEqual("Invalid username or password")
      })
    });

    test("user doesn't exist", () => {
      return request(app)
        .post('/api/v1/sessions')
        .send({
          "email":"another_email@example.com", 
          "password":"password", 
        })
        .then(response => {
          expect(response.statusCode).toBe(400)
          expect(Object.keys(response.body)).toContain('error')
          expect(response.body.error).toEqual("Invalid username or password")
        })
    });
  });
});

var shell = require('shelljs');
var request = require("supertest");
var app = require('../../../app');
var User = require('../../../models').User;
var security = require('../../../util/security');

describe('api v1 sessions', () => {
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

  describe('Test the login path', () => {
    test('returns an api_key', () => {
      let email = "email1@example.com"
      let password = "password"
      const apiKey = security.randomString()
      return User.create({
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
      let email = "email2@example.com"
      let password = "password"
      const apiKey = security.randomString()
      return User.create({
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

    test('no email entered', () => {
      let email = "email3@example.com"
      let password = "password"
      const apiKey = security.randomString()
      return User.create({
        email: email,
        passwordDigest: security.hashedPassword(password),
        apiKey: apiKey
      })
      .then (user => {
        return request(app)
          .post('/api/v1/sessions')
          .send({
            "email":email
          })
      })
      .then (response => {
        expect(response.statusCode).toBe(400)
        expect(Object.keys(response.body)).toContain('error')
        expect(response.body.error).toEqual("Invalid username or password")
      })
    });

    test('no password entered', () => {
      let email = "email4@example.com"
      let password = "password"
      const apiKey = security.randomString()
      return User.create({
        email: email,
        passwordDigest: security.hashedPassword(password),
        apiKey: apiKey
      })
      .then (user => {
        return request(app)
          .post('/api/v1/sessions')
          .send({
            "password":password
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
          "email":"email5@example.com", 
          "password":"password"
        })
        .then(response => {
          expect(response.statusCode).toBe(400)
          expect(Object.keys(response.body)).toContain('error')
          expect(response.body.error).toEqual("Invalid username or password")
        })
    });
  });
});

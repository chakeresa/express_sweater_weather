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
      let email = "my_email@example.com"
      let password = "password"
      return User.create({
        email: email,
        passwordDigest: security.hashedPassword(password),
        apiKey: security.randomString()
      })
        .then(user => {
          var userCreated = user;
          return request(app)
          .post('/api/v1/sessions')
          .send({
            "email":email, 
            "password":password
          })
        })
        .then(response => {
          expect(response.statusCode).toBe(200);
          expect(Object.keys(response.body)).toContain('api_key');
          expect(response.body.api_key).toEqual(userCreated.api_key);
        })
    });

    // test('mismatched password', () => {
    //   return request(app)
    //     .post('/api/v1/sessions')
    //     .send({
    //       "email":"my_email@example.com", 
    //       "password":"password", 
    //       "password_confirmation":"otherpassword", 
    //     })
    //     .then(response => {
    //       expect(response.statusCode).toBe(400)
    //       expect(Object.keys(response.body)).toContain('error')
    //       expect(response.body.error).toEqual("Passwords don't match")
    //     })
    // });

    // test('missing password', () => {
    //   return request(app)
    //     .post('/api/v1/sessions')
    //     .send({
    //       "email":"my_email@example.com", 
    //       "password_confirmation":"password", 
    //     })
    //     .then(response => {
    //       expect(response.statusCode).toBe(400)
    //       expect(Object.keys(response.body)).toContain('error')
    //       expect(response.body.error).toEqual("Passwords don't match")
    //     })
    // });
  });
});

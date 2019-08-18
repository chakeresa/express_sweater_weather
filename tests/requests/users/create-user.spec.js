var request = require("supertest");
var app = require('../../../app');
var User = require('../../../models').User;
var security = require('../../../util/security');
var cleanup = require('../../helper/testCleanup');

describe('Test the root path', () => {
  test('It should respond to the GET method', () => {
    return request(app).get("/").then(response => {
      expect(response.statusCode).toBe(200)
    })
  });
});

describe('api v1 users', () => {
  beforeEach(() => {
    cleanup()
  });

  describe('Test the registration path', () => {
    test('returns an api_key', () => {
      return request(app)
      .post('/api/v1/users')
      .send({
        "email":"email2@example.com", 
        "password":"password", 
        "password_confirmation":"password"
      })
      .then(response => {
        expect(response.statusCode).toBe(201);
        
        expect(Object.keys(response.body)).toContain('api_key');
        expect(response.body.api_key).toEqual(expect.anything());
      })
    });

    test('requires a unique email', () => {
      let email = "email3@example.com"
      let password1 = "password"
      let password2 = "otherPassword"
      const apiKey = security.randomString()
      return User.create({
        email: email,
        passwordDigest: security.hashedPassword(password1),
        apiKey: apiKey
      })
      .then(user1 => {
        return request(app)
        .post('/api/v1/users')
        .send({
          "email": email, 
          "password": password2, 
          "password_confirmation": password2
        })
      })
      .then(response => {
        expect(response.statusCode).toBe(422);
        
        expect(Object.keys(response.body)).toContain('error');
        expect(response.body.error).toEqual('Email has already been taken');
      })
    });

    test('mismatched password', () => {
      return request(app)
        .post('/api/v1/users')
        .send({
          "email":"email4@example.com", 
          "password":"password", 
          "password_confirmation":"otherpassword"
        })
        .then(response => {
          expect(response.statusCode).toBe(400);

          expect(Object.keys(response.body)).toContain('error');
          expect(response.body.error).toEqual("Passwords don't match");
        })
    });

    test('missing password', () => {
      return request(app)
        .post('/api/v1/users')
        .send({
          "email":"email5@example.com", 
          "password_confirmation":"password"
        })
        .then(response => {
          expect(response.statusCode).toBe(400);

          expect(Object.keys(response.body)).toContain('error');
          expect(response.body.error).toEqual("Passwords don't match");
        })
    });
  });
});

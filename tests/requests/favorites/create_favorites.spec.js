var request = require("supertest");
var app = require('../../../app');
var User = require('../../../models').User;
var security = require('../../../util/security');
var cleanup = require('../../helper/testCleanup');

describe('api v1 favorites POST', () => {
  beforeEach(() => {
    cleanup()
  });

  describe('Test the add new favorites path', () => {
    test('returns a message', () => {
      let email = 'email1111@example.com'
      let password = 'password'
      let locationString = 'Denver, CO'
      const apiKey = security.randomString()
      return User.create({
        email: email,
        passwordDigest: security.hashedPassword(password),
        apiKey: apiKey
      })
        .then(user => {
          return request(app)
            .get('/api/v1/favorites')
            .send({
              'location': locationString,
              'api_key': apiKey
            })
        })
        .then(response => {
          expect(response.statusCode).toBe(200);

          let expected = {
            message: 'Denver, CO has been added to your favorites'
          }
          expect(response.body).toEql(expected);
        });
    });
  });
});

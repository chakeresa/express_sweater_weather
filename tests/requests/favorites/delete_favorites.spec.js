var request = require("supertest");
var app = require('../../../app');
var User = require('../../../models').User;
var FavoriteLocation = require('../../../models').FavoriteLocation;
var security = require('../../../util/security');
var cleanup = require('../../helper/testCleanup');

describe('api v1 favorites DELETE', () => {
  beforeEach(() => {
    cleanup()
  });

  describe('Test the delete favorites path', () => {
    test('deletes the FavoriteLocation', () => {
      let email = 'email11111@example.com'
      let password = 'password'
      let locationString = 'Denver, CO'
      const apiKey = security.randomString()

      return User.create({
        email: email,
        passwordDigest: security.hashedPassword(password),
        apiKey: apiKey
      })
        .then(user => {
          return FavoriteLocation.create({
            UserId: user.id,
            name: locationString
          })
        })
        .then(favoriteLocation => {
          return request(app)
            .del('/api/v1/favorites')
            .send({
              'location': locationString,
              'api_key': apiKey
            })
        })
        .then(response => {
          console.log(response.body);
          expect(response.statusCode).toBe(204);

          return FavoriteLocation.count()
        })
        .then(count => {
          expect(count).toEqual(0);
        });
    });

    // TODO: test that another user's entry of the same name is not deleted
    // TODO: test that it doesn't error out if no resource found

    test('bad API key', () => {
      let email = 'email11112@example.com'
      let password = 'password'
      let locationString = 'Denver, CO'
      const apiKey = security.randomString()

      return User.create({
        email: email,
        passwordDigest: security.hashedPassword(password),
        apiKey: apiKey
      })
        .then(user => {
          return FavoriteLocation.create({
            UserId: user.id,
            name: locationString
          })
        })
        .then(favoriteLocation => {
          return request(app)
            .del('/api/v1/favorites')
            .send({
              'location': locationString,
              'api_key': "badAPIkey"
            })
        })
        .then(response => {
          expect(response.statusCode).toBe(401);

          expect(response.body).toEqual({ error: "Invalid API key" });

          return FavoriteLocation.count()
        })
        .then(count => {
          expect(count).toEqual(1);
        });
    });

    // TODO: test missing location string

    test('missing API key', () => {
      let email = 'email11113@example.com'
      let password = 'password'
      let locationString = 'Denver, CO'
      const apiKey = security.randomString()

      return User.create({
        email: email,
        passwordDigest: security.hashedPassword(password),
        apiKey: apiKey
      })
        .then(user => {
          return FavoriteLocation.create({
            UserId: user.id,
            name: locationString
          })
        })
        .then(favoriteLocation => {
          return request(app)
            .del('/api/v1/favorites')
            .send({
              'location': locationString
            })
        })
        .then(response => {
          expect(response.statusCode).toBe(401);

          expect(response.body).toEqual({ error: "Invalid API key" });

          return FavoriteLocation.count()
        })
        .then(count => {
          expect(count).toEqual(1);
        });
    });
  });
});

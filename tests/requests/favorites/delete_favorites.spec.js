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

    test("doesn't delete another user's FavoriteLocation", () => {
      // user1 attempts to delete a favoriteLocation
      let email1 = 'email11111@example.com'
      // user2 has the favoriteLocation
      let email2 = 'email11121@example.com'
      let password = 'password'
      let locationString = 'Denver, CO'
      const apiKey1 = security.randomString()
      const apiKey2 = security.randomString()

      return User.create({
        email: email1,
        passwordDigest: security.hashedPassword(password),
        apiKey: apiKey1
      })
        .then(user1 => {
          return User.create({
            email: email2,
            passwordDigest: security.hashedPassword(password),
            apiKey: apiKey2
          })
        })
        .then(user2 => {
          return FavoriteLocation.create({
            UserId: user2.id,
            name: locationString
          })
        })
        .then(favoriteLocation => {
          return request(app)
            .del('/api/v1/favorites')
            .send({
              'location': locationString,
              'api_key': apiKey1
            })
        })
        .then(response => {
          console.log(response.body);
          expect(response.statusCode).toBe(204);

          return FavoriteLocation.count()
        })
        .then(count => {
          expect(count).toEqual(1);
        });
    });

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

    test('missing location', () => {
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
              'api_key': apiKey
            })
        })
        .then(response => {
          console.log(response.body)
          console.log(response.statusCode)
          expect(response.statusCode).toBe(400);

          expect(response.body).toEqual({
            error: 'Requires location in body of request'
          });

          return FavoriteLocation.count()
        })
        .then(count => {
          expect(count).toEqual(1);
        });
    });

    test('missing API key', () => {
      let email = 'email11114@example.com'
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

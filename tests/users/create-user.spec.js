var shell = require('shelljs');
var request = require("supertest");
var app = require('../../app');

describe('Test the root path', () => {
  test('It should respond to the GET method', () => {
    return request(app).get("/").then(response => {
      expect(response.statusCode).toBe(200)
    })
  });
});

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

  describe('Test the registration path', () => {
      test('returns an api_key', () => {
        return request(app)
        .post('/api/v1/users')
        .send({
          "email":"my_email@example.com", 
          "password":"password", 
          "password_confirmation":"password", 
        })
        .then(response => {
          expect(response.statusCode).toBe(201)
          expect(Object.keys(response.body)).toContain('api_key')
          expect(response.body.api_key).toEqual(expect.anything())
        })
    });

    test('mismatched password', () => {
      return request(app)
        .post('/api/v1/users')
        .send({
          "email":"my_email@example.com", 
          "password":"password", 
          "password_confirmation":"otherpassword", 
        })
        .then(response => {
          expect(response.statusCode).toBe(400)
          expect(Object.keys(response.body)).toContain('error')
          expect(response.body.error).toEqual("Passwords don't match")
        })
    });

    test('missing password', () => {
      return request(app)
        .post('/api/v1/users')
        .send({
          "email":"my_email@example.com", 
          "password_confirmation":"password", 
        })
        .then(response => {
          expect(response.statusCode).toBe(400)
          expect(Object.keys(response.body)).toContain('error')
          expect(response.body.error).toEqual("Passwords don't match")
        })
    });
  });
});

// Request:

// POST / api / v1 / users
// Content - Type: application / json
// Accept: application / json

// {
//   "email": "my_email@example.com",
//     "password": "password"
//   "password_confirmation": "password"
// }
// Response:

// status: 201
// body:

// {
//   "api_key": "jgn983hy48thw9begh98h4539h4",
// }
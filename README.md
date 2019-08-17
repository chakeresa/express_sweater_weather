# Sweater Weather (in Express Framework)
*********about

## Setup on your machine
 - `$npm install`
 - `$npx sequelize db:create` (need to change username in `config.json`?)
 - `$npx sequelize db:migrate`

### Start the server
 - `$npm start` or `$nodemon`

### Run the test suite
 - `$npm test`

## API Endpoints

### New user registration
Request:
```
POST /api/v1/users
Content-Type: application/json
Accept: application/json

{
  "email": "my_email@example.com",
  "password": "password"
  "password_confirmation": "password"
}
```
Response:
```
{
  "api_key": "6kzqk71x8vezd6odo5rp",
}
```

### User login
Request:
```
POST /api/v1/sessions
Content-Type: application/json
Accept: application/json

{
  "email": "my_email@example.com",
  "password": "password"
}
```
Response:
```
status: 200
body:

{
  "api_key": "6kzqk71x8vezd6odo5rp"
}
```
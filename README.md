# Sweater Weather (in Express Framework)
This REST API allows users to create an account & login, as well as fetch the forecast for a location, and add/remove favorite locations if they have a valid API key. All responses are JSON.

The app is deployed at https://aqueous-bastion-69439.herokuapp.com.

This project was part of [Turing School of Software & Design](https://turing.io)'s Back End Engineering program (Mod 4). See project spec [here](https://backend.turing.io/module4/projects/express_sweater_weather/express_sweater_weather_spec). It was completed in 7 days by [Alexandra Chakeres](https://github.com/chakeresa) (with the flu) as my first Express app / first real use of JavaScript / first time testing JavaScript. A [similar project](https://github.com/chakeresa/sweater_weather) (in Ruby on Rails) was completed as part of Mod 3.

## Schema
*************TODO

## Tech Stack
### Core Components
 - Framework: Express (v4.16.4)
 - Language: JavaScript
 - Database: PostgreSQL
 - ORM: Sequelize (v5.14.0)
 - Testing: Jest (v24.9.0)

### Other Packages
 - `bcrypt` password hashing
 - `dotenv` store environment variables securely
 - `request` make HTTP requests
 - `request-promise` make promise-based HTTP requests
 - `shelljs` run terminal commands
 - `supertest` test HTTP requests

## Setup on your machine
 - `$git clone git@github.com:chakeresa/express_sweater_weather.git`
 - `$npm install`
 - Edit `config/config.json`: Change all username fields to your own postgres username (shows up before the command prompt after you run `$psql`)
 - `$npx sequelize db:create` (need to change username in `config.json`?)
 - `$npx sequelize db:migrate`
 - Add a file `.env` to the root directory with your own API keys:
 ```
 GOOGLE_MAPS_API_KEY=<YOUR GOOGLE MAPS API KEY>
 DARK_SKY_API_KEY=<YOUR DARK SKY API KEY>
 ```

### Run the server
 - `$npm start`
 - Access endpoints at `http://localhost:3000`

### Run the test suite
 - `$npm test`]()

## API Endpoints
### New user registration
Request:
```
POST /api/v1/users
Content-Type: application/json
Accept: application/json
body:
{
  "email": "my_email@example.com",
  "password": "password"
  "password_confirmation": "password"
}
```
Response:
```
status: 201
body:
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
body:
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

### Forecast for a City (Denver, for example)
Request:
```
GET /api/v1/forecast?<CITY AND STATE, FOR EXAMPLE denver,co>
Content-Type: application/json
Accept: application/json
body:
{
  "api_key": "6kzqk71x8vezd6odo5rp"
}
```
Response:
 - *only one hour's data is included in the sample response below, but 8+ hours' data is in the actual API response*
 - *only one day's data is included in the sample response below, but 7+ days' data is in the actual API response*
```
status: 200
body:
{
  "location": "Denver, C0",
  "currently": {
      "summary": "Overcast",
      "icon": "cloudy",
      "precipIntensity": 0,
      "precipProbability": 0,
      "temperature": 54.91,
      "humidity": 0.65,
      "pressure": 1020.51,
      "windSpeed": 11.91,
      "windGust": 23.39,
      "windBearing": 294,
      "cloudCover": 1,
      "visibility": 9.12,
    },
  "hourly": {
    "summary": "Partly cloudy throughout the day and breezy this evening.",
    "icon": "wind",
    "data": [
      {
      "time": 1555016400,
      "summary": "Overcast",
      "icon": "cloudy",
      "precipIntensity": 0,
      "precipProbability": 0,
      "temperature": 54.9,
      "humidity": 0.65,
      "pressure": 1020.8,
      "windSpeed": 11.3,
      "windGust": 22.64,
      "windBearing": 293,
      "cloudCover": 1,
      "visibility": 9.02,
      },
    ]
  },
  "daily": {
    "summary": "No precipitation throughout the week, with high temperatures bottoming out at 58°F on Monday.",
    "icon": "clear-day",
    "data": [
      {
        "time": 1554966000,
        "summary": "Partly cloudy throughout the day and breezy in the evening.",
        "icon": "wind",
        "sunriseTime": 1554990063,
        "sunsetTime": 1555036947,
        "precipIntensity": 0.0001,
        "precipIntensityMax": 0.0011,
        "precipIntensityMaxTime": 1555045200,
        "precipProbability": 0.11,
        "precipType": "rain",
        "temperatureHigh": 57.07,
        "temperatureLow": 51.47,
        "humidity": 0.66,
        "pressure": 1020.5,
        "windSpeed": 10.94,
        "windGust": 33.93,
        "cloudCover": 0.38,
        "visibility": 9.51,
        "temperatureMin": 53.49,
        "temperatureMax": 58.44,
      },
    ]
  }
}
```

### Adding a Favorite City (Denver, for example)
Request:
```
POST /api/v1/favorites
Content-Type: application/json
Accept: application/json
body:
{
  "location": <CITY AND STATE, FOR EXAMPLE "Denver, CO">,
  api_key": "6kzqk71x8vezd6odo5rp"
}
```
Response:
```
status: 200
body:
{
  "message": "Denver, CO has been added to your favorites"
}
```

### Removing a Favorite City (Denver, for example)
Request:
```
DELETE /api/v1/favorites
Content-Type: application/json
Accept: application/json
body:
{
  "location": <CITY AND STATE, FOR EXAMPLE "Denver, CO">,
  "api_key": "6kzqk71x8vezd6odo5rp"
}
```
Response:
```
status: 204
```

## Administrative
### Known Issues
None identified

### How to Contribute
Visit https://github.com/chakeresa/express_sweater_weather/pulls and click `New pull request`

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

### Forecast for a City (Denver, for example)
Request:
```
GET /api/v1/forecast?<CITY AND STATE, FOR EXAMPLE denver,co>
Content-Type: application/json
Accept: application/json

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
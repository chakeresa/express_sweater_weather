var express = require('express');
var path = require('path');
require('dotenv').config();
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiUsersRouter = require('./routes/api/v1/users');
var apiSessionsRouter = require('./routes/api/v1/sessions');
var apiForecastRouter = require('./routes/api/v1/forecast');
var apiFavoritesRouter = require('./routes/api/v1/favorites');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/v1/users', apiUsersRouter);
app.use('/api/v1/sessions', apiSessionsRouter);
app.use('/api/v1/forecast', apiForecastRouter);
app.use('/api/v1/favorites', apiFavoritesRouter);

module.exports = app;

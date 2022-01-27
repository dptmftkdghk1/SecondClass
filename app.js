const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');

// Session
const sessionConfig = require('./configs/session.config');

const indexRouter = require('./routes/index');
const teachersRouter = require('./routes/teachers');
const lecturesRouter = require('./routes/lectures');
const studentsRouter = require('./routes/students');
const authRouter = require('./routes/auth');

const apiRouter = require('./routes/api');

const app = express();

app.use(session(sessionConfig));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set('jwt-secret', 'SecondClassSecretKey');

app.use('/', indexRouter);
app.use('/teachers', teachersRouter);
app.use('/lectures', lecturesRouter);
app.use('/students', studentsRouter);
app.use('/auth', authRouter);

app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

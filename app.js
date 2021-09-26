var createError = require('http-errors');
const express = require('express');
const path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

const {
  sequelize
} = require('./models/index');

sequelize.sync({
    alter: false
  })
  .then(() => {
    console.log('데이터베이스 연결 성공.');
  })
  .catch((error) => {
    console.error(error);
  })

var indexRouter = require('./src/routes/index');
var userRouter = require('./src/routes/user');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', userRouter);

//esj(템플릿)으로 설정하기
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
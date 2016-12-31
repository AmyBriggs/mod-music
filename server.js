var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');

var login = require('./routes/login');
var signup = require('./routes/signup');
var profile = require('./routes/profile')
var save = require('./routes/save');
var load = require('./routes/load');

var app = express();
// view engine setup
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/login', login);
app.use('/signup', signup);
app.use('/profile', profile);
app.use('/save', save);
app.use('/load', load);

app.all('*', (req,res,next) => {
  res.sendFile('layout.html', { root: __dirname + '/public/'});
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.end();
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
console.log('Listening on port', port);
});
module.exports = app;

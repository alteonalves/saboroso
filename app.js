var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
let RedisStore = require('connect-redis')(session);
const formidable = require('formidable');
var http = require('http');
const socket = require('socket.io');

var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');

var app = express();

var http = http.Server(app);
var io = socket(http);

io.on('connection', function(socket){

  console.log('Conectado!');
});

app.use(function (req, res, next) {

  if (req.method.toLocaleLowerCase() === 'post') {
    const form = formidable({
      uploadDir: path.join(__dirname, "/public/images"),
      keepExtensions: true
    });

    form.parse(req, function (err, fields, files) {
      if (err) {
        console.log(err);
        next();
      }
      req.body = fields;
      req.fields = fields;
      req.files = files;  
      
      next();
    
    });
    
  } else {
    
    next();

  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// ioredis
// Conexão com o redis no container

const Redis = require("ioredis");

let redisClient = new Redis({
host: 'redis',
  port: 6379,
  password: 'redisAlteon2022!'
});

app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: "p@$$w0rd",
  resave: true,
  saveUninitialized: true
}));

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/admin', adminRouter);

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

http.listen(3000, function(){
  console.log('Servidor em execução')
});

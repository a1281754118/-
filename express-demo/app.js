var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var homesRouter = require('./routes/channel');
var loginRouter = require('./routes/login');
var categoryRouter = require('./routes/category');
var customerRouter = require('./routes/customer');
var lunboRouter = require('./routes/lunbo');
var ticketRouter = require('./routes/ticket');
var orderRouter = require('./routes/order');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('abc'));
app.use(express.static(path.join(__dirname, 'public')));

var cryptojs=require("crypto-js");
app.use('/cat/login',require('./cat/login'))
app.use('/cat',function(req,res,next){
  // console.log(req.headers)
  var id=cryptojs.AES.decrypt(req.headers.token,'asdasd55sdasd',{iv:"CB3EC842D7C69578"}).toString(cryptojs.enc.Utf8);
  if(id){
    req.loginId=id
    console.log(req.dizhi)
    next()
  }else{
    res.send({
           success:false,
           message:"请先登录"
         })
  }
})
app.use('/cat',require('./cat/lunbo'))
app.use('/cat/dingdan',require('./cat/dingdan'))


app.use('/login', loginRouter)
 app.use(function(req,res,next){
 if (!req.signedCookies.node_auth) {
   res.send({
     success:false,
     message:"请先登录"
   })
 }else{
   next()
 }
 });

app.use('/order',orderRouter)
app.use('/category', categoryRouter)
app.use('/ticket',ticketRouter)
app.use('/lunbo',lunboRouter);
app.use('/customer',customerRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/channel', homesRouter);
app.use('/data', function (req, res) {
  res.cookie('abc', "hello", {
    path: "/",// 默认/
    maxAge: 3600000,
    signed: true
  });
  

  res.write(JSON.stringify(req.query));
  res.write('\n');
  res.write(JSON.stringify(req.body));
  res.write('\n');
  res.write(JSON.stringify(req.cookies));
  res.write('\n');
  res.write(JSON.stringify(req.signedCookies));
  res.end()
});

app.use('/xiazai', function (req, res) {
  // res.send(new Buffer('傻逼东西'))
  res.send("<p>Hello</p>")
})


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

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var adminManagementRouter = require('./routes/adminManagement');
var productsRouter = require ('./routes/products');
var sellerRouter = require('./routes/seller');
var cartRouter = require('./routes/cart');
var purchaseRouter = require('./routes/purchase');

var app = express();

var verifyAccessToken = require('./repos/adminRepos').verifyAccessToken;
var verifyAccessToken1 = require('./services/ticket_services').verifyAccessToken;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);
app.use('/adminManagement', verifyAccessToken, adminManagementRouter);
app.use('/products', productsRouter);
app.use('/seller', verifyAccessToken1, sellerRouter);
app.use('/cart', cartRouter);
app.use('/purchase', purchaseRouter);

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

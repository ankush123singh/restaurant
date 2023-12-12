var createError = require ('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require ('morgan');
var cors=require('cors')
var jwt = require("jsonwebtoken");


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var statecityRouter = require('./routes/statecity');
var restaurantRouter = require('./routes/restaurant');
var categoryRouter = require('./routes/category');
var subcategoryRouter = require('./routes/subcategory');
var tablebookingRouter = require('./routes/tablebooking');
var  waitersRouter = require('./routes/waiters');
var waitertableRouter = require('./routes/waitertable');
var billingRouter = require('./routes/billing');
 //var smsRouter = require('./routes/smsapi');

var adminRouter = require('./routes/admin');
var superAdminRouter=require('./routes/superadmin')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/superadmin',superAdminRouter);
app.use('/admin',adminRouter)

/*
app.use((req, res, next) =>{
  const token = req.headers.authorization
  console.log(token)
jwt.verify(token,'shhhhh',function(err, decoded) {
  console.log(err,decoded)
//res.status(200).json(decoded)
if(decoded)
{
  next()
}
else
{
  res.status(401).json({ status: false,message: "Invalid token"})
}


})

})  
*/

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/statecity', statecityRouter);
app.use('/restaurants',restaurantRouter );
app.use('/category',categoryRouter);



app.use('/subcategory',subcategoryRouter);
app.use('/tablebooking',tablebookingRouter);
app.use('/waiters', waitersRouter);
app.use('/billing', billingRouter);
//app.use('/sms', smsRouter);

app.use('/waitertable', waitertableRouter);












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




/*   app.use((req, res, next) =>{
  const token = req.headers.authorization
  console.log(token)
jwt.verify(token,'shhhhh',function(err, decoded) {
  console.log(err,decoded)
//res.status(200).json(decoded)
if(decoded){
  next()
}
else{
  res.status(401).json({ status: false,message: "Invalid token"})
}


})

})
*/
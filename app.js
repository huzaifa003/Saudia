var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var upload = require('express-fileupload')
var mongoose = require('mongoose')
var session = require('express-session')

var app = express();
app.use(upload({
  // debug : true
}))

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var reportRouter = require('./routes/report')
var cardRouter = require('./routes/card')
var certificateRouter = require('./routes/certificate')




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/report',reportRouter);
app.use('/card',cardRouter);
app.use('/certificate',certificateRouter)


app.use(session({
  secret: 'keyboardcat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// app.get('/', (req,res)=>{
//   res.render('authentication')
//  })

mongoose.connect('mongodb+srv://ateco:kPMFziDxynvEgAd7@cluster0.jyuqm8x.mongodb.net/ateco?retryWrites=true&w=majority')
//mongodb+srv://ateco:ateco@cluster0.jyuqm8x.mongodb.net/?retryWrites=true&w=majority
//mongodb+srv://arsalan:123@cluster0.1pceytg.mongodb.net/aetco?retryWrites=true&w=majority

//original db
//mongodb+srv://ateco:kPMFziDxynvEgAd7@cluster0.jyuqm8x.mongodb.net/ateco?retryWrites=true&w=majority
.then(()=>{
  console.log("connected to MongoDB");
  app.listen(4200,()=>{
    console.log("Server Running at 4200");
  })
})



module.exports = app;

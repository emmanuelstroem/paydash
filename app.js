var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var index = require('./routes/index');
var users = require('./routes/users');

var login = require('./routes/login');

var debtors = require('./routes/debtors');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var sessionVariables = {
    secret: 'getsaida',
    cookie: { /*secure: true*/ }
};

if (app.get('env') === 'production') {

    app.set('trust proxy', 1);
    sessionVariables.cookie.secure = true
}

app.use(session(sessionVariables));

app.use('/', index);
app.use('/users', users);
app.use('/login', login);
app.use('/alldebtors', debtors);

function restrict(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        req.session.error = 'Access denied!';
        res.redirect('/login');
    }
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    // res.locals.message = err.message;
    // res.locals.error = req.app.get('env') === 'development' ? err : {};

    //variable messages for session auth status
    var authenticationError = req.session.error;
    var authenticationSuccess = req.session.success;

    delete req.session.error;
    delete req.session.success;

    res.locals.statusMessage = '';

    if (authenticationError) {
        res.locals.statusMessage = "<div class=\"alert alert-danger\" role=\"alert\"><strong>" + authenticationError + "</strong> </div> "
    }
    if (authenticationSuccess) {
        res.locals.statusMessage = "<div class=\"alert alert-danger\" role=\"alert\"><strong>" + authenticationSuccess + "</strong> </div> "
    }

    next()


    // render the error page
    // res.status(err.status || 500);
    // res.render('error');
});

module.exports = app;
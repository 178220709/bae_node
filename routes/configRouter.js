/*jslint node: true */
'use strict';

var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var path = require('path');
var logger = require('morgan');


module.exports.cfgView = function(app){
    // view engine setup
    app.set('views', './views');
    //app.set('view engine', 'jade');
    app.set('view engine', 'ejs');

    // uncomment after placing your favicon in /public
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static("./public"));
    //app.use(express.static(path.join(__dirname, 'public')));
};

module.exports.cfgRouter = function(app){
    var index = require('./index');
    var registerAPI = require('./registerAPI');
    var users = require('./users');
    var spider = require('./spider');
    app.use('/', index);
    app.use('/api', registerAPI);
    app.use('/users', users);
    app.use('/spider', spider);
};


module.exports.cfgError = function(app){
// catch 404 and forward to error handler
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

// error handlers
// development error handler
// will print stack trace
    if (app.get('env') === 'development') {
        app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }
};


//module.exports = router;

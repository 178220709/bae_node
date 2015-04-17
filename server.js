'use strict';
/*global global, require, process, module, baejs*/
/*jslint node: true */
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


global.baejs = {}; // 注册全局变量baejs
baejs.db =require('./lib/mongodbBase/db.js');
baejs.util =  require("./lib/public/util.js");
baejs.libs = {};
baejs.libs._ = require('underscore');
baejs.tools = {};
baejs.tools.logger = logger;
baejs.libs.thenjs = require("thenjs");

baejs.express = express;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


var index = require('./routes/index');
var registerAPI = require('./routes/registerAPI');
var users = require('./routes/users');
var spider = require('./routes/spider');
app.use('/', index);
app.use('/api', registerAPI);
app.use('/users', users);
app.use('/spider', spider);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


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

module.exports = app;
app.listen(process.env.PORT || '18080');

//开启爬虫
var haha = require('./lib/spider/haha/hahaSpider');
haha.runBackSpider();

var youmin =  require('./lib/spider/youmin/youmin');
youmin.runBackSpider();
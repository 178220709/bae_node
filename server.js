'use strict';
/*global global, require, process, module, baejs*/
/*jslint node: true */
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var MongoClient = require('mongodb').MongoClient;
// Connection URL
var url = 'mongodb://localhost:27017/jsonsong';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {

    console.log("Connected correctly to server");

    var cn1 = db.collection('sp_haha');
    var cn2 = db.collection('sp_youmin');
    function updateFn(err, rs) {
        console.log(rs);
    }
    var upArr = [{"url": "Url"}, {"flag": "Flag"}, {"addedTime": "AddedTime"}, {"weight": "Weight"}, {"content": "Content"}];

    cn2.update({}, {$rename: {"url": "Url"}},{}, updateFn);

    //_.each(upArr, function (item) {
    //    cn1.update({}, {$rename: item},{}, updateFn);
    //    cn2.update({}, {$rename: item},{}, updateFn);
    //});
});




global.baejs = {}; // 注册全局变量baejs
baejs.db = require('./lib/mongodbBase/db.js').db;
baejs.util = require("./lib/public/util.js");
baejs.libs = {};
baejs.libs._ = require('underscore');
baejs.tools = {};
baejs.tools.logger = logger;
baejs.libs.thenjs = require("thenjs");

baejs.express = express;
var _ = baejs.libs._;
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
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
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// development error handler
// will print stack trace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
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
//var haha = require('./lib/spider/haha/haha');
//haha.runBackSpider();
//
//var youmin =  require('./lib/spider/youmin/youmin');
//youmin.runBackSpider();








//cn.update({}, {$rename : {"url" : "Url"}},updateFn);
//cn.update({}, {$rename : {"flag" : "Flag"}}, false, true);
//cn.update({}, {$rename : {"addedTime" : "AddedTime"}}, false, true);
//cn.update({}, {$rename : {"weight" : "Weight"}}, false, true);
//cn.update({}, {$rename : {"content" : "Content"}}, false, true);



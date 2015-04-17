'use strict';
/*global global, require, process, module, baejs*/
/*jslint node: true */
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');



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
var configRouter = require('./routes/configRouter.js');
configRouter.cfgView(app);
configRouter.cfgRouter(app);
configRouter.cfgError(app);

module.exports = app;
app.listen(process.env.PORT || '18080');

//开启爬虫
var haha = require('./lib/spider/haha/hahaSpider');
haha.runBackSpider();

var youmin =  require('./lib/spider/youmin/youmin');
youmin.runBackSpider();
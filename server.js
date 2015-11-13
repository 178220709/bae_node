'use strict';
/*global global, require, process, module, baejs*/
/*jslint node: true */
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var _ = require('lodash');

var configRouter =  require('./routes/configRouter');
var taskConfig =  require('./app/task/taskConfig');

global.baejs = {}; // register global variable on baejs
baejs.db = require('./app/mongodbBase/db.js').db;
baejs.util = require("./app/public/util.js");
baejs.libs = {};
baejs.tools = {};
baejs.tools.logger = logger;
baejs.libs.thenjs = require("thenjs");
baejs.express = express;

//register api
var apiKeyArray = ["spider", "task","temp","jsonp"];
baejs.apis = {};
_.each(apiKeyArray, function (apiName) {
    baejs.apis[apiName] = require("./api/" + apiName + ".js");
});

//register task
taskConfig();


var app = express();
app.set('views', process.cwd()+'/views');
configRouter.cfgRouter(app);
configRouter.cfgView(app);
configRouter.cfgError(app);


module.exports = app;
var port = process.env.PORT  || process.env.VCAP_APP_PORT || '4071';
app.listen(port);
console.log("app is start at "+port);
//开启爬虫task
//baejs.apis.task.start();
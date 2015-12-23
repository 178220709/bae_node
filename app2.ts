///<reference path='./lib/dts/index.d.ts' />

import http = require("http")
import express = require("express");


import path = require('path');

var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

import _ = require('lodash');

var configRouter =  require('./routes/configRouter');
var taskConfig =  require('./app/task/taskConfig');

// register global variable on baejs
baejs.db = require('./app/mongodbBase/db.js').db;
baejs.util = require("./app/public/util.js");

//register api
var apiKeyArray = ["spider", "task","temp","jsonp"];

_.each(apiKeyArray, function (apiName) {
    baejs.apis[apiName] = require("./api/" + apiName + ".js");
});
//register task
taskConfig();
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

configRouter.cfgView(app);
configRouter.cfgRouter(app);
configRouter.cfgError(app);


module.exports = app;
var port = process.env.PORT  || process.env.VCAP_APP_PORT || '4071';
app.listen(port);
console.log("app is start at "+port);
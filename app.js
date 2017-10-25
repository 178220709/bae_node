'use strict';
/*global global, require, process, module, baejs*/
/*jslint node: true */
let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');

const configRouter = require('./routes/configRouter');
const taskConfig = require('./app/task/taskConfig');


//register api
const apiKeyArray = ["spider", "task", "temp", "jsonp"];

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
let port = process.env.PORT || process.env.VCAP_APP_PORT || '4071';
app.listen(parseInt(port));
console.log("app is start at " + port);
//开启爬虫task
//baejs.apis.task.start();
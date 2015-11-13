'use strict';
/*global global, require, process, module, baejs*/
/*jslint node: true */

var express = require('express');
var util = require('../app/public/util');
var router = express.Router();







/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Express4',
    time: util.formatDate( new Date(),"yyyy-MM-dd: HH:mm:ss"),
    osInfo :util.getOS()
  });
});

module.exports = router;

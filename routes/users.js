'use strict';
/*global global, require, process, module, baejs*/
/*jslint node: true */

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var re = {
    title:"this is user title",
    body:"this is user body ",
    time:new Date(),
    env:process.env
  }
  res.send(re);
});


/* GET users listing. */
router.get('/add', function(req, res, next) {
  var re = {
    title:"this is user add title",
    body:"this is user add body ",
    time:new Date()
  }
  var db = req.db;
  var collection = db.get('UsersTest');

  // Submit to the DB
  collection.insert(re, function (err, doc) {
    if (err) {
      re.msg = err;
  }
    else {
      re.msg = "re is insert";
      console.log("re is insert /");
    }
  });


  res.send(re);
});


module.exports = router;

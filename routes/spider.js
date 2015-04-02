var express = require('express');
var router = express.Router();
var path = require('path');
var cn =  require( path.join(process.cwd(), '/lib/mongodbBase/db')).spider;

/* GET users listing. */
router.get('/', function(req, res, next) {
  var re = {
    title:"this is spider title",
    body:"this is spider body ",
    time:new Date(),
    env:process.env
  }
  res.send(re);
});

router.get('/haha', function(req, res, next) {

  var re = {
    code:0,
    msg:"this is haha list ",
    rows:{}
  };
  cn.find({}, function(err, docs) {
   re.rows = docs;
    res.send(re);
  })
});

router.get('/haha1', function(req, res, next) {
  var cn =  require( path.join(process.cwd(), '/lib/mongodbBase/db')).spider;
  var re = {
    code:0,
    msg:"this is haha list ",
    title:"",
    content:""
  };
  cn.find({}, function(err, docs) {
    var doc = docs[0];
    re.content = doc.content;
    re.title = doc.flag;

    res.render('spider', re);
  })
});


module.exports = router;

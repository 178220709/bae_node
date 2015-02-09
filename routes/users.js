var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var re = {
    title:"this is INDEX title",
    body:"this is INDEX body ",
    time:new Date()
  }
  res.send(re);
});

module.exports = router;

'use strict';
/*global global, require, process, module, baejs*/
/*jslint node: true */

var express = require('express');
var router = express.Router();
var path = require('path');
var cn = require('../app/mongodbBase/db').spider;

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render("spider")
});

router.get('/haha', function (req, res, next) {
    
    var re = {
        code: 0,
        msg: "this is haha list ",
        rows: {}
    };
    cn.find({}, function (err, docs) {
        re.rows = docs;
        res.send(re);
    });
});

router.get('/getSteel', function (req, res, next) {

    String.prototype.format = function () {
        var args = arguments;
        var reg = /\{(\d+)}/g;
        return this.replace(reg, function (g0, g1) {
            return args[+g1];
        });
    };

    var fun = function(){
        window.gtoken = "server : " +  new Date();
    };

    var obj = {
        uname:222
    }

    var paras = req.query;
    if(paras.jsonpRequest){
        res.send  (   "{0}({1})".format(paras.jsonpRequest, '{uname:"liyh",pwd:"123"}')   );

        return ;
    }
    res.send(obj);
});


module.exports = router;

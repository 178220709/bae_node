'use strict';
/*global global, require, process, module, baejs*/
/*jslint node: true */
var _ = require('lodash');
var then = require('thenjs');

exports.jsonp_test = function (req, res, next) {

    var fun  = function(){
        console.log("this is a console call in service");
    };
    res.send(" var sfun = "+fun.toString());
};

var test = function(){
   // var res= {send: console.log};
  //  exports.rename2(null,res);
}();

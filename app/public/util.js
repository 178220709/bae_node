'use strict';
/*global global, require, process, module, baejs*/
/*jslint node: true */

var http = require('http');
var _ = require('lodash');
var dc = require('./DateCommon');
var os = require('os');

String.prototype.format = function () {
    var args = arguments;
    var reg = /\{(\d+)}/g;
    return this.replace(reg, function (g0, g1) {
        return args[+g1];
    });
};

Array.prototype.chain = function () {
   return _.chain(this)
};

var util = {};
util.getParasFromReq = function( list,req) {
    var para = {};
    if (!_.isArray(list) || !req) {
        return para;
    }
    _.each(list,function(key){
        para[key] = req.body[key];
    });
    return para;
};


var osInfoStr = "";
_.mapKeys(os, function (value, key) {
    if(_.isFunction(value) && key !=='getNetworkInterfaces'){
        var val = value();
        if(!_.isString()){
            val = JSON.stringify(val)
        }
        osInfoStr+=key+':'+val+'\n';
    }
});

util.getOS = function(){
    return osInfoStr;
};





_.extend(util,dc);


module.exports = util;



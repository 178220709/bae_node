///<reference path='../../lib/dts/index.d.ts' />


import {Request} from "express";
var dc = require('./DateCommon');
import os = require('os');

const formatreg  = /\{(\d+)}/g;
String.format = function (str:string,...args: any[]):string {
    return str.format(args)
};

String.prototype.format = function (...args: any[]):string {
    return this.replace(formatreg, function (g0, g1) {
        return args[+g1];
    });
};

Array.prototype.toChain = function () {
    return _.chain(this)
}

let pros = [{pro:1},{pro:2}]
var res = pros.toChain().filter(item=> item.pro > 1 ).map(pro=>pro).value()



util.getParasFromReq =(list:Array<string>,req:Request)=> {
    var para = {};
    if (!_.isArray(list) || !req) {
        return para;
    }
    _.each(list,function(key){
        para[key] = req.body[key];
    });
    return para;
}


var osInfoStr = "";


_.mapKeys<any,any>(os, function (value, key) {
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



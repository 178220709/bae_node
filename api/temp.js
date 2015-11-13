'use strict';
/*global global, require, process, module, baejs*/
/*jslint node: true */
var _ = require('lodash');
var then = require('thenjs');
var mongobase =  require('../app/mongodbBase/db');
var spider = mongobase.spider;

exports.rename = function (req, res, next) {
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://" + mongobase.url;
    // url = "mongodb://localhost:27017/nodetest1";
    var upArr = [{"url": "Url"}, {"flag": "Flag"}, {"addedTime": "AddedTime"}, {"weight": "Weight"}, {"content": "Content"}];
    var cn = {};
    then(function (cont) {
        return MongoClient.connect(url, cont);
    }).then(function (cont, db) {
        cn = db.collection('spider');
        cont();
    }).each(upArr, function (cont, item) {
        cn.update({}, {$rename: item}, {}, cont);
    }).then(function (cont, result) {
        res.send(result);
    }).fail(function (cont, error) {
        res.send(error);
    });
};


exports.rename2 = function (req, res, next) {
    var cn  = mongobase.spider;
    var upArr = [{"url": "Url"}, {"flag": "Flag"}, {"addedTime": "AddedTime"}, {"weight": "Weight"}, {"content": "Content"}];
    then(function(cont){
        cn.find({},{},cont);
    }).then(function(cont,list){
        cont(null,list);
    }).each(null,function(cont,item){
        var newm = {};
        newm.Url = item.url;
        newm.Flag = item.flag;
        newm.AddedTime = item.addedTime;
        newm.Weight = item.weight;
        newm.Content = item.content;
        cn.insert(newm,cont);
    }).then(function(cont,result){
        res.send(result.length);
    }).fail(function(cont,error){
        res.send(error);
    });
};

exports.del1 = function (req, res, next) {
    spider.count({$lt: new Date( "2015-04-19")},function(err, count){
        res.send(count);
    });
};
exports.del2 = function (req, res, next) {
    spider.remove({$gt: new Date( "2015-04-19")},function(err,count){
        res.send(count);
    });
};
exports.del3 = function (req, res, next) {
    spider.remove({$lt: new Date( "2015-04-19")},function(err,count){
        res.send(count);
    });
};
var test = function(){
    var res= {send: console.log};
    exports.rename2(null,res);
}();

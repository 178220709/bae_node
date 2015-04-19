'use strict';
/*global global, require, process, module, baejs*/
/*jslint node: true */
var _ = require('underscore');
var then = require('thenjs');

exports.rename = function (req, res, next) {
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://" + require('../lib/mongodbBase/db.js').url;
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

var test = function(){
    var res= {send: console.log};
   // exports.rename(null,res);
}();

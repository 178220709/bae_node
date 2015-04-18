'use strict';
/*global global, require, process, module, baejs*/
/*jslint node: true */

var monk = require('monk');
var db;
var url;
if(process.env.SERVER_SOFTWARE==="bae/3.0"){
    url = "xPOla3Kq34SikGXnVWGUFNjj:UIZ1RYdBSiauTePP8gzoxYp9YjoQGumn@mongo.duapp.com:8908/urAFiIKlkjhtaLrPNvit";
    console.log(url +' mongodb is init');
    db = monk(url);
}else{
    url = 'localhost:27017/jsonsong';
    console.log(url +' mongodb is init');
    db = monk(url);
}
var collections = {};
collections.haha = db.get("sp_haha");
collections.youmin = db.get("sp_youmin");



module.exports.db = db;
module.exports.cns = collections;
module.exports.url = url;



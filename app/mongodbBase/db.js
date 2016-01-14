'use strict';
/*global global, require, process, module, baejs*/
/*jslint node: true */

var mongo = require('mongoskin');

var os = require('os');
var db;
var url;
if (process.env.SERVER_SOFTWARE === "bae/3.0") {
    url = "xPOla3Kq34SikGXnVWGUFNjj:UIZ1RYdBSiauTePP8gzoxYp9YjoQGumn@mongo.duapp.com:8908/urAFiIKlkjhtaLrPNvit";
} else if (os.platform()==='linux' && os.hostname()=='jsonsong' ) {
    url = '127.0.0.1/jsonsong';}
else if ( os.hostname()=='DESKTOP-92VGR1C' ) {
    url = '127.0.0.1/jsonsong';
}else{
    url = 'mywin.int/jsonsong';
}
db =  mongo.db( "mongodb://"+ url, {native_parser:true});
console.log(url + ' mongodb is init \n');

module.exports.db = db;
module.exports.url = url;

db.bind('spider');
db.bind('SpiderEntity');

module.exports.spider =  db.spider;
module.exports.SpiderEntity =  db.SpiderEntity;



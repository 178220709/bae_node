var monk = require('monk');
var db;
if(process.env.SERVER_SOFTWARE=="bae/3.0"){
    console.log('server mongodb is init');
    db = monk('xPOla3Kq34SikGXnVWGUFNjj:UIZ1RYdBSiauTePP8gzoxYp9YjoQGumn@mongo.duapp.com:8908/urAFiIKlkjhtaLrPNvit');
}else{
    console.log('localhost:27017/nodetest1 mongodb is init');
    db = monk('localhost:27017/nodetest1');
}
var collections = {};
collections.spider = db.get("spider");

module.exports = collections;



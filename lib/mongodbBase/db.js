var monk = require('monk');
var db;
if(process.env.SERVER_SOFTWARE=="bae/3.0"){
    console.log('server mongodb is init');
    db = monk('xPOla3Kq34SikGXnVWGUFNjj:UIZ1RYdBSiauTePP8gzoxYp9YjoQGumn@mongo.duapp.com:8908/urAFiIKlkjhtaLrPNvit');
}else{
    console.log('localhost:27017/jsonsong mongodb is init');
    db = monk('localhost:27017/jsonsong');
}
var collections = {};
collections.spider = db.get("spider");

module.exports = db;



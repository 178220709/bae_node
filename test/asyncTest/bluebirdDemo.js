var _, assert, should, spider, util;

assert = require("assert");

should = require('chai').should();

_ = require("lodash");

var Promise = require('bluebird')

var http = require('http');

var url = "http://www.haha.mx/joke/2151530"


function getThen(url) {
    return new Promise(function (resolve, reject) {
        http.get(url, function (res) {
            var data = "";
            res.on('data', function (chunk) {
                data += chunk;
            });
            res.on("end", function () {
                resolve(data,data);
            });
        }).on("error", reject);
    });
}


describe("dbtest base crud", function () {
    it("#find", function (done) {
        getThen(url)
            .then(a=>{console.log(a);return 10;})
            .then(a=>{
                console.log(a?a:"ok but a is null")
            })
            .then(a=>done())
            .catch(a=> console.log("error"))
    });

});


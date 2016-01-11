var _, assert, should, spider, util;

assert = require("assert");

should = require('chai').should();

_ = require("lodash");

util = require("../../app/public/util");

spider = require("../../app/mongodbBase/db").spider;

describe("dbtest", function () {
    it("#find", function (done) {
        spider.find().toArray(function (err, items) {
            assert.ok(err == null);
            done()
        });
    });
    it("#insert", function (done) {
        var obj = {
            attr1: 123,
            attr2: "222"
        }
        spider.insert(obj, (err, doc)=> {
            var id = doc.insertedIds[0].toString()
            var attr2 = doc.ops[0].attr2
             console.log("the obj is inserted id: {0} ,  attr2:{1}".format(id,attr2))
            done()
        })
    });
    it("#remove", function (done) {
        var query = {
            attr1: 123
        }
        spider.remove(query, (err, doc)=> {
            var show = "remove {0} count ".format(doc.result.n)
            console.log(show)
            done()
        })
    });
});

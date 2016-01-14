var _, assert, should, thenjs, util;

assert = require("assert");

should = require('chai').should();

_ = require("lodash");

util = require("../app/public/util");

thenjs = require('thenjs');

describe("util", function () {
    it("#getUrlThen", function () {
        var pros, res;
        pros = [
            {
                pro: 1
            }, {
                pro: 2
            }
        ];
        res = pros.chain()
            .filter(item => item.pro > 1)
            .map((pro)=> pro.pro)
            .first().value();

        return res.should.equal(2);
    });
});


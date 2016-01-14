'use strict';
/*global global, require, process, module, baejs*/
/*jslint node: true */

var db = baejs.db;
var util = baejs.util;
var _ = require('lodash');
var then = require('thenjs');

var findDocuments = function (opts, cnName, result) {
    var defOpts = {
        pageSize: 10,
        pageIndex: 1,
        sort: {AddedTime: -1},
        cnName: "spider"
    };

    var query = _.clone(opts)
    _.mapKeys(defOpts, (value, key)=> delete query[key])

    var opt = _.extend(defOpts, opts);
    var cn = db[opt.cnName]

    result.PageSize = opt.pageSize;
    result.PageIndex = opt.pageIndex;
    return then(function (cont) {
        cn.count(query, cont);
    }).then(function (cont, count) {
        result.Count = count;
        cn.find(query,
            {
                limit: opt.pageSize,
                skip: (opt.pageIndex - 1) * opt.pageSize,
                sort: opt.sort
            }).toArray(cont); //  function (err,res)
    }).fail(function (cont, error) {
        result.Msg = error.message;
    });
};

exports.get = function (req, res, next) {
    var result = {
        Code:0,
        Count:0,
        Msg:"this is "+req.body.cnName+" list ",
        Rows:{}
    };

    findDocuments(req.body, "spider", result)
        .then(function (cont, docs) {
            var list = docs;
            result.Rows = docs;
            res.send(result);
        }).fail(function (cont, error) {
        res.send(error);
    });
};

exports.delete = function (req, res, next) {

    var cnName = req.body.cnName || "spider"
    var cn = db[cnName]
    var url = req.body.url
    if (!url) {
        return res.send("");
    }

    cn.remove({Url:url},err=>{
        res.send("");
    })
};

exports.getOne = function (req, res, next) {
    var url = req.body.url;
    var spiderName = req.body.spiderName;
    if (!url || !spiderName) {
        res.send("url spiderName  is need ");
        return;
    }
    var spider = require("./spider/youmin/youmin");
    spider.addModelThen(url).then(function (cont, result) {
        res.send(result);
    });
};

var test = function () {
    var url = "http://www.gamersky.com/ent/201501/508132.shtml";
    var res = {send: console.log};
    //  exports.getOne( {body:{url:url,spiderName:"youmin"}} ,res);
}();
'use strict';
/*global global, require, process, module, baejs*/
/*jslint node: true */

var db =  baejs.db;
var util =  baejs.util;
var _ = require('underscore');
var then = require('thenjs');

var findDocuments = function(opts,cnName) {
    var defOpts = {
        pageSize : 10,
        pageIndex : 1,
        sort:{addedTime:-1}
    };
   var opt  = _.extend(defOpts,opts);
    //$lt:小于
    var query = {};
    if(opts.addedTime){
        query.addedTime = {$gt: new Date( opts.addedTime)};
    }
    if(opts.cnName){
        cnName = opts.cnName;
    }
    return then(function(cont){
        db.get(cnName).find(query,
            {
                limit : opt.pageSize,
                skip:(opt.pageIndex-1)*opt.pageSize,
                sort : opt.sort
            }, // <-  here
            cont); //  function (err,res)
    });
};

exports.getSpiderList = function(req, res, next){
    var para = util.getParasFromReq(["pageSize","pageIndex","addedTime"],req);
    var result = {
        code:0,
        msg:"this is haha list ",
        rows:{}
    };
    findDocuments(req.body,"spider")
        .then(function(cont,docs){
            var list = docs;
            result.rows = docs;
            res.send(result);
        }).fail(function(cont,error){
            res.send(error);
        });
};


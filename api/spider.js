/**
 * Created by Administrator on 2015/4/2.
 */
'use strict';
/*global require, module, Buffer, process, baejs*/

var cn =  baejs.db.get("spider");
var util =  baejs.util;
var _ = require('underscore');
var then = require('thenjs');

var findDocuments = function(opts) {
    var defOpts = {
        pageSize : 10,
        pageIndex : 1,
        sort:{addedTime:-1}
    }
   var opt  = _.extend(defOpts,opts);
    //$lt:小于
    var query = {};
    if(opts.addedTime){
        query.addedTime = {$gt: new Date( opts.addedTime)};
    }

    return then(function(cont){
        cn.find(query,
            {
                limit : opt.pageSize,
                skip:(opt.pageIndex-1)*opt.pageSize,
                sort : opt.sort
            }, // <-  here
            cont); //  function (err,res)
    })
}

exports.getHahaList = function(req, res, next){
    var para = util.getParasFromReq(["pageSize","pageIndex","addedTime"],req);
    var result = {
        code:0,
        msg:"this is haha list ",
        rows:{}
    };
    findDocuments(req.body)
        .then(function(cont,docs){
            var list = docs;
            result.rows = docs;
            res.send(result);
        })
}



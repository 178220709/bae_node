'use strict';
/*global global, require, process, module, baejs*/
/*jslint node: true */

var db =  baejs.db;
var util =  baejs.util;
var _ = require('underscore');
var then = require('thenjs');

var findDocuments = function(opts,cnName,result) {
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
    result.pageSize = opt.pageSize;
    result.pageIndex = opt.pageIndex;
    return then(function(cont){
        db.get(cnName).count(query,cont);
    }).then(function(cont,count){
        result.count = count;
        db.get(cnName).find(query,
            {
                limit : opt.pageSize,
                skip:(opt.pageIndex-1)*opt.pageSize,
                sort : opt.sort
            }, // <-  here
            cont); //  function (err,res)
    }).fail(function(cont,error){
        result.msg=error.message;
    });
};

exports.getSpiderList = function(req, res, next){
    var para = util.getParasFromReq(["pageSize","pageIndex","addedTime"],req);
    var result = {
        code:0,
        count:0,
        msg:"this is "+req.body.cnName+" list ",
        rows:{}
    };
    findDocuments(req.body,"spider",result)
        .then(function(cont,docs){
            var list = docs;
            result.rows = docs;
            res.send(result);
        }).fail(function(cont,error){
            res.send(error);
        });
};

exports.getOne = function(req, res, next){
    var url = req.body.url;
    var spiderName = req.body.spiderName;
    if(!url || !spiderName){
        res.send("url spiderName  is need ");
        return;
    }
 var spider = require("../lib/spider/youmin/youmin");
    spider.addModelThen(url).then(function(cont,result){
        res.send(result);
    });
};

var test = function(){
    var url = "http://www.gamersky.com/ent/201501/508132.shtml";
    var res= {send: console.log};
    exports.getOne( {body:{url:url,spiderName:"youmin"}} ,res);

}();
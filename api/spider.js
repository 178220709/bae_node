'use strict';
/*global global, require, process, module, baejs*/
/*jslint node: true */

var db =  baejs.db;
var util =  baejs.util;
var _ = require('lodash');
var then = require('thenjs');

var findDocuments = function(opts,cnName,result) {
    var defOpts = {
        pageSize : 10,
        pageIndex : 1,
        sort:{AddedTime:-1}
    };
    var opt  = _.extend(defOpts,opts);
    //$lt:小于
    var query = {};
    if(opts.AddedTime){
        query.AddedTime = {$gt: new Date( opts.AddedTime)};
    }
    if(opts.cnName){
        cnName = opts.cnName;
    }
    result.PageSize = opt.pageSize;
    result.PageIndex = opt.pageIndex;
    return then(function(cont){
        db.get(cnName).count(query,cont);
    }).then(function(cont,count){
        result.Count = count;
        db.get(cnName).find(query,
            {
                limit : opt.pageSize,
                skip:(opt.pageIndex-1)*opt.pageSize,
                sort : opt.sort
            }, // <-  here
            cont); //  function (err,res)
    }).fail(function(cont,error){
        result.Msg=error.message;
    });
};

exports.getSpiderList = function(req, res, next){

    var result = {
        Code:0,
        Count:0,
        Msg:"this is "+req.body.cnName+" list ",
        Rows:{}
    };
    findDocuments(req.body,"spider",result)
        .then(function(cont,docs){
            var list = docs;
            result.Rows = docs;
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
  //  exports.getOne( {body:{url:url,spiderName:"youmin"}} ,res);
}();
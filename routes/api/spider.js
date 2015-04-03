/**
 * Created by Administrator on 2015/4/2.
 */
var express = require('express');
var router = express.Router();
var path = require('path');
var cn =  require('../../lib/mongodbBase/db').spider;
var util =  require( path.join( process.cwd(),"lib/public/util.js") );
var _ = require('underscore');
var findDocuments = function(opts, callback) {
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
    cn.find(query,
        {
            limit : opt.pageSize,
            skip:(opt.pageIndex-1)*opt.pageSize,
            sort : opt.sort
        }, // <-  here
        function (err,res) {
            callback(res);
        });
}

router.post('/haha/getList', function(req, res, next) {
    var para = util.getParasFromReq(["pageSize","pageIndex","addedTime"],req);

    var result = {
        code:0,
        msg:"this is haha list ",
        rows:{}
    };
    findDocuments(req.body,function(docs){
         var list = docs;
        result.rows = docs;
        res.send(result);
    });
});

module.exports = router;

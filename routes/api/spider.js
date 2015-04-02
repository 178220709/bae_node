/**
 * Created by Administrator on 2015/4/2.
 */
var express = require('express');
var router = express.Router();
var path = require('path');
var cn =  require('../../lib/mongodbBase/db').spider;
var _ = require('underscore');
var findDocuments = function(opts, callback) {
    var defOpts = {
        pageSize : 10,
        pageIndex : 1,
        sort:{addedTime:-1}
    }
   var opt  = _.extend(defOpts,opts);

    cn.find({},
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
    var result = {
        code:0,
        msg:"this is haha list ",
        rows:{}
    };
    findDocuments({pageSize:12},function(docs){
         var list = docs;
        result.rows = docs;
        res.send(result);
    });
});

module.exports = router;

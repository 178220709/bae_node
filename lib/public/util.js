
var http = require('http');
var _ = require('lodash');


var help = {};
help.getParasFromReq = function( list,req) {
    var para = {};
    if (!_.isArray(list) || !req) {
        return para;
    }
    _.each(list,function(key){
        para[key] = req.body[key];
    })
    return para;
}




module.exports = help;



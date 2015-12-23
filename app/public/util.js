///<reference path='../../lib/dts/index.d.ts' />
var dc = require('./DateCommon');
var os = require('os');
var formatreg = /\{(\d+)}/g;
String.format = function (str) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return str.format(args);
};
String.prototype.format = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    return this.replace(formatreg, function (g0, g1) {
        return args[+g1];
    });
};
Array.prototype.toChain = function () {
    return _.chain(this);
};
var pros = [{ pro: 1 }, { pro: 2 }];
var res = pros.toChain().filter(function (item) { return item.pro > 1; }).map(function (pro) { return pro; }).value();
util.getParasFromReq = function (list, req) {
    var para = {};
    if (!_.isArray(list) || !req) {
        return para;
    }
    _.each(list, function (key) {
        para[key] = req.body[key];
    });
    return para;
};
var osInfoStr = "";
_.mapKeys(os, function (value, key) {
    if (_.isFunction(value) && key !== 'getNetworkInterfaces') {
        var val = value();
        if (!_.isString()) {
            val = JSON.stringify(val);
        }
        osInfoStr += key + ':' + val + '\n';
    }
});
util.getOS = function () {
    return osInfoStr;
};
_.extend(util, dc);
module.exports = util;
//# sourceMappingURL=util.js.map
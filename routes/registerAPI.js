'use strict';
/*global global, require, process, module, baejs*/
/*jslint node: true */

var express = require('express');
var router = express.Router();
var _ = require('underscore');

//注册api里面的接口
var apis = ["spider"];

var apiList = [];//item : ctrl , action , fun
_.each(apis, function (apiName) {
    var _api = require("../api/" + apiName + ".js");

    for (var action  in _api) {
        apiList.push({
            ctrl: apiName,
            action: action,
            fun: _api[action]
        });
    }
});

_.each(apiList, function (actionObj) {
    router.post(_.template("/<%= ctrl %>/<%= action %>")(actionObj), actionObj.fun);
});


if (!process.env.USER_ShowApi || process.env.USER_ShowApi === 1) {//配置，关掉api说明
    router.get('/', function (req, res, next) {
        res.render('apiShow', {
            title: 'api 说明', actions: _.map(apiList, function (item) {
                return {
                    ctrl: item.ctrl, action: item.action
                };
            })
        });
    });
}


module.exports = router;

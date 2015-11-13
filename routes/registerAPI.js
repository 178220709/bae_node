'use strict';
/*global global, require, process, module, baejs*/
/*jslint node: true */

var express = require('express');
var router = express.Router();
var _ = require('lodash');


//注册api里面的接口
var apis = baejs.apis;
var apiList = []; //item : ctrl , action , fun
for(var apiKey in apis){
    if(apiKey){
        for (var actionKey  in apis[apiKey]) {
            if (actionKey) {
                apiList.push({
                    ctrl: apiKey,
                    action: actionKey,
                    fun: apis[apiKey][actionKey]
                });
            }
        }
    }
}




_.each(apiList, function (api) {
    router.use(_.template("/<%= ctrl %>/<%= action %>")(api), api.fun);
   // router.get(_.template("/<%= ctrl %>/<%= action %>")(api), api.fun);
});


if (!process.env.USER_ShowApi || process.env.USER_ShowApi === 1) {//配置，关掉api说明
    router.use('/', function (req, res, next) {
        res.render('apiShow', {
            title: 'api 说明', actions: _.map(apiList, function (api) {
                return {
                    ctrl: api.ctrl, action: api.action
                };
            })
        });
    });
}


module.exports = router;

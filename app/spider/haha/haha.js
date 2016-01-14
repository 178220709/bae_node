'use strict';
/*global global, require, process, module, baejs*/
/*jslint node: true */

var _ = require('lodash');
var TaskItem = require('../../task/TaskItem');
var then = require('thenjs');
var help = require('../core/spiderHelper');
var collection = require('../../mongodbBase/db').spider;

var haha = {
    exurl: "http://www.haha.mx/joke/1661672",
    Type: 1
};
var getFlag = function (url) {
    return (url.slice(-7));
};

haha.getModelThen = function (url, topCont) {
    help.getUrlThen(url).then(function (cont, data) {
        var joke = {};
        joke.Type = 1;
        var $ = help.load(data);
        var topContent = $("#main");
        joke.Content = topContent.find(".joke-main-content").eq(0).html();
        var zan = parseInt(topContent.find(".joke-main-misc  .fl a").eq(0).text());
        var bishi = parseInt(topContent.find(".joke-main-misc  .fl a").eq(1).text());
        var weight = ((zan + bishi) / 100) * (zan - bishi * 3);
        joke.Url = url;
        joke.Weight = parseInt(weight);
        joke.Flag = getFlag(url);
        joke.AddedTime = new Date();
        topCont(null, joke);
    });
};

haha.getCurrentThen = function () {
    //从某个页面得到当前热门推荐
    return help.getUrlThen(haha.exurl).then(function (cont, data) {
        var $ = help.load(data);
        //解析出所有的热门推荐笑话的url 包括图片笑话和文字笑话
        var imgJokes = _.map($(".recommand-joke-main-list-thumbnail .joke-text.word-wrap a"), function ($a) {
            return "http://www.haha.mx" + $a.attribs.href;
        });
        var textJokes = _.map($(".recommand-joke-main-list-text  a"), function ($a) {
            return "http://www.haha.mx" + $a.attribs.href;
        });
        var urls = _.union(imgJokes, textJokes);
        cont(null, urls);
    });
};


var insertUrlThen = function (url, callCont) {
    then(function (cont) {
        collection.findOne({Url: url}, {}, cont);
    }).then(function (cont, doc) {
        if (doc) {
            help.showExist("url: " + url + " is already exist :");
            callCont(null);
        } else {
            cont()
        }
    }).then(function (cont) {
        haha.getModelThen(url, cont)
    }).then(function (cont, model) {
        if (model.Content ){
            collection.insert(model, cont);
        }else {
            cont(new Error("haha get wrong content "))
        }
    }).then(function (cont, doc) {
        help.log("model is insert :" + url);
        callCont(null);
    }).fail(function (cont, err) {
        help.log(err);
    });
};


var taskFun = function () {
    haha.getCurrentThen()
        .each(null, function (cont, url, index, urls) {
            insertUrlThen(url, cont)
        }).then(function (cont, results) {
        help.log("spider is over ");
    }).fail(function (cont, err) {
        help.log(err);
    });
};

haha.taskItem = new TaskItem("spider.haha", taskFun);

module.exports = haha;



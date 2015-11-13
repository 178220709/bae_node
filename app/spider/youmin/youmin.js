'use strict';
/*global global, require, process, module, baejs*/
/*jslint node: true */


var _ = require('lodash');
var then = require('thenjs');
var help = require('../core/spiderHelper');
var PartialReader = require('../core/partialReader.js');
var TaskItem = require('../../task/TaskItem');
var collection = require('../../mongodbBase/db').spider;
var EX_URL = "http://www.gamersky.com/ent/";

var spider = {};

var factory = {
    getTitle: function (me) {
        //根据me中的$设置当前title
        me.model.Title = me.$(".tit2.mid h1").text();
    },

    getCurrent: function (me) {
        var $ = me.$;
        //根据me中的$ 附加上当前的content
        $(".left_got #gspaging p").each(function () {
            me.model.Content += $.html(this);
        });
    },
    checkAndMoveNext: function (me) {
        // 根据当前doc 分析是否有下一页，有更改currentUrl   返回then链 参数 :bool 是否可以next
        var $ = me.$;
        var next = "";
        $(".page_css a").each(function () {
            var $a = $(this);
            if ($a.text() === "下一页") {
                next = $a.attr("href");
            }
        });
        if (next !== "") {
            me.currentUrl = next;
            return help.getUrlThen(next)
                .then(function (cont, data) {
                    delete me.$;
                    me.$ = help.load(data);
                    cont(null, true);
                });
        } else {
            return then(function (cont) {
                cont(null, false);
            });
        }
    }
};


spider.getModelThen = function (url, topCont) {
    var reader = new PartialReader(url, factory);
    reader.start().then(function (cont, me) {
        var model = me.model;
        model.AddedTime = new Date();
        model.Type = 1;
        topCont(null, model);
    });
};

spider.addModelThen = function (url, topCont) {
    then(function (cont) {
        collection.findOne({Url: url}, {}, cont);
    }).then(function (cont, doc) {
        if (doc) {
            help.showExist("url: " + url + "  is already exist :");
            topCont()
        } else {
            cont();
        }
    }).then(function (cont) {
        spider.getModelThen(url, cont)
    }).then(function (cont, model) {
        collection.insert(model, cont);
    }).then(function (cont, doc) {
        help.log("model is insert :" + doc.Url);
        topCont(null, doc);
    }).fail(function (cont, error) {
        cont(null, error);
    });
};

spider.getCurrent = function () {
    //从某个页面得到当前热门推荐
    // var urls = [];
    help.getUrlThen(EX_URL).then(function (cont, data) {
        var $ = help.load(data);
        var urls = _.map($(".Lpic li .t2 a"), function ($a) {
            return $a.attribs.href;
        });
        cont(null, urls);
    }).eachSeries(null, function (cont, url) {
        spider.addModelThen(url, cont);
    }).then(function (cont) {
        help.log("getCurrent eachSeries is over :");
        cont();
    }).fail(function (cont, err) {
        console.log(err);
    });
};

spider.taskItem = new TaskItem("spider.youmin", spider.getCurrent);

module.exports = spider;

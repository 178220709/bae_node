'use strict';
/*global global, require, process, module, baejs*/
/*jslint node: true */


var _ = require('underscore');
var then = require('thenjs');
var help = require('../core/spiderHelper');
var PartialReader = require('../core/PartialReader');

var collection = require('../../mongodbBase/db').get("sp_youmin");
var EX_URL = "http://www.gamersky.com/ent/";

var spider = {};

var factory = {
    getTitle: function (me) {
        //根据me中的$设置当前title
        me.model.title = me.$(".tit2.mid h1").text();
    },

    getCurrent: function (me) {
        var $ = me.$;
        //根据me中的$ 附加上当前的content
        $(".left_got #gspaging p").each(function () {
            me.model.content += $.html(this);
        });
    },
    checkAndMoveNext: function (me) {
        // 根据当前doc 分析是否有下一页，有更改currentUrl   返回then链 参数为是否可以next
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


spider.getModelThen = function (url) {
    var reader = new PartialReader(url, factory);
    return reader.start().then(function (cont, me) {
        var model = me.model;
        cont(null, model);
    });
};

spider.addModelMsgThen = function (url) {
    return spider.getModelThen(url)
        .then(function (cont, model) {

            collection.insert(model,cont);
        }).then(function (cont, model){

        }).fail;
};

spider.getCurrent = function () {
    //从某个页面得到当前热门推荐

    help.getUrlThen(EX_URL).then(function (cont, data) {
        var $ = help.load(data);
        var urls = _.map($(".Lpic li .t2 a"), function ($a) {
            return $a.attribs.href;
        });
        cont(null, urls);
    }).then(function (cont, urls) {

        then.each(urls, function (cont, _url) {
            collection.findOne({url: (_url)}, cont)
                .then(function (cont, doc) {
                    if (doc) {
                        help.showExist("url: " + _url + "  is already exist :");

                    } else {
                        spider.getModelThen(_url)
                            .then(function (cont, model) {
                                help.log("model is insert :" + model.url);
                                collection.insert(model, cont);
                            });
                    }
                });
        });
    }).fail(function (cont, err) {
        console.log(err);
    });
};


spider.runBackSpider = function () {
    try {
        spider.task = setInterval(spider.getCurrent, 30 * 60 * 1300);
    }
    catch (e) {
        console.log(e);
    }

};
spider.stopBackSpider = function () {
    clearInterval(spider.task);
};
spider.test = function () {
    //var url = "http://www.gamersky.com/ent/201503/539264.shtml";
    //spider.getModelThen(url);
    spider.getCurrent();
};
module.exports = spider;
//haha.runBackSpider();
spider.test();

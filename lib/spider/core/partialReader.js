/**
 * Created by Administrator on 2015/4/16.
 */
var cheerio = require('cheerio');
var _ = require('underscore');
var then = require('thenjs');
var help = require('./spiderHelper');
var Limit = 80;


var factory = {
    getTitle: function (me) {
    //根据me中的$设置当前title
    },
    getCurrent: function (me) {
        //根据me中的$ 附加上当前的content
    },
    CheckAndMoveNext: function (me) {
        // 根据当前doc 分析是否有下一页，有更改currentUrl   返回then链 参数为是否可以next
    }
};

//读取局部页面的工厂 初始化需要提供4个函数 getTitle getCurrent CheckAndMoveNext
function partialReader(url, factory) {
    this.baseUrl = url;
    this.currentUrl = url;
    this.model = {};
    this.model.title = "";
    this.model.content = "";
    this.model.url = url;
    this.pageId = 0;
    this.getTitle = factory.getTitle;
    this.getCurrent = factory.getCurrent;
    this.checkAndMoveNext = factory.checkAndMoveNext;
}

function getResult(me,cont) {
    var topCont = cont;
    if (me.pageId > Limit) {
        topCont(null,me);
    }
    me.pageId++;
    me.getCurrent(me);
    me.checkAndMoveNext(me).then(function (cont, b) {
        if (b) {
            getResult(me,topCont)
        } else {
            topCont(null,me);
        }
    });
};


partialReader.prototype.start = function () {
    var me = this;
    return help.getUrlThen(me.baseUrl)
        .then(function (cont, data) {
            me.$ = help.load(data);
            if (_.isFunction(me.getTitle)) {
                me.getTitle(me)
            }
            cont()
        }).then(function(cont){
            getResult(me,cont)
        })
};

module.exports = partialReader
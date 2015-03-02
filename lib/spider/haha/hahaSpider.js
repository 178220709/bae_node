var cheerio = require('cheerio');
var help = require('../core/spiderHelper');
var _ = require('underscore');
var collection = require('../../mongodbBase/db').spider;
var exurl = "http://www.haha.mx/joke/1661672";

var haha = {};
var getFlag = function(url){
    return   parseInt(url.slice(-7)) ;
};

haha.getJokeFromUrl = function(url,callback){
  var joke = {};
    help.getUrlHtml(url,function(data){
        var $ = cheerio.load(data);
        var topContent  = $(".list.joke.joke-item");
        joke.content =   topContent.find(".clearfix.mt-15").html();
        var zan = parseInt(topContent.find(".clearfix.mt-20.joke-item-footer .fl a").eq(0).text()) ;
        var bishi =  parseInt(topContent.find(".clearfix.mt-20.joke-item-footer .fl a").eq(1).text()) ;
        var weight  = ((zan + bishi) / 100) * (zan - bishi * 3);
        joke.url = url;
        joke.weight = weight;
        joke.flag =getFlag(url);
        callback(joke);
    })
};

haha.getCurrent = function(){
    //从某个页面得到当前热门推荐
    help.getUrlHtml(exurl,function(data) {
        var $ = cheerio.load(data);
        var imgJokes = _.map($(".recommand-joke-main-list-thumbnail .joke-text.word-wrap a"), function ($a) {
            return "http://www.haha.mx" + $a.attribs.href;
        });
        var testJokes = _.map($(".recommand-joke-main-list-text  a"), function ($a) {
            return "http://www.haha.mx" + $a.attribs.href;
        });
        var urls = _.union(imgJokes, testJokes);
        //解析出所有的热门推荐笑话的url

        //遍历  检查是否已经爬取过 回调太恶心!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        _.each(urls, function (url, index) {
            collection.findOne({flag: getFlag(url)}, function (err, doc) {
                if (doc) {
                    console.log("model: "+ getFlag(url)+"  is already exist :" );
                    return;
                } else {
                    haha.getJokeFromUrl(url, function (model) {
                        model.addedTime = new Date();
                        collection.insert(model, function (err, doc) {
                            if (err) {
                                model.msg = err;
                            }
                            else {
                                console.log("model is insert :" + model._id);
                            }
                        });
                    });
                }
            })
        })
    })
};

haha.runBackSpider = function() {
    //collection.find({},function(err,docs){
    //    _.each(docs,function(doc){
    //        if (doc.flag){
    //            doc.flag = parseInt(doc.flag);
    //            collection.updateById(doc._id,doc);
    //        }
    //    })
    //});

    haha.getCurrent();
    haha.task = setInterval(haha.getCurrent, 30*60 * 1000);
};
haha.stopBackSpider = function(){
    clearInterval( haha.task );
};

module.exports = haha;



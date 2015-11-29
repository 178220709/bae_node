"use strict"

#global global, require, process, module, baejs

#jslint node: true
_ = require("lodash")
htmlStr=   require("./caoliuTemp.json")

TaskItem = require("../../task/TaskItem")
then_ = require("thenjs")
help = require("../core/spiderHelper")
collection = require("../../mongodbBase/db").spider
reader =
  exurl: "http://www.reader.mx/joke/1661672"
  Type: 3




haha.getModelThen = (url, topCont) ->
  help.getUrlThen(url).then (cont, data) ->
    model = {}
    model.Type = 1
    $ = help.load(data)
    $ = help.load(htmlStr)
    model.Title = $("div.t td:eq(0)").html().replace("<b>本頁主題:</b>","")
    model.Content =  $("div.t2 table th:eq(1) table tr td   ").html()
    model.Url = url
    model.AddedTime = new Date()
    topCont(null, model)


haha.getCurrentThen = ->

#从某个页面得到当前热门推荐
  help.getUrlThen(haha.exurl).then (cont, data) ->
    $ = help.load(data)

    #解析出所有的热门推荐笑话的url 包括图片笑话和文字笑话
    imgJokes = _.map($(".recommand-joke-main-list-thumbnail .joke-text.word-wrap a"), ($a) ->
      "http://www.reader.mx" + $a.attribs.href
    )
    textJokes = _.map($(".recommand-joke-main-list-text  a"), ($a) ->
      "http://www.reader.mx" + $a.attribs.href
    )
    urls = _.union(imgJokes, textJokes)
    cont null, urls


insertUrlThen = (url, callCont) ->
  then_((cont) ->
    collection.findOne
      Url: url
    , {}, cont
  ).then((cont, doc) ->
    if doc
      help.showExist "url: " + url + " is already exist :"
      callCont null
    else
      cont()
  ).then((cont) ->
    haha.getModelThen url, cont
  ).then((cont, model) ->
    if model.Content
      collection.insert model, cont
    else
      cont new Error("reader get wrong content ")
  ).then((cont, doc) ->
    help.log "model is insert :" + doc.Url
    callCont null
  ).fail (cont, err) ->
    help.log err


taskFun = ->
  haha.getCurrentThen().each(null, (cont, url, index, urls) ->
    insertUrlThen url, cont
  ).then((cont, results) ->
    help.log "spider is over "
  ).fail (cont, err) ->
    help.log err


haha.taskItem = new TaskItem("spider.reader", taskFun)
module.exports = haha
assert = require("assert")
should = require('chai').should()
_ = require("lodash")
util = require("./public/util")
help = require("./spider/core/spiderHelper")
haha = require("./spider/haha/haha")
youmin  = require("./spider/youmin/youmin")


describe "core", ->
  it "#getUrlThen", (done) ->
    url = "www.baidu.com"
    help.getUrlThen(url).then((cont, data)->
      data.should.a("string").and.ok
      data.length.should.above 100
      done()
    )
  it "#log is define", ()->
    help.log.should.a("function").and.ok

# assert chain to  check model
(model)->
  model.should.ok
  .and.should.property "Title"
  .and.should.property "Context"

describe "haha spider config ", ->
  it "#getModelThen()", (done)->
    haha.getModelThen(haha.exurl).then (cont, model, zb)->
      model.Content.length.should.above 1
      zb.zan.should.ok
      zb.bishi.should.ok
      done()

  it "#getCurrentThen()", (done)->
    haha.getCurrentThen().then (cont, urls)->
      urls.should.be.a("array")
      urls.length.should.equal 16
      _.all(urls, (url)->
        url.should.be.a "string"
        url.length > 1
      ).should.ok
      done()

describe " youmin spidr config ", ->
  it "#getModelThen()", (done)->
    youmin.getModelThen("").then (cont, model, zb)->
      #游民结构发生变更

      done()

  it "#getCurrentThen()", (done)->
    haha.getCurrentThen().then (cont, urls)->
      urls.should.be.a("array")
      urls.length.should.equal 16
      _.all(urls, (url)->
        url.should.be.a "string"
        url.length > 1
      ).should.ok
      done()
assert = require("assert")
should = require('chai').should()
_ = require("lodash")
util = require("../../app/public/util")
spider = require("../../app/mongodbBase/db").spider


describe "dbtest", ->
  it "#find", (done) ->
    spider.find(null, (p1, p2)->
      tt = p1
      done()
    )

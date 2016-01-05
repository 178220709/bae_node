assert = require("assert")
should = require('chai').should()
_ = require("lodash")
util = require("../../app/public/util")

thenjs= require('thenjs')


describe "util", ->
  it "#getUrlThen", (done) ->
    pros = [{pro:1},{pro:2}]
    res = pros.chain().filter(item -> item.pro > 1 ).map(pro -> pro.pro).first().value()
    res.should.equal(2)


  it "#log is define", ()->
    help.log.should.a("function").and.ok

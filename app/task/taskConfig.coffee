# 统一管理task任务

_ = require('lodash');
taskFactory = require('./taskFactory');
item1 = require('../spider/haha/haha').taskItem;
item2 = require('../spider/youmin/youmin').taskItem;

module.exports = (isRun=true)->
  taskFactory.add(item1)
  taskFactory.add(item2)
  if isRun
    item1.start()
    #item2.start()


# 统一管理task任务

_ = require('lodash');


taskFactory = {
  tasks: []
};

o = taskFactory;

o.getAllNames = ()-> _.map(o.tasks, (item)-> item.name)


o.getAll = ()-> o.tasks

o.add = (item)->
  names = o.getAllNames()
  unless _.includes(names,item.name)
    o.tasks.push(item)

o.get = (name)-> _.find(o.tasks, (item)-> item.name == name)

o.start = (name) ->
  item = o.get(name)
  if item
    item.start()

o.stop = (name) ->
  item = o.get(name)
  if item
    item.stop()


module.exports = o;

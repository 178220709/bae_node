_ = require('lodash');

Min = 60 * 1000;
Hour = 60 * Min;

defOpt = {
  interval: 30 * Min
}
TaskItem = (name, trigger, opt)->
  me = this;
  me.status = 0 #show task status , 0=init 1=running 2=stop 3=error
  me.option = _.assign(defOpt, opt)
  me.task = {}
  me.name = name
  if _.isFunction(trigger)
    me.trigger = trigger
  else
    throw new error ("callFun is not allow empty");
  return me;

TaskItem.prototype.start = ()->
  me = this
  me.status = 1
  this.task = setInterval(me.trigger, me.option.interval)


TaskItem.prototype.stop = ()->
  me = this
  me.status = 2
  clearInterval(me.task)


module.exports = TaskItem;
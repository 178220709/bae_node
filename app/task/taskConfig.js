// Generated by CoffeeScript 1.9.3
(function() {
  var _, item1, item2, taskFactory;

  _ = require('lodash');

  taskFactory = require('./taskFactory');

  item1 = require('../spider/haha/haha').taskItem;

  item2 = require('../spider/youmin/youmin').taskItem;

  module.exports = function(isRun) {
    if (isRun == null) {
      isRun = true;
    }
    taskFactory.add(item1);
    taskFactory.add(item2);
    if (isRun) {
      item1.start();
      return item2.start();
    }
  };

}).call(this);

//# sourceMappingURL=taskConfig.js.map
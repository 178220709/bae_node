'use strict';
/*global global, require, process, module, baejs*/
/*jslint node: true */
var _ = require('underscore');
var tasks = [{name: "haha", getCurrent: require('../lib/spider/haha/haha').getCurrent, interval: 30 * 60 * 1300,instance:null},
    {name: "youmin", getCurrent: require('../lib/spider/youmin/youmin').getCurrent, interval: 30 * 60 * 1500,instance:null}];




exports.runOnce = function(name){
    var rTasks = tasks;
    if(name){
        rTasks = _.filter(rTasks,function(task){return task.name===name;});
    }
    _.each(rTasks,function(task){
        task.getCurrent();
    });
};

exports.start = function(isImmediately){
    _.each(tasks,function(task){
        if(task.instance){
            clearInterval(task.instance);
        }
        console.log("process.env.USER_ImmediatelyTask is " +process.env.USER_ImmediatelyTask);
        if ((process.env.USER_ImmediatelyTask && process.env.USER_ImmediatelyTask === 1) ||isImmediately) {
            task.getCurrent();
        }
        task.instance = setInterval(task.getCurrent, task.interval);
    });
};
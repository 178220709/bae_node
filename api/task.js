'use strict';
/*global global, require, process, module, baejs*/
/*jslint node: true */
var _ = require('lodash');
var taskFactory = require('../app/task/taskFactory');


exports.getList = function (req, res, next) {
    var tasks = taskFactory.getAll();
    var taskStatus = _.map(tasks, function (item) {
        return item.name + "   status : " +item.status;
    });
    res.send(taskStatus);
};


function filterTask(tasks,name) {
    var rTasks = tasks;
    if (name) {
        rTasks = _.filter(rTasks, function (task) {
            return task.name === name;
        });
    }
    return rTasks;
}


exports.start = function (req, res, next) {
    var name = req.body.name;
    var tasks = taskFactory.getAll();
    var rTasks = filterTask(tasks,name);
    _.each(rTasks, function (task) {
        task.start();
    });
};

exports.stop = function (req, res, next) {
    var name = req.body.name;
    var tasks = taskFactory.getAll();
    var rTasks = filterTask(tasks,name);
    _.each(rTasks, function (task) {
        task.stop();
    });
};
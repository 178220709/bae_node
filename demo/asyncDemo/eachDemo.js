'use strict';
/*global global, require, process, module, baejs*/
/*jslint node: true */

var _ = require('underscore');
var then = require('thenjs');

var arr = [1, 2, 3, 4, 5];
var log = console.log;


var demo1 = function () {
    _.each(arr, function (item) {
        setTimeout(function () {
            var test = (new Date()).getTime();
            log(test);

        }, 2000)
    })
}


var demo2 = function () {
    then.each(arr, function (cont, item) {
        setTimeout(function () {
            var test = (new Date()).getTime();
            log(test);
            cont(null, item * 2);
        }, 2000)
    }).then(function (cont, item) {
        log(item);
    })
}


var demo3 = function () {
    var index = 0;
    var getItem = function (index, callback) {
        log(arr[index]);
        callback(arr[index]);
    };
    var getItem2 = function (index, callback) {
        log(arr[index]);
        arr[index] = arr[index] * 2;
        callback(arr[index]);
    };
    var getThen = function (index) {
        return then(function (cont) {
            cont(null, arr[index]);
        });
    };

    function printAll() { //直接使用回调
        index++;
        if (index > arr.length - 1) {
            return;
        } else {
            getItem(index, printAll)
        }
    }

    //printAll ();
    function printAll2(cont) { //直接使用回调
        index++;
        if (index > arr.length - 1) {
            cont();
        } else {
            getItem2(index, printAll2);
        }
    }




};
demo3();






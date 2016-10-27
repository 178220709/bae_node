/**
 * Created by jsons on 2016/2/24.
 */

'use strict';
/*jslint node: true */
var _ = require("lodash")
var log = console.log.bind(console)


function Decorator(options) {
    if (!options) {
        options = {};
    }
    this.before = options.before;
    this.after = options.after;
}

function sum() {
    return Array.prototype.reduce.call(arguments, function(sum, value) {
        return sum + value;
    }, 0);
}

function filter(min, max) {
    return Array.prototype.slice.call(arguments, 2).filter(function(value) {
        return value >= min && value <= max;
    });
}
function round(decimals) {
    if (arguments.length === 2) {
        return arguments[1].toFixed(decimals);
    } else {
        return Array.prototype.splice.call(arguments, 1).map(function(value) {
            return value.toFixed(decimals);
        });
    }
}
function filterNoNumbers() {
    return Array.prototype.filter.call(arguments, function(value) {
        return typeof value === 'number' && value === value && value !== Number.POSITIVE_INFINITY && value !== Number.NEGATIVE_INFINITY;
    });
}
Decorator.prototype.decorate = function decorate(fn) {

};


log(filter(1,5,3,1,24))





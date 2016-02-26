'use strict';
/*jslint node: true */

// 值得关注的点
var _ = require("lodash")
var log = console.log.bind(console)


let nums = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"]

var get1word = (num)=> nums[num]

Number.prototype.toword = function () {
    return nums[this]
}


var get2word = (num)=> {
    let d1 = Math.floor(num / 10), d2 = num % 10;


    if (num < 20) {
        return d1.toword() + "teen"
    } else if (num === 20) {
        return "twenty"
    } else if (20 < num && num < 30) {
        return "twenty-" + d2.toword()
    }
    else {
        return d1.toword() + "ty" + (d2 === 0 ? "" : d2.toword())
    }
}


function number2words(n) {
    // works for numbers between 0 and 999999


}

log(get2word(30))

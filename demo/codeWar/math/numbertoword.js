'use strict';
/*jslint node: true */

// 值得关注的点
var _ = require("lodash")
var log = console.log.bind(console)

// number2words(888888) should return "eight hundred eighty-eight thousand eight hundred eighty-eight"

var lnums = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
var hnums = ["twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"]
var get1word = (num)=> nums[num]

Number.prototype.toword = function () {
    return nums[this]
}

var get2word = (num)=> {
    if (num < 20) {
        return lnums[num]
    }
    else {
        let d1 = Math.floor(num / 10), d2 = num % 10;
        return hnums[d1 - 2] + (d2 === 0 ? "" : ("-" + lnums[d2]))
    }
}

var get3word = (num)=> {
    if (num < 100) {
        return get2word(num)
    }
    else {
        let d1 = Math.floor(num / 100), d2 = num % 100;
        return lnums[d1] + " hundred " + (d2 === 0 ? "" : get2word(d2))
    }
}

function number2words(n) {
    // works for numbers between 0 and 999999
    let str = "";

    if (n > 999) {
        let d1 = Math.floor(n / 1000), d2 = n % 1000;
        str = get3word(Math.floor(n / 1000)) + " thousand " + (d2 === 0 ? "" : get3word(d2))
    } else {
        str = get3word(n)
    }
    return str.trim()
}


log("(123)".replace(/\(|\)/g, ""))




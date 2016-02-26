'use strict';
/*jslint node: true */

// 值得关注的点
var _ = require("lodash")
var log = console.log.bind(console)


var getLoop = (base)=> {
    let result = base;
    let loop = 0;
    for (let i = 2; i <= 10; i++) {
        result = (result * base) % 10;
        if (result === base) {
            loop = i - 1;
            break;
        }
    }
    return loop
}
var getPow = (powStr, loop)=> {
    if (powStr == 0) return 0
    if (loop == 1) return 1

    let result = powStr
    while (result.length > 5) {
        let cut = +result.substr(0, 5) % loop
        result = (cut === 0 ? "" : cut.toString()) + result.substring(5, result.length)
    }
    return (+result) % loop + loop
}


//var lastDigit = function (str1, str2) {
//
//    let base = +str1.substr(-1, 1)
//    let loop = getLoop(base)
//    let pow = getPow(str2, loop)
//    return Math.pow(base, pow) % 10;
//}

var lastDigit = function (str1, str2) {
    let base = +str1.substr(-1, 1);
    let pow = (+str2 === 0 )? 0 : ((+str2.substr(-2, 2) % 4) || 4)
    return  Math.pow(base, pow) % 10
}

function trans(str){

    return String.fromCharCode(str)
}

log(trans("fd37"))

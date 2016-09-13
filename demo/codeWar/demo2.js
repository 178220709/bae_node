'use strict';
/*jslint node: true */

//

var _ = require("lodash")
var log = console.log.bind(console)

let getK = (n, m)=> {
    let k = 2, max = 20;
    while (Math.pow(m, k) !== n && k < max) {
        k++
    }
    return k === max ? 0 : k;
}

var isPP = function (n) {
    let m = 2;
    for (let i = 1; i < n; i++) {

    }


    var result = arr.filter(a=>n % a == 0).map(a=>[a, getK(n, a)]).filter(a=>a[1] !== 0)
    return result.length == 0 ? null : result[0]; // fix me
}

function isPP(n) {
    for (var m = 2; m * m <= n; ++m)
        for (var k = 2; Math.pow(m, k) <= n; ++k)
            if (Math.pow(m, k) == n) return [m, k];
    return null;
}

function groupByCommas(n) {
    let str = n + "";
    return str.split("").reduce((sum, x, i)=> sum + ((str.length - i) % 3 == 0 ? "," : "") + x)

}


function lowercaseCount(str) {
    //How many?
    let list = "abcdefghijklmnopqrstuvwxyz".split('')
    return str.split('').filter(c=> _.includes(list, c)).length
}


const dic = [
    {key: "year", value: 365 * 24 * 3600},
    {key: "day", value: 24 * 3600},
    {key: "hour", value: 3600},
    {key: "minute", value: 60},
    {key: "second", value: 1}
]

function formatDuration(seconds) {
    if (!seconds) return "now";
    let counter = []
    dic.forEach((item)=> {
        let res = {key: item.key, value: Math.floor(seconds / item.value)}
        counter.push(res)
        seconds = seconds - res.value * item.value
    })
    let counter2 = counter.filter((item)=>item.value > 0), resultLen = counter2.length;

    let result = counter2.reduce((result, item, i)=> result +
    `${item.value} ${item.value > 1 ? (item.key + "s") : item.key}${i == resultLen - 2 ? " and" : ","} `, "")
    return result.substr(0, result.length - 2)
}

var circleArea = function (radius) {
    if (!_.isNumber(radius) || radius <= 0) return false;
    return parseFloat((radius * radius * Math.PI).toFixed(2))
};

//Strip Comments
function solution(input, markers) {
    return input.split("\\").map(line=> {
        let index = Math.max.apply(null, markers.map(marker=> line.indexOf(marker)))
        return index < 0 ? line.trim() : line.substring(0, index).trim()
    }).join("\\")
}

var result = solution("apples, pears # and bananas\\grapes\\bananas !apples", ["#", "!"])

let apiPath = "login"
let path = "http://localhost:4072/path_config/?myhost=http://localhost:4070&mypath=/login&name=sm&password=_admin"
path = "http://localhost:4072/path_config/?myhost=http://localhost:4070&mypath=/login"


log(path.substr(path.lastIndexOf(apiPath)).replace(apiPath, ""))

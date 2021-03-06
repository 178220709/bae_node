'use strict';
/*jslint node: true */

//


var _ = require("lodash")
var log = console.log.bind(console)

function duplicateEncode(word) {
    // ...
    var arr = word.toLowerCase().split("")
    var map = {}
    arr.forEach(a=> {
        if (map.hasOwnProperty(a)) {
            map[a] += 1
        } else {
            map[a] = 1
        }
    })
    return arr.map(a=>map[a] == 1 ? "(" : ")").join("")
}

function count(word) {
    var arr = word.split("")
    var map = {}
    arr.forEach(a=> {
        if (map.hasOwnProperty(a)) {
            map[a] += 1
        } else {
            map[a] = 1
        }
    })
    return map;

}
function createPhoneNumber(numbers) {
    var s1 = numbers.slice(0, 3).join('')
    var s2 = numbers.slice(3, 6).join('')
    var s3 = numbers.slice(6, 10).join('')
    return `(${s1}) ${s2}-${s3}`
}


function once(fn) {
    var flag = true
    return function () {
        if (flag) {
            flag = false
            fn.apply(null, arguments)
        }
    }
}
function once(fn) {
    var call = true
    return function () {
        if (call) {
            call = false
            return fn.apply(this, arguments)
        }
    }
}

var checkFlag = (flag)=> {
    if (flag <= 3) return true;
    if (flag % 2 == 0) return false;
    if (flag % 2 == 1) return true;
}

function sometimes(fn) {
    var flag = 0
    return function () {
        flag += 1
        if (checkFlag(flag)) {
            return fn.apply(this, arguments)
        } else {
            return "hmm, I don't know!"
        }
    }
}


function spinWords(str) {
    return str.split(" ")
        .map(a=>a.trim())
        .map(a=>a.length < 5 ? a : a.split("").reverse().join(""))
        .join(" ")
}


var largestDifference = function (data) {
    let dist = 0;
    for (let i = 0; i < data.length - 1; i++) {
        for (let j = i + 1; j < data.length; j++) {
            if (data[i] <= data[j]) {
                dist = Math.max(dist, j - i)
            }
        }
    }
    return dist
};

//var fibonacci = function(n) {
//    if(n==0 || n == 1)
//        return n;
//    return fibonacci(n-1) + fibonacci(n-2);
//}

var fibonacci = function (n, acc1, acc2) {
    acc1 = acc1 || 1
    acc2 = acc2 || 1
    if (n <= 2)
        return acc2;
    return fibonacci(n - 1, acc2, acc1 + acc2);

}

const unit = ["m", "km", "Mm", "Gm", "Tm", "Pm", "Em", "Zm", "Ym"]
function meters(x) {
    let base = x, pow = 0;
    while (base >= 1000) {
        base = base / 1000
        pow++
    }
    return base + unit[pow]
}


let countp = 0
function permutations(string) {
    var arr = string.split(''), tmp = arr.slice(), heads = [], out = [];
    if (string.length == 1) return [string];
    arr.forEach(function (v, i, arr) {
        if (heads.indexOf(v) == -1) {
            heads.push(v);
            tmp.splice(tmp.indexOf(v), 1);
            permutations(tmp.join('')).forEach(function (w) {
                log(countp++)
                out.push(v + w);
            });
            tmp.push(v);
        }
    });
    return out;
}


let ms = [0, 6, 7, 5, 0, 8, 1, 0]
function shotm() {
    var N = parseInt(readline());
    for (var i = 0; i < N; i++) {
        var pi = parseInt(readline());
    }
}


let mutations = {
    ["what"] (){
        console.log("what is call")
    }
}


log([5, 3, 2, 1, 6].sort((a, b)=>a > b))

log(shotm('qqqq'))

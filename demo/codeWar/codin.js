'use strict';
/*jslint node: true */

var _ = require("lodash")
var log = console.log.bind(console)

function readline() {
    return Math.ceil(Math.random() * 35)
}


let ms = [0, 6, 7, 5, 0, 8, 1, 0]
function shotm() {
    var N = parseInt(readline());
    var off = 99999;
    var arr = []
    for (var i = 0; i < N; i++) {
        var pi = parseInt(readline());
        arr.push(pi)
    }

    arr.reduce((a, b)=> {
        off = Math.min(off, Math.abs(a - b))
        return b
    })
    print(off)

}

log([5, 3, 2, 1, 6].sort((a, b)=>a > b))

log(shotm('qqqq'))

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
    for (var m = 2; m * m <= n; ++ m)
        for (var k = 2; Math.pow(m, k) <= n; ++ k)
            if (Math.pow(m, k) == n) return [m, k];
    return null;
}


log(isPP(5))
log(isPP(8))
log(isPP(81))

'use strict';
/*jslint node: true */

// 值得关注的点, sort slice splice reduce ...(展开array)


var _ = require("lodash")
var log = console.log.bind(console)

//Return the number (count) of vowels in the given string.
function getCount(str) {
    const match = "aeiou".split("")
    return _.chain(str.split("")).filter(c=> _.includes(match, c)).value().length
    //  return (str.match(/[aeiou]/ig)||[]).length;
}

setInterval(function () {
    $(".zan-btn").click()
}, 1000)


function chain(input, fs) {
// implement the "chain" function
//    var value = input;
//    fs.forEach(fn=> value = fn(value))
//    return value;

    return fs.reduce((v, fn)=>fn(v), input)
}

function isTriangle(a, b, c) {
    var arr = [a, b, c].sort()
    return arr[0] + arr[1] > arr[2];
}


function removeSmallest(numbers) {
    let source = Array.from(numbers)
    let min = numbers.sort((a, b)=>a - b)[0]
    //[284,134,175,175,83,111].sort()
    let index = source.indexOf(min)
    source.splice(index, 1)
    return source

    //let indexOfMin = numbers.indexOf(Math.min(...numbers));
    //return [...numbers.slice(0, indexOfMin), ...numbers.slice(indexOfMin + 1)];
}


log(removeSmallest([395, 104, 288, 206, 108, 335, 382, 139, 387, 397, 273, 3, 258, 227]))



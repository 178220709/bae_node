var util = {
    name: "this is nameTest 1 "
}


let arr = [{k: 1}, {k: 2}, {k: 3}];

let what = arr.reduce(function (sum, obj) {
    return sum + obj.k;
}, 0);

console.log(what);

module.exports = util;






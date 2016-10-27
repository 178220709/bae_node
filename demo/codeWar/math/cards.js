/**
 * Created by jsons on 2016/10/26.
 */
'use strict';
//https://www.codewars.com/kata/522f421badceba9f8a0000a6/train/javascript
var _ = require("lodash")
var log = console.log.bind(console)

const cards = [[[1, 1, 1, 1], [1, 2, 1, 2], [1, 1, 2, 2]],
    [[2, 1, 1, 1], [2, 2, 1, 2], [2, 1, 2, 2]],
    [[3, 1, 1, 1], [3, 1, 1, 2], [3, 1, 3, 2]],
    [[2, 2, 2, 2], [1, 2, 2, 2], [1, 2, 2, 3]]];

let checkSET = function (card1, card2, card3) {


}
let size = Math.pow(2, 12)
let arr = [];
for (let i = 0; i < size; i++) {
    if (i.toString(2).replace(/0/g, "").length == 3) {
        arr.push(i)
    }
}


'use strict';
/*jslint node: true */

// 值得关注的点
var _ = require("lodash")
var log = console.log.bind(console)

let checkArr = _.range(1, 10)
Array.prototype.isCheck = function () {
    return this.length === 9 && checkArr.every(i=>this.indexOf(i) >= 0);
}

let getCol = function (matrix, index) {
    return matrix.map(arr=>arr[index])
}
let getArea = function (matrix, index) {
    let xoff = (index % 3) * 3
    let yoff = Math.floor(index / 3) * 3
    let arr = []
    _.range(xoff, xoff + 3).forEach(x=> {
        _.range(yoff, yoff + 3).forEach(y=> {
            arr.push(matrix[y][x])
        })
    })
    var glag = arr.isCheck()
    return arr
}

function validSolution(board) {
    return _.range(0, 9).every(index=> {
        try {
            return board[index].isCheck() && getCol(board, index).isCheck() && getArea(board, index).isCheck()
        } catch (e) {
            return false
        }
    })
}

var board = [[1, 2, 3, 4, 5, 6, 7, 8, 9],
    [2, 3, 1, 5, 6, 4, 8, 9, 7],
    [3, 1, 2, 6, 4, 5, 9, 7, 8],
    [4, 5, 6, 7, 8, 9, 1, 2, 3],
    [5, 6, 4, 8, 9, 7, 2, 3, 1],
    [6, 4, 5, 9, 7, 8, 3, 1, 2],
    [7, 8, 9, 1, 2, 3, 4, 5, 6],
    [8, 9, 7, 2, 3, 1, 5, 6, 4],
    [9, 7, 8, 3, 1, 2, 6, 4, 5]]


log(validSolution(board))






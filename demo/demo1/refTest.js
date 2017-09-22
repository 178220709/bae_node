'use strict';
/*jslint node: true */

var _ = require("lodash")

var log = console.log.bind(console)

let fun = _.debounce(() => {
    console.log("123")
}, 90);

for (let i = 0; i < 10; i++) {
    setTimeout(() => {
        fun()
    }, _.random(10, 1000))
}
setTimeout(() => {
    fun()
}, 2000)




'use strict';
/*jslint node: true */

var _ = require("lodash")

const match = "aeiou".split("")

const str = "sadfaeroiqpoweraslckl".split("")

var count =_.chain(str).filter( c=> _.includes(match,c)).value().length

console.log(count)

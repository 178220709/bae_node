'use strict';
/*jslint node: true */

var fs = require('fs');
let log = console.log.bind(console)
let Then = require('thenjs')

Then(cont=>{
    fs.readdir("d:",cont)
}).then((cont,paths)=>{
    log(paths)
})


fs.readdir("d:",(err,paths,p3,p4)=>{
    log(paths)
})

var cache = {'d:/temp.xml':'/private/etc'};
fs.realpath('d:/temp.xml', cache, function (err, resolvedPath) {
    if (err) throw err;
    console.log(resolvedPath);
});

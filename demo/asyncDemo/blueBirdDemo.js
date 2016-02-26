'use strict';
/*jslint node: true */



var Promise = require('bluebird')


var http = Promise.promisifyAll(require('http'));
var url = "https://www.baidu.com/"

http.getAsync(url)
    .then(a=>console.log(a))
    .catch(a=> console.log(a))

/*
help.getUrlThen = function (url) {
    // Utility function that downloads a URL and invokes
    // callback with the data.
    return then(function (cont) {
        http.get(url, function (res) {
            var data = "";
            res.on('data', function (chunk) {
                data += chunk;
            });
            res.on("end", function () {
                cont(null, data);
            });
        }).on("error", cont);
    });
};
*/


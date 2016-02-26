/**
 * Created by jsons on 2016/2/24.
 */

'use strict';
/*jslint node: true */
var _ = require("lodash")
var log = console.log.bind(console)



function ascii(str){
    return str.replace(/[^\u0000-\u00FF]/g,function($0){return escape($0).replace(/(%u)(\w{4})/gi,"\&#x$2;")});
}
function unicode(str){
    return str.replace(/[^\u0000-\u00FF]/g,function($0){return escape($0).replace(/(%u)(\w{4})/gi,"\\u$2")});
}
function reconvert(str){
    str = str.replace(/(\\u)(\w{4})/gi,function($0){
        return (String.fromCharCode(parseInt((escape($0).replace(/(%5Cu)(\w{4})/g,"$2")),16)));
    });

    str = str.replace(/(&#x)(\w{4});/gi,function($0){
        return String.fromCharCode(parseInt(escape($0).replace(/(%26%23x)(\w{4})(%3B)/g,"$2"),16));
    });
    return str;
}

String.prototype.reconvert = function(){
    return  reconvert (this);
}
log(str.split('\n').map(line=>  line.split(" ").map(b=>"\\u"+b).join("  ").reconvert()))


var line = "fd37 7a58 5a00 0004 e6d6 b446 0200 2101"
var line1 = "hello world "






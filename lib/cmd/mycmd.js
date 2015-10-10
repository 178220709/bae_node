/*jslint node: true */
'use strict';
/*global , require, process, module*/

exports.ss_restart = function (){process.exec('  /etc/init.d/shadowsocks restart    ',
    function (error, stdout, stderr) {
        if (error !== null) {
            console.log('exec error: ' + error);
        }
    });
};
//调用执行文件
exports.openApp = function(){
    process.execFile('D:/testweb/aaa.bat',null,{cwd:'D:/'},
        function (error,stdout,stderr) {
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        });
};
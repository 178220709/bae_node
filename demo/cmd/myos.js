#!/usr/bin/env node
'use strict';
/*global , require, process, module*/

var program = require('commander');

var cp = require('child_process');


var ss_restart = function () {
    cp.exec('  /etc/init.d/shadowsocks restart    ',
        function (error, stdout, stderr) {
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        });
};


var git_pull = function () {
    cp.exec(' cd /work/bae_node; git pull;npm update   ',
        function (error, stdout, stderr) {
            if (error !== null) {
                console.log('exec error: ' + error);
                console.log('exec stderr: ' + stderr);
            } else {
                console.log('exec stdout: ' + stdout);
            }
        });
};
program
    .version('0.0.1')
    .usage('[options] <keywords>')
    .option('-o, --owner [name]', 'Filter by the repositories owner')
    .option('-l, --language [language]', 'Filter by the repositories language')
    .option('-f, --full', 'Full output without any styling')
    .parse(process.argv);

if (!program.args.length) {
    program.help();
} else {
    var keywords = program.args;
    var url = 'https://api.github.com/search/repositories?sort=stars&order=desc&q=' + keywords;

    if (program.owner) {
        url = url + '+user:' + program.owner;
    }

    if (program.language) {
        url = url + '+language:' + program.language;
    }

    var key = keywords[0];
    switch (key) {
        case "ss_restart":
            ss_restart();
            break;
        case "git_pull":
            git_pull();
            break;
    }
}
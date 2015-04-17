var demo1 = require('..\\demo1\\moduleTest1.js');
var demo2 = require('..\\demo2\\moduleTest2.js');

var name1 = require('..\\demo1\\nameTest.js');
var name2 = require('..\\demo2\\nameTest.js');

var main = {
    RequireTest: function () {
        console.log("demo1 is " + demo1.name + "\n demo2 is" + demo2.name);
    },
    NameTest: function () {
        console.log("demo1 is " + name1.name + "\n demo2 is" + name2.name);
    },
    RefTest: function () {
        var ref1 = require('..\\demo1\\refTest.js');
        var ref2 = require('.././refTest.js');
    }
}

//main.RequireTest();
//main.NameTest();
main.RefTest();

module.exports = main;



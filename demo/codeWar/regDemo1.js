'use strict';
/*jslint node: true */

// myParseInt /@\(\d{3}\)\s\d{3}\-\d{4}$/


var _ = require("lodash")
var log = console.log.bind(console)
function isTotal3() {
    var simpleVariable = 1;
    var variableInFunction
    for (var index = 0; index < 1; index++)
         var variableInLoop = 1;

    (function defineAVariable() {
        variableInFunction = 1;
    })();

    var result = simpleVariable + variableInLoop + variableInFunction;

    return result;
}

/*
 *              1
 3     5
 7     9    11
 13    15    17    19
 21    23    25    27    29
 * */
function rowSumOddNumbers(n) {
    // let left =  n*(n-1) +1;
    // let sum = n*(n+left-1)
    return Math.pow(n, 3)
}

function myParseInt(str) {
    return str.match(/\d+|\w+/g).length == 1 ? parseInt(str) : NaN;
}

function insertDash(num) {
    const odds = [1, 3, 5, 7, 9]
    var source = num.toString().split('').map(a=>+a)
    var len = source.length

    for (var i = 0; i < len - 1; i++) {
        var t1 = source[i], t2 = source[i + 1]
        if ([t1, t2].every(a=>odds.indexOf(a) >= 0)) {
            source.splice(i + 1, 0, '-')
            i++
            len++
        }
    }
    return source.join('')
}

function copyList(l) {
    return Array.from(l)
}
function XO(str) {
    return ( str.match(/x/ig) || []).length == ( str.match(/o/ig) || [] ).length
}

function isPhone(str) {
    let reg = /@\(\d{3}\)\s\d{3}\-\d{4}$/
}

function duplicateEncode(word){
    // ...
}

function warp(word,key) {
    let str = "msjkeylslkey"
    var reg = new RegExp(key, "gi");
    return str.replace(reg, (val, index)=> "<span>" + val + "</span>")

    // ...
}

function Automaton()
{
    this.states = [];
    this.state = "q1"
}

Automaton.prototype.readCommands = function(commands)
{
    // Return true if we end in our accept state, false otherwise.
    commands.forEach(command=>this.dealOneCommand(command));
    return this.state==="q2"
};
Automaton.prototype.dealOneCommand = function(command)
{
   switch (this.state){
       case "q1": if (command==1) this.state="q2" ;
           break;
       case "q2" : if (command==0) this.state="q3" ;
           break;
       case "q3" : this.state="q2" ;
           break;
   }
};
var myAutomaton = new Automaton();

log(myAutomaton.readCommands(["1"]));
log(myAutomaton.readCommands(["1", "0", "0", "1"]));

// Do anything necessaryto set up your automaton's states, q1, q2, and q3.


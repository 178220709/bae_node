'use strict';
/*jslint node: true */

var CheckRuleRepeat = function (rule1, rule2) {
  var flag = true;
  for (var i = 0; i < 4; i++) {
    flag = flag && rule1[i] === rule2[i];
  }
  return flag;
};


var test1 = CheckRuleRepeat(["1","","3",""],["1","2","",""]);


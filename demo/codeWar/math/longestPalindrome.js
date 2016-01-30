'use strict';

/**
 * Created by jsons on 2016/1/28.
 */

var _ = require("lodash")
var log = console.log.bind(console)


var longestPalindrome = function (s) {
    if (!s) return 0;

    let reverse = s.split("").reverse().join('')
    let max = 1;
    for (let take = 2; take <= s.length; take++) {
        for (let cursor = 0; cursor + take <= s.length; cursor++) {
            let temp = s.substr(cursor, take)
            let cur2 = s.length - cursor - take
            let temp2 = reverse.substr(cur2, take)
            if (temp === temp2) {
                max = Math.max(max, take)
            }
        }
    }
    return max
}


log(longestPalindrome("zyabyz"))
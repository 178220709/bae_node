/**
 * Utility class for Harshad numbers (also called Niven numbers).
 *
 * @namespace Harshad
 */
var Harshad = ( function () {
    'use strict';

    var bitSum = (number)=> number.toString().split('').map(a=>+a).reduce((sum, v)=>sum + v, 0)


    return {
        /**
         * Returns true when the given number is a valid Harshad number.
         *
         * @param {Number} number The given number
         * @returns {Boolean}
         * @function Harshad.isValid
         */
        isValid: function (number) {
            // Your implementation goes here
            return number % bitSum(number) === 0
        },
        /**
         * Gets the next Harshad number after the given number.
         *
         * @param {Number} number The given number
         * @returns {Number}
         * @function Harshad.getNext
         */
        getNext: function (number) {
            // Your implementation goes here
            do {
                number++
            } while (!this.isValid(number))

            return number
        },
        /**
         * Returns the suite of Harshad numbers, starting after a given number.
         *
         * @param {Number} count The number of elements to return
         * @param {Number} start The number after which the serie should start;
         *  defaults to 0
         * @returns {Array}
         * @function Harshad.getSerie
         */
        getSerie: function (count, start) {
            // Your implementation goes here
            let nums = [];
            let cursor = start || 0

            while (nums.length < count) {
                cursor = this.getNext(cursor)
                nums.push(cursor)
            }
            return nums
        }
    };

}() );

console.log(Harshad.getSerie(10, 1000))

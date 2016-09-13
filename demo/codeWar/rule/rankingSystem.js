'use strict';
/*jslint node: true */
var _ = require("lodash")
var log = console.log.bind(console)


class User {
    constructor() {
        this.rank = -8;
        this.progress = 0;
    }

    _getRise(rank) {
        if (this.rank === 8) return 0;
        if (this.rank > rank && User.diffNoZero(this.rank, rank) >= 2) return 0;
        if (this.rank > rank && User.diffNoZero(this.rank, rank) == 1) return 1;
        if (this.rank === rank) return 3;
        let d = User.diffNoZero(this.rank, rank)
        return 10 * d * d
    }

    _earned(progress) {
        this.progress += progress
        while (this.progress >= 100) {
            this.rank = User.addNoZero(this.rank, 1);
            this.progress -= 100;
        }
        if (this.rank >= 8) {
            this.rank = 8;
            this.progress = 0;
        }
    }

    incProgress(rank) {
        if (rank < -8 || rank == 0 || rank > 8) {
            throw new Error("invalid rank")
        }
        console.log(this.rank + "=>" + this.progress)
        let rise = this._getRise(rank);
        this._earned(rise)
    }
}
User.addNoZero = (a, b)=> {
    if (a > 0) return a + b;
    if (a < 0) {
        let sum = a + b;
        return sum < 0 ? sum : sum + 1
    }
}
User.diffNoZero = (a, b)=> {
    if (a * b > 0) return Math.abs(a - b);
    return Math.max(a, b) - Math.min(a, b) - 1
}

var user = new User()
log(user.rank) // => -8
user.progress // => 0
user.incProgress(-7)
user.progress // => 10
user.incProgress(-5) // will add 90 progress
user.progress  // progress is now zero
user.rank // rank was upgraded to -7

log(typeof circleArea(43.2673))

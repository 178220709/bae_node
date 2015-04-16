//https://github.com/kriskowal/q
var Q = require("q");

"use strict";


Q.fcall(function () {
     return delay(1, 2000);
})
    .then(function (arg) {
        console.log(arg);
        return delay(2, 2000);
    })
    .then(function (arg) {
        console.log(arg);
        return Q.delay(3, 2000);
    })
    .then(function (arg) {
        console.log(arg);
        return Q.delay(4, 2000);
    })
    .then(function (value4) {
        console.log(value4);
        // Do something with value4
    })
    .catch(function (error) {
        // Handle any error from all above steps
        console.log(error);
    })
    .done();
delay(1,2000)
.then(function (arg) {
    console.log(arg);
    return delay(2, 2000);
})
    .then(function (arg) {
        console.log(arg);

        return Q.delay(3, 2000);
    })
    .then(function (arg) {
        console.log(arg);
        return Q.delay(4, 2000);
    })
    .then(function (value4) {
        console.log(value4);
        // Do something with value4
    })
    .catch(function (error) {
        // Handle any error from all above steps
        console.log(error);
    })
    .done();

function delay(value,timeout){
    var deferred = Q.defer();
    setTimeout(function () {
        deferred.resolve(value);
    }, timeout);
    return deferred.promise;
}
function timeout(promise, ms) {
    var deferred = Q.defer();
    Q.when(promise, deferred.resolve);
    delay(ms).then(function () {
        deferred.reject(new Error("Timed out"));
    });
    return deferred.promise;
}
timeout.then(function(){

},function(){

});

//function eventually(value) {
//    return Q.delay(value, 2000);
//}
//
//Q.all([1, 2, 3].map(eventually))
//    .done(function (result) {
//        console.log(result);
//    });
//
//Q.all([
//    eventually(10),
//    eventually(20)
//])
//    .spread(function (x, y) {
//        console.log(x, y);
//    })
//    .done();
const g = {};
let flag = true;

function doWait1() {
    return new Promise((resolve, reject) => {
        g.resolve = resolve;
        g.reject = reject;
        //注意：没有任何其他代码，更没有resolve或者reject

    });
}

function doWait2(data) {
    return new Promise((resolve, reject) => {
        //timer取多少合适?
        setTimeout(() => {
            resolve(data);
        }, 100);
    }).then((d) => {
        if (d) {
            //继续等待
            console.info('waiting');
            return doWait2(flag);
        } else {
            //等待结束
            console.info('finished');
            return true;
        }
    });
}

console.log(1)
console.log(g.resolve)
doWait1().then(res => {
    console.log(2)
    console.log(g.resolve)
    console.log("over ")
})
console.log(3)
console.log(g.resolve)
g.resolve(222)
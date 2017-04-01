let asyncTask = (s) => {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            console.log("resolve:" + (s + 1))
            resolve(s + 1)
        }, s * 1000)
    })
}

asyncTask(1).then(async s => {
    let result = await asyncTask(s)
    return new Promise((resolve) => resolve(result))
}).then(res => console.log("result:" + res))
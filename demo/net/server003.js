'use strict';
/*jslint node: true */



// 在前者的基础上，实现 Client --> Sever 的通讯，如此一来便是双向通讯
var net = require('net');
var chatServer = net.createServer(),
    clientList = [];
chatServer.on('connection', function(client) {
    // JS 可以为对象自由添加属性。这里我们添加一个 name 的自定义属性，用于表示哪个客户端（客户端的地址+端口为依据）
    client.name = client.remoteAddress + ':' + client.remotePort;
    client.write('Hi ' + client.name + '!\n');
    clientList.push(client);
    client.on('data', function(data) {
        broadcast(data, client);// 接受来自客户端的信息
    });
    client.on('end', function() {
        clientList.splice(clientList.indexOf(client), 1); // 删除数组中的制定元素。
    })
});
function broadcast(message, client) {
    var cleanup = []
    for (let c of  clientList  ){
        if(client === c) continue;

        if(c.writable) { // 先检查 sockets 是否可写
            c.write(c.name + " says " + message)
        } else {
            cleanup.push(c) // 如果不可写，收集起来销毁。销毁之前要 Socket.destroy() 用 API 的方法销毁。
            c.destroy()
        }
    }
    //Remove dead Nodes out of write loop to avoid trashing loop index
    for(let c of  cleanup ) {
        clientList.splice(clientList.indexOf(c), 1)
    }
}

function broadcast2(message, client) {
    var cleanup = []
    for(var i=0;i<clientList.length;i+=1) {
        if(client !== clientList[i]) {
            if(clientList[i].writable) { // 先检查 sockets 是否可写
                clientList[i].write(client.name + " says " + message)
            } else {
                cleanup.push(clientList[i]) // 如果不可写，收集起来销毁。销毁之前要 Socket.destroy() 用 API 的方法销毁。
                clientList[i].destroy()
            }
        }
    }  //Remove dead Nodes out of write loop to avoid trashing loop index
    for(i=0;i<cleanup.length;i+=1) {
        clientList.splice(clientList.indexOf(cleanup[i]), 1)
    }
}


chatServer.listen(9000);
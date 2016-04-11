//http://www.jb51.net/article/59801.htm

var net = require('net');
var server = net.createServer(function (c) { // Connection监听器
    console.log("服务器已连接");
    c.on("end", function () {
        console.log("服务器已断开");
    });
    c.write("Hello,Bigbear !\r\n");
    //c.pipe(c);
});

server.listen(8124, function () { // Listening监听器
    console.log("服务器已绑定");
});




var client = net.connect({
    port: 8124
}, function () { // connect监听器
    console.log("客户端已连接");
    client.write('Hello,Baby !\r\n');
});
client.on("data", function (data) {
    console.log("data=>"+data.toString());
    client.end();
});
client.on("end", function () {
    console.log("客户端断开连接");
});

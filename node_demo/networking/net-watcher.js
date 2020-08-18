'use strict'
const fs = require('fs');
const net = require('net'); //由 net 模块提供绑定端口和建立连接的能力
const filename = process.argv[2];

if(!filename){
    throw Error(`Error: No filename specified.`);
}

/*
net.createServer 方法接收一个回调函数作为参数，返回 Server 对象。连
接建立成功后， Node.js 会执行回调函数，并传递 Socket 对象给 connection参
数，可以用这个对象接收和发送数据
*/
net.createServer(connection =>{
    //建立连接时打印通知 （通过 connection.write 发送给客户端，也通过console.log 发给控制台）
    console.log('Subscriber connected.');
    connection.write(`Now watching  "${filename}" for changes...\n`);

    //开始监昕目标文件内容发生变化，并把 watcher 对象保存在内存中，通过connection.write 将变化的文件内容发送给客户端
    const watcher = fs.watch(filename,()=>{
        connection.write(`File changed:${new Date()}\n`);
    });

    //监听connection的close 事件 在控制台打印通知，并用 watcher.close停止监听文件
    connection.on('close',() => {
        console.log('Subscriber disconnected.');
        watcher.close();
    });
}).listen(60300,() => {
    console.log('Listening for subscriber...');
});

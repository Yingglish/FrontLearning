//使用 require 指令来载入 http 模块，并将实例化的 HTTP 赋值给变量 http
var http = require('http');

//使用 http.createServer() 方法创建服务器，并使用 listen 方法绑定 8888 端口。 函数通过 request, response 参数来接收和响应数据
http.createServer(function (request, response) {

    // 发送 HTTP 头部 
    // HTTP 状态值: 200 : OK
    // 内容类型: text/plain 设置编码类型
    //response.setHeader('Content-Type','text/plain;charset=utf-8');
    response.writeHead(200,{"Content-Type": "text/plain;charset=utf-8"})
    response.write("1-- 许Hello World\n");
    // 发送响应数据 "Hello World"
    response.end('2-- Hello World\n');
}).listen(8888);

// 终端打印如下信息
console.log('Server running at http://localhost:8888/');

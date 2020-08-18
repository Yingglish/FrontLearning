/**
 * @description 显示图片
 */

 const http = require('http'); //HTTP服务器与客户端模块
 const path = require('path'); //该模块提供用于处理文件与目录的路径的工具函数
 const url = require('url'); //用于URL处理和解析
 const fs = require('fs');

 const server = http.createServer((req,res)=>{
     let pathName = url.parse(req.url).pathname // 通过url获取路径path
     let extName = path.extname(pathName); //通过路径获取扩展名

     if(pathName == '/'){  //访问根路径,读取模板文件index.html,并返回响应
         res.writeHead(200,{'Content-type':'text/html'});
         res.end(fs.readFileSync(path.join(__dirname,pathName,'index.html')));
     }else if(extName == '.jpg' || extName == '.png'){
        res.writeHead(200,{'Content-Type':'image/' + extName.substr(1)});
        res.end(fs.readFileSync(path.join(_dirname,pathname)));
     }else{
         res.statusCode=404;
         res.end();
     }
 })

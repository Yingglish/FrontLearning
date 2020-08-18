'use strict'
const fs = require('fs');
const spawn = require("child_process").spawn;
const filename = process.argv[2]; 

if(!filename){
    throw Error('A file to watch must be specified!');
}
fs.watch(filename,()=>{
    const ls = spawn('ls',['-l','-h',filename]); //spawn()的第一个参数参数是需要执行命令的名称,后面为参数数组，包括 ls 命令本身的参数和目标文件名
    ls.stdout.pipe(process.stdout); //使用 pipe()方法把子进程的输出内容直接传送到标准输出流
});
console.log(`Now watching ${filename} for changes...`);


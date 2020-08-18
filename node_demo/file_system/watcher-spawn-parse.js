/**
 * @description 在监听到文件变化后创建一个子进程 再用这个子进程执行系统命令(在此为执行 ls 命令)
 */
'use strict'
const fs = require('fs');
const spawn = require("child_process").spawn;
const filename = process.argv[2]; 

if(!filename){
    throw Error('A file to watch must be specified!');
}
fs.watch(filename,()=>{
    const ls = spawn('ls',['-l','-h',filename]); 
    let output = '';
    
    ls.stdout.on('data',chunk => output += chunk); //监听data事件

    ls.on('close',() =>{ //当子进程退出时，会触发 close 事件
        const parts = output.split(/\s+/); //将数据按空白符切割
        console.log([parts[0],parts[4],parts[8]]);
    })
});
console.log(`Now watching ${filename} for changes...`);


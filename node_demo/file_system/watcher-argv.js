// argv-- argument vector,
const fs = require('fs');
const filename = process.argv[2]; // 通过process.argv 访问命令行输入的参数 node watcher-argv.js target.txt,argv为一个数组类型
if(!filename){
    throw Error('A file to watch must be specified!');
}
fs.watch(filename,()=>{
    console.log(`File ${filename} changed!`);
});
console.log(`Now watching ${filename} for changes...`);
console.log(process.argv)

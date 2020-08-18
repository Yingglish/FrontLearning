'use strict'
const fs = require('fs');
fs.readFile('target.txt',(err,data)=>{ //data为一个Buffer对象
    if(err){
        throw err;
    }
    console.log(data.toString());
});
// readFile() 执行成功，则err的值为 null 。如果 readFile()执行失败,会是一个Error对象
//

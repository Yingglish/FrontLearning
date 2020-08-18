"use strict";
require("fs")
  .createReadStream(process.argv[2])
  .on("data", chunk => process.stdout.write(chunk)) //监听文件流的 data 事件
  .on("error", err => process.stderr.write(`ERROR: ${err.message}\n`));

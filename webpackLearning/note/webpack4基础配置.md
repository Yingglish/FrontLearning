# webpack4基础配置
```bash
mkdir webpack-demo && cd webpack-demo
npm init -y
npm i webpack --save-dev # --save-dev 作为开发依赖安装
npm i webpack-cli --save-dev
# 也可 npm install webpack webpack-cli --save-dev
```
> webpack-cli -- 此工具用于在命令行中运行 webpack

创建以下目录结构、文件和内容(+ 表示新增)

protect
```
  webpack-demo
  |- package.json
+ |- index.html
+ |- /src
+   |- index.js
```

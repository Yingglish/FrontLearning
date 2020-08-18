var path = require("path");
// path.resolve方法用于将相对路径转为绝对路径
console.log(path.resolve(__dirname, "./dist")); // output d:\webpage\webpackLearning\dist
console.log(path.resolve(__dirname, "dist"));
console.log(path.resolve('/foo/bar', '/tmp/file/'));// 返回: '/tmp/file'
path.resolve('/foo/bar', './baz'); // '/foo/bar/baz'

// path.parse()方法可以返回路径各部分的信息
var myFilePath = '/someDir/someFile.json';
path.parse(myFilePath).base
// "someFile.json"
path.parse(myFilePath).name
// "someFile"
path.parse(myFilePath).ext
// ".json"

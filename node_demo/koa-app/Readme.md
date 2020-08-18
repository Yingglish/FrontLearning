# Koa实战
## 项目初始化
D:\webpage\node\koa-app下
```bash
npm init --yes
# 安装koa模块 --save 作为开发依赖
npm install koa koa-router --save
```
项目目录
```tiki wiki
|-index.js      入口文件
|-config
|   |-keys.js       数据库地址和token密钥
|   |-passport.js
|-models
|   |-User.js       用户模型
|-routes
|   |-api
|       |-user.js   用户登录、注册接口
|-validation
|   |-is-empty.js
|   |-register.js       注册时输入判断
```
项目使用的数据库为`https://cloud.mongodb.com`上的在线数据库，使用Mongoose连接
## Mongoose的使用
Mongose就是一套操作MongoDB数据库的接口.

### Schema
一种以文件形式存储的数据库模型骨架，无法直接通往数据库端，也就是说它不具备对数据库的操作能力.可以说是数据属性模型(传统意义的表结构)，又或着是”集合”的模型骨架

```js
// User.js
const mongoose = require("mongoose");
const scheam = require("mongoose").Schema;

/* 定义一个 Schema */
const UserScheam = new scheam({
  name: { //属性name,类型为String
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  ...
});
```

### Model
由Schema构造生成的模型，除了Schema定义的数据库骨架以外，还具有数据库操作的行为，类似于管理数据库属性、行为的类
```js
// User.js
...
module.exports = User = mongoose.model("users", UserScheam);
```
### Entity
由Model创建的实体，使用save方法保存数据，Model和Entity都有能影响数据库的操作，但Model比Entity更具操作性
```js
//实例化一个User模型
const newUser = new User({
  name: ctx.request.body.name,
  ...
});
newUser.save() // 存到数据库
```

## passport验证token

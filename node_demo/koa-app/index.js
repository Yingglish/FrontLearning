const koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser"); //获取前台数据
//const MongoClient = require("mongodb").MongoClient;
const mongoose = require('mongoose');
const passport = require('koa-passport'); //用于token验证



//实例化koa
const app = new koa();
//实例化router
const router = new Router();

app.use(bodyParser());

app.use(passport.initialize())
app.use(passport.session())

// 将passport模块回调的到passport.js  
require('./config/passport')(passport) // passort为上面require的

//引入user.js
const user = require('./routes/api/user');

//路由
router.get("/",async ctx =>{
    ctx.body = {msg : "hello koa"}
})

//连接数据库
const uri=require('./config/keys').mongoURI;
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect().then(()=>{
//     console.log("连接成功")
// }).catch(err=>{
//     console.log("连接失败\n");
//     console.log(err);
// });

mongoose.connect(uri, {useNewUrlParser: true}).then(()=>{
    console.log("连接成功");
}).catch(err =>{
    console.log("连接失败\n");
    console,log(err);
})

// 配置路由地址 localhost:5000/api/user/test
router.use('/api/user',user);


app.use(router.routes()) /*启动路由*/
   .use(router.allowedMethods());

const port = process.env.PORT || 5000; //端口号

//监听当前端口号 
app.listen(port,()=>{
    console.log(`server started on ${port}`)
})

const Router = require("koa-router");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken"); //用于生成token
const keys = require("../../config/keys");
const passport = require("koa-passport");

const router = new Router(); // 实例化router对象

//引入验证
const validateRegisterInput = require('../../validation/register');

// 引入User
const User = require("../../models/User");

/**
 * @route GET api/user/test
 * @description 测试接口地址
 * @access 接口是公开的
 */

//ctx  上下文 Context对象，包含了request 和response等信息
// Koa应用程序中的每个请求都将创建一个Context,并在中间件作为参数被引用
router.get("/test", async ctx => {
  ctx.status = 200; //请求成功
  ctx.body = { msg: "hello..." }; //response
});

/**
 * 注册时需获得前台数据  , 需安装body-parser 使用后可直接获得post方式请求数据 json形式
 * @route POST api/user/register
 * @description 注册接口
 * @access
 */
router.post("/register", async ctx => {
 // console.log(ctx.request.body); 

 const {errors , isValid} = validateRegisterInput(ctx.request.body);

 //判断是否验证通过
 if(!isValid){
   ctx.status =400;
   ctx.body = errors
   return;
 }

  //存储用户信息到数据库
  const findResult = await User.find({ email: ctx.request.body.email }); //查询此邮箱是否注册
  if (findResult.length !== 0) {
    ctx.status = 500;
    ctx.body = { error: "邮箱已被注册!" };
  } else {
    
    const avatar = gravatar.url(ctx.request.body.email, {
      s: "200",
      r: "pg",
      d: "mm"
    });
    //实例化一个User模型
    const newUser = new User({
      name: ctx.request.body.name,
      email: ctx.request.body.email,
      password: ctx.request.body.password, //加密 可使用bcryptjs
      avatar: avatar
    });
    //console.log(newUser);

    // 存储 并返回数据
    await newUser
      .save()
      .then(user => {
        ctx.body = user;
      })
      .catch(err => {
        console.log(err);
      });
  }
});

/**
 * @route POST api/user/login
 * @description 登录接口 用户存在且登录成功返回一个token
 * @access
 */
router.post("/login", async ctx => {
  //查询用户是否存在
  const findResult = await User.find({ email: ctx.request.body.email });
  if (findResult.length === 0) {
    ctx.status = 404;
    ctx.body = { error: "用户不存在" };
  } else {
    // 用户存在 验证密码
    if (ctx.request.body.password === findResult[0].password) {
      //验证通过
      // 返回token
      const jwt_payload = { id: findResult[0].id, name: findResult[0].name };
      const token = jwt.sign(jwt_payload, keys.secretOrKey, {
        expiresIn: 3600
      }); //1小时过期

      ctx.status = 200;
      ctx.body = { success: true, token: "Bearer " + token };
    } else {
      ctx.staus = 400;
      ctx.body = { error: "密码错误" };
    }
  }
});

/**
 * @route GET api/user/current
 * @description用户信息接口 返回用户信息
 * @access 接口是私密的
 */

// 监听
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }), //此处可添加中间件进行其他操作
  async ctx => {
    // ctx.body = ctx.state.user;
    ctx.body = {
      id: ctx.state.user.id,
      name: ctx.state.user.name,
      //avatar: ctx.state.user.avatar,
      email: ctx.state.user.email
    };
  }
);

module.exports = router.routes(); // 使路由生效

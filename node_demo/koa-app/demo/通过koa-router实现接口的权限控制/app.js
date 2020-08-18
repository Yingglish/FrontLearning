const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const { sign } = require("jsonwebtoken"); //从JWT中获取sign方法
const { secret } = require("./config"); //引入密匙
const jwt = require("koa-jwt")({ secret }); //根据密匙构建一个  路由权限控制
const app = new Koa();
const router = new Router();
const admin = require("./admin")();
app.use(bodyParser());

router
  .post("/api/login", async (ctx, next) => {
    const user = ctx.request.body; //从body中获取用户输入信息
    if (user && user.username) {
      let { username } = user; //取出username
      const token = sign({ username }, secret, { expiresIn: "1h" }); //生成Token,secret作为密钥需要开发者设置，expiresln为失效时间，不要设置太久

      ctx.body = {
        message: "Get Token Success",
        code: 1,
        token:"Bearer " + token, //一定加Bearer
      };
    } else {
      ctx.body = {
        message: "Param Error",
        code: -1
      };
    }
  })
  .get("/api/userInfo", jwt, async ctx => {
    //获取用户信息,需要校验
    ctx.body = {
      username: ctx.state.user.username
    };
  })
  .get("/api/adminInfo", jwt, admin, async ctx => {
    //管理员接口,检查是否为管理员
    let token = ctx.header.authorization;
    ctx.body = {
      token,
      username: ctx.state.user.username
    };
  });

app.use(router.routes()).use(router.allowedMethods());
app.listen(3000, () => {
  console.log("app listening 3000...");
});

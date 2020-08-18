/**
 * @description koa-router 路由中间件
 */

const Koa = require("koa");
const router = require("koa-router")(); // 注意 require('koa-router') 返回的是函数:

const app = new Koa();
// //不借助中间件
// app.use(async (ctx, next) => {
//     if (ctx.request.path === '/') {
//         ctx.response.body = '<h1>index page</h1>';
//     } else {
//         await next();
//     }
// });
// app.use(async (ctx, next) => {
//     if (ctx.request.path === '/home') {
//         ctx.response.body = '<h1>home page</h1>';
//     } else {
//         await next();
//     }
// });
// app.use(async (ctx, next) => {
//     if (ctx.request.path === '/404') {
//         ctx.response.body = '<h1>404 Not Found</h1>';
//     } else {
//         await next();
//     }
// });

// 添加路由
router.get("/", async (ctx, next) => {
  ctx.response.body = `<h1>index page</h1>`;
  await next();
});

router.get("/home", async (ctx, next) => { //访问 http://localhost:3000/home?id=12&name=name
  ctx.response.body = "<h1>HOME page</h1>";
  console.log(ctx.request.query); //{ id: '12', name: 'name' }
  console.log(ctx.request.querystring); //  id=12&name=name
});

router.get("/404", async (ctx, next) => {
  ctx.response.body = "<h1>404 Not Found</h1>";
});

/**
 * 如果把get方法中的await next()去掉，那么就不会命中all方法的路由规则，也不会执行all方法的回调函数
 * 因为说到底，对路由的处理也是一种中间件，如果不执行await next()把控制权交给下一个中间件，那么后面的路由就不会再执行
 */
router.all("/", async (ctx, next) => {
  console.log('match "all" method');
  await next();
});

router.get("/home/:id/:name", async (ctx, next) => { //访问http://localhost:3000/home/12/name  koa-router 会把请求参数解析在 params 对象上
  console.log(ctx.params); //{ id: '12', name: 'name' }
  ctx.response.body = "<h1>HOME page /:id/:name</h1>";
});

// 调用路由中间件
app.use(router.routes());
app.listen(3000, () => {
  console.log("server is running at http://localhost:3000");
});

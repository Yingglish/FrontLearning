/**
 * @description 使用中间件获取晌应时间
 */

 const koa = require('koa');
 const app = new koa();

 app.use(async (ctx , next) => {
     let stime = new Date().getTime();  //记录当前时间戳
     //next()之前使用await关键字是因为next()会返回一个Promise对象，而在当前中间件中位next()之后的代码会暂停执行，直到最后一个中间件执行完毕
     await next(); //时间控制权中转 ==> 既后面代码不再允许，等待其他中间件执行后再执行 类似栈 先执行的最后结束
     let etime = new Date().getTime();
     ctx.type = 'text/hrml';
     ctx.body = '<h1>hello</h1>';
     console.log(`请求地址:${ctx.path},响应时间${etime - stime}ms`)   
 })

 app.use(async (ctx,next)=>{
     console.log('中间价 doSomething');
     await next();
     console.log("中间件执行完成");
 });

 app.listen(3000);

/**
 * ctx对象
 */
const koa = require('koa');
const Querystring = require('querystring');

const app = new koa();

// 由 async 标记的函数称为『异步函数』，在异步函数中，可以用 await 调用另一个异步函数
// async 和 await 这两个关键字将在 ES7 中引入
app.use(async ctx =>{
    if(ctx.request.method === 'GET'){  //get请求数据
        ctx.body = {  //  ==ctx.reponse.body
            url:ctx.request.url, //请求URL
            query:ctx.request.query, //获取解析的查询字符串 返回的是对象
            queryString: ctx.request.querystring ,//原始查询字符串
            query:Querystring.stringify({
                id:1,
            }),
        }
    }
    if(ctx.request.method === 'POST'){
        let postData = '';
        ctx.req.on('data',data => { //监听data事件
            postData += data; //拼接Post请求参数
        });
        ctx.req.on('end',()=>{
            console.log(postData);
        })
    }
})
/**
 * 1. 访问 : http://localhost:3000/?search=koa&keywords=context
 * 运行结果 : {"
 *              url":"/?search=koa&keywords=context",
 *              "query":{"search":"koa","keywords":"context"},
 *              "queryString":"search=koa&keywords=context"
 *          }
 *  2. curl -d  "param1=value1&m2=value2" http://localhost:3000/ #模拟post
 *  param1=value1&m2=value2
 */


app.listen(3000);



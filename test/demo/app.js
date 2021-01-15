const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const  db = require('./sql/index'); //引入mysql配置文件
const cors = require('koa-cors') //解决跨域的问题
const tools = require('./public/javascripts/tool')


const blog = require('./routes/blog')
const users = require('./routes/users')


app.use(cors());

// error handler
onerror(app)

// middlewares
// 创建application/json parser;
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
//创建 appliction/x-www-form-urlencoded parser;
app.use(bodyparser());

app.use(json())
app.use(logger())



// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.use(tools());


// app.use(koajwt({
//   secret:'WebRookie'
// }).unless({
//   path:[/^\/api\/login/]
// }));






// routes
app.use(users.routes(), users.allowedMethods())
app.use(blog.routes(), blog.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});


module.exports = app

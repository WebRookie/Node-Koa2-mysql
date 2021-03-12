const Koa = require('koa')
const app = new Koa()
// const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const moment = require('moment')

const index = require('./routes/index')
const api = require('./routes/api')


// error handler
onerror(app)

// middlewares
app.use(bodyparser({}))
 
// app.use(json())
app.use(logger())
// app.use(require('koa-static')(__dirname + '/public'))


// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  const currentTime = moment().format('YYYY-MM-DD HH:mm:ss')
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms 时间: ${currentTime}`)
})

// routes
// app.use(index.routes(),index)
app.use(api.routes(), api.allowedMethods())

app.use(async (ctx,next) => {
  try {
    await next();
  } catch (err) {
      ctx.response.status = err.statusCode || err.status || 500;
      ctx.response.body = {
        message:err.message
      };
  }
})

// // error-handling
// app.on('error', (err, ctx) => {
//   console.error('server error', err, ctx)
// });


/**
 * 不知道为什么，如果使用app.use(3000)，就会提示没哟使用回调
 * 在如果切换 取消 module.exports = app 就会 提示 3000已监听。
 * */ 
module.exports = app;

const Koa = require('koa')
const app = new Koa()
// const json = require('koa-json')
const onerror = require('koa-onerror')
// const bodyparser = require('koa-bodyparser')
const koaBody = require('koa-body');
const moment = require('moment')
const path = require('path')

// const index = require('./routes/index')
const api = require('./routes/api')

// 定时任务
// const auto = require('./middleware/auto')
// app.use(auto);
// error handler
// onerror(app)

// middlewares
// app.use(bodyparser({}))
app.use(koaBody({
  multipart:true,
  formidable: {
    uploadDir: path.join(__dirname,'/public/upload/'),
    keepExtensions:true,
    maxFieldsSize:1024*1024*100,
    onFileBegin:(file)=>{
      try {
        let newName = 'NewName' + '.' + file.name.split('.')[1];  
        let uploadPath = path.join(__dirname, '/public/upload/') + `/${newName}`;
        file.path = uploadPath
      } catch (error) {
        console.log(error)
      }

    }
  }
}))

// app.use(json())
// app.use(require('koa-static')(__dirname + '/public'))



// logger 控制台的情况
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  const currentTime = moment().format('YYYY-MM-DD HH:mm:ss')
  // let stringLog = `${ctx.method} ${ctx.url} - ${ms}ms 时间: ${currentTime}`;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms 时间: ${currentTime}`)
})

// routes
// app.use(index.routes(),index)
app.use(api.routes(), api.allowedMethods())

// 异常处理
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


/**
 * 不知道为什么，如果使用app.use(3000)，就会提示没哟使用回调
 * 在如果切换 取消 module.exports = app 就会 提示 3000已监听。
 * */ 
module.exports = app;

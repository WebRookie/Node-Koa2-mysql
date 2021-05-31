var log4js = require('log4js');
const moment = require('moment');

var logConfig = require('../config/logger_config');

//加载配置文件

log4js.configure(logConfig);

let logUtil = {};

let errorLogger = log4js.getLogger('errorLogger');
let responseLogger = log4js.getLogger('responseLogger');

//封装错误日志
logUtil.logError = (ctx, error, resTime) => {
    if(ctx && error) errorLogger.error(formatError(ctx, error, resTime))
}

//封装响应日志
logUtil.logResponse = (ctx, resTime) => {
    if(ctx) responseLogger.info(formatResponse(ctx, resTime));
}

//格式化自动任务执行日志
logUtil.autoTaskExecuteLog = (fnName) => {
    let logText = new String();

}

//格式化响应日志
let formatResponse = (ctx, resTime) => {
    let logText = new String();

    //响应日志开始
    logText+= '\n ************************ response log start ************************** \n';

    //添加请求日志
    logText += formatRequestLog(ctx.request, resTime);

    //状态响应码
    logText += `response status: ${ctx.status} \n`;

    //响应内容
    logText += `response body: ${JSON.stringify(ctx.body)} \n`;

    //响应日志结束
    logText += '************************ error log start ************************** \n';

    return logText
}

//格式化错误日志
let formatError = (ctx, err, resTime) => {
    let logText = new String();

    //错误日志开始  
    logText+= "\n"+ "************************ error log start **************************" + "\n";

    //添加请求日志
    logText+= formatRequestLog(ctx.request, resTime);

    //错误名称
    logText += `err name ${err.name} \n`;
    //错误信息
    logText += `err message ${err.message} \n`;
    //错误详情
    logText += `err stack ${err.stack} \n`;

    //错误信息结束
    logText += `************************ error log end ************************** \n`;

    return logText;
}


//格式化请求日志
let formatRequestLog = (req, resTime) => {
    let logText = new String();
    
    let method = req.method;
    //访问方法
    logText+= `request method:  ${method}  \n`;

    //请求原始地址
    logText+= `request originalUrl ${req.originalUrl} \n`;

    //客户端ip
    logText+= `request client ip ${req.ip} `;

    //开始时间
    // let startTime;  用resTime代替了
    //请求参数
    if(method == 'GET') {
        logText += `request query:  ${JSON.stringify(req.query)} \n`;
        // startTime = req.query.requestStartTime;
    }else {
        logText += `request query:  ${JSON.stringify(req.body)} \n`;
    }

    //服务器响应时间
    logText += `response Time: ${resTime} \n`;
    return logText;
}




module.exports = logUtil
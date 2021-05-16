var path = require('path');

//错误日志完整输出路径
let errorLogPath = path.resolve(__dirname,'/logList/errLog');

//响应日志完整输出路径
let responseLogPath = path.resolve(__dirname, '/logList/responseLog');


module.exports = {
    appenders: [
        //错误日志
        {
            category:'errorLogger',           //日志类型（自己起名字）
            type: 'dateFile',                 //logger类型
            filename: errorLogPath,           //日志输出位置
            alwaysIncludePattern: true,       //是否总是有后缀名
            pattern: '-yyyy-MM-dd-hh.log'     //后缀。每小时创建一个新的日志
        },
        //响应日志
        {
            category: 'responseLogger',
            type:'dateFile',
            filename: responseLogPath,
            alwaysIncludePattern: true,
            pattern: '-yyyy-MM-dd-hh.log'
        }
    ],
    levels :{                                 //设置logger名称对应的日志等级
        errorLogger: 'ERROR',
        responseLogger: 'All'
    }
}



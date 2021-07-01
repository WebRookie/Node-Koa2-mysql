var path = require('path');

//错误日志完整输出路径
let errorLogPath = path.resolve(__dirname,'./logList/errLog');

//响应日志完整输出路径
let responseLogPath = path.resolve(__dirname, './logList/responseLog');  //这个地址需要注意一下。


module.exports = {
    appenders: {
        //错误日志
        errorLogger: {
            // category:'errorLogger',           //日志类型（自己起名字）
            type: 'dateFile',                 //logger类型
            filename: errorLogPath,           //日志输出位置
            alwaysIncludePattern: true,       //是否总是有后缀名
            pattern: '-yyyy-MM-dd.log',     //后缀。每天创建一个新的日志
            level:'ERROR'
        },
        //响应日志
        responseLogger: {
            // category: 'responseLogger',
            type:'dateFile',
            filename: responseLogPath,
            alwaysIncludePattern: true,
            pattern: '-yyyy-MM-dd.log',
            level: 'ALL'
        }
    },
    categories: {
        errorLogger: {
            appenders: ['errorLogger'],
            level: 'ERROR'
        },
        responseLogger: {
            appenders: ['responseLogger'], 
            level: 'ALL',
        },
        default: {  // default好像是必须要写的。
            appenders: ['responseLogger'],
            level: 'ALL',
        } 

    }
    // levels :{                                 //设置logger名称对应的日志等级
    //     errorLogger: 'ERROR',
    //     responseLogger: 'All'
    // }
}



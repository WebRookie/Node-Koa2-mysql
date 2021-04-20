/**
 * 文件配置了log4js的一些属性。目前还没有搞清楚是原理。。 //所以暂时先不用了。。。
 */

const log4js = require("log4js");

const logConfig = {
  appenders: {
    console: {
      type: "console",
    },
    trace: {
      type: "file",
      filename: "/public/log/trace.log",
      maxLogSize: 1048576, //单位是字节   这是10Mb 1字节等于8位。 1024字节等于1kb
      backups: 10,
    },
    http: {
      type: "logLevelFilter",
      appender: "trace",
      level: "trace",
      maxLevel: "trace",
    },
    info: {
      type: "dateFile",
      fileanme: "/public/log/data-info.log",
      pattern: ".yyyy-MM-dd-hh-mm-ss",
      daysToKeep: 10,
      layout: {
        type: "pattern",
        pattern: "[%d{ISO8601}][%5p  %z  %c] %m",
      },
      compress: true,
    },
    maxInfo: {
      type: "logLevelFilter",
      appender: "info",
      level: "debug",
      maxLevel: "info",
    },
    error: {
      type: "dateFile",
      filename: "/public/log/data-error.log",
      pattern: ".yyyy-MM-dd",
      layout: {
        type: "pattern",
        pattern: "[%d{ISO8601}][%5p  %z  %c] %m",
      },
      compress: "true",
    },
    minError: {
      type: "logLevelFilter",
      appender: "error",
      level: "error",
    },
  },
  categories: {
    default: {
      appenders: ["console", "http", "maxInfo", "minError"],
      level: "all",
    },
  },
};

log4js.configure(logConfig);

module.exports = logConfig;

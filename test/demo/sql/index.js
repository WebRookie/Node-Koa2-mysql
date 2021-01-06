const { Sequelize } = require("sequelize");

var sequelize = new Sequelize({
  host: "localhost",
  port: 3306,
  username: "user",
  password: "pass",
  database: "blog",
  dialect: "mysql",
  // 是否开启日志， 对照生成的sql语句
  logging: false,
  /**
   * console.log 默认值
   * (...msg) => console.log(msg) 显示所有日志函数调用参数
   * logger.debug.bind(logger)  使用自定义记录器的另一种方法,显示所有消息
   */

  dialectOptions: {
    //字符集
    charset: "utf8mb4",
    supportBigNumbers: true,
    bigNumberStrings: true,
  },
  pool: {
    max: 5,
    min: 2,
    idle: 10000,
  },
});

sequelize.authenticate();
console.log("Connection has been established successfully.");

exports.module = sequelize;

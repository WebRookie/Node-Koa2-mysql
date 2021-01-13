// const { Sequelize } = require("sequelize/types");
const sql = require("../sql/index");
const argon2 = require("argon2");
const jwt = require('jsonwebtoken');

//引入sequelize对象
// const Sequelize = sql;

// 导入model(数据表模型)
// const user = Sequelize.import("../modules/user");
const user = require('../modules/user');
const sequelize = require("../sql/index");
// console.log(user)
// const user = Sequelize.models.User;

//自动建表 否
// user.sync({ force: false });

// 数据库操作类
class userModule {
  static async userRegist(param) {
    try {
      const result = await sequelize.transaction(async (t) => {
        const instance = await user.create({
          userName: param.userName,
          //   password: await argon2.hash(param.password),      二期，优化代码，增加密码的安全性
          password: param.password,
          mobileNumber: param.mobileNumber,
          email: param.email,
        },{
          transaction:t
        });
        return instance;
      })
    } catch (error) {
      console.log(error)
    }
  }

  static async getUserInfo(userId) {
    return await user.findOne({
      where: {
        userId,
      },
    });
  }

  static async getUserInfo(userName) {
    return await user.findOne({
      where: {
        userName,
      },
    });
  }
}

class UserController {
  static async register(ctx) {
    if (ctx.request.body.userName && ctx.request.body.password) {
      try {
        const check = await userModule.getUserInfo(ctx.request.body.userName);
        if (check) {
          ctx.status = 200;
          ctx.body = {
            code: 6240,
            msg: "用户已存在",
          };
          return;
        } else {
          const param = {
            userName: ctx.request.body.userName,
            password: ctx.request.body.password,
            // 非必填的可不可以不写？   -----  试一下
            //尝试结果，如果不填，尽管传值了，但是还是收不到
            email: ctx.request.body.email,
            mobileNumber: ctx.request.body.mobileNumber
          };
          await userModule.userRegist(param);
          ctx.status = 200;
          ctx.body = {
            code: 6240,
            msg: "注册成功",
          };
        }
      } catch (error) {
        console.log(error)
        ctx.status = 416;
        ctx.body = {
          code: -1,
          msg: "请求错误",
          data: error.message
        };
        return;
      }
    }
  }

  static async login(ctx) {
    try {
      if (!ctx.request.body.userName || !ctx.request.body.password) {
        return ctx.body = {
          code: -1,
          msg: '用户名和密码不能为空'
        }
      } else {
        const qeury = await userModule.getUserInfo(ctx.request.body.userName);
        if (qeury) {
          if (qeury.password == ctx.request.body.password) {
            const token = jwt.sign({
              userId:ctx.request.body.userId,
            }, 'WebRookie', {expiresIn: 3600})
            return ctx.body = {
              code: 0,
              msg: '登录成功',
              token:token,
              data: qeury //未处理返回的数据。
            }
          } else {
            return ctx.body = {
              code: -1,
              msg: '用户名或密码不正确'
            }
          }
        } else {
          return ctx.body = {
            code: -1,
            msg: '该用户尚未注册'
          }
        }
      }
    } catch (error) {
      console.log(error)
      throw Error
      
    }
  }

  static async getUserInfo(ctx) {
    console.log(token)
    try {
      console.log(result)
      //分情况，如果是通过userId查看
      if (ctx.request.body.userId) {
        let query = await userModule.getUserInfo(ctx.request.body.userId);
        
        if (query.userId == ctx.request.body.userId) {
          const info = {
            createdAt: query.createdAt,
            updatedAt: query.updatedAt,
            mobileNumber: query.mobileNumber,
            userId: query.userId,
            email: query.email,
            userName: query.userName,
          };

          return (ctx.body = {
            code: 6240,
            msg: "查询成功",
            data: info,
          });
        }
      } else if (ctx.request.body.userName) {
        let query = await userModule.getUserInfo(ctx.request.body.userName);
        if (query.userName == ctx.request.body.userName) {
          const info = {
            createdAt: query.createdAt,
            updatedAt: query.updatedAt,
            mobileNumber: query.mobileNumber,
            userId: query.userId,
            email: query.email,
            userName: query.userName,
          };
          return (ctx.body = {
            code: 6240,
            msg: "查询成功",
            data: info,
          });
        }
      } else {
        ctx.code = 404
        return (ctx.body = {
          code: -1,
          msg: '查无此人'
        })
      }
    } catch (error) {
      ctx.status = 401;
      return ctx.body = {
        code:'-1',
        msg:'登录过期，请重新登录'
      }
    }
  }
}

module.exports = UserController;
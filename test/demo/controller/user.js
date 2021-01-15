const jwt = require('jsonwebtoken');
// 导入model(数据表模型)
const user = require('../modules/user');

//引入sequelize实例  (为了完成事务的实现)
// const sequelize = require("../sql/index");

// 数据库操作类
class userModule {
  static async userRegist(param) {
    try {
      return await user.create({
          userName: param.userName,
          //   password: await argon2.hash(param.password),      二期，优化代码，增加密码的安全性
          password: param.password,
          mobileNumber: param.mobileNumber,
          email: param.email,
        });
       
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
  
  static async checkUser(userName){
    return await user.findOne({
      where:{
        userName,
      }
    })
  }
}

class UserController {
  static async register(ctx) {
    if (ctx.request.body.userName && ctx.request.body.password) {
      try {
       //允许用户名相同的存在。因为有些用户可能使用姓名当做用户名
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
        const qeury = await userModule.checkUser(ctx.request.body.userName);
        if (qeury) {
          if (qeury.password == ctx.request.body.password) {
            //发布token
            const token = jwt.sign({
              userId:qeury.userId,
            }, 'WebRookie', {expiresIn: '1h'})
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
      ctx.status = 400;
      ctx.body={
        code:-1,
        data:error.message
      }
      
    }
  }

  static async getUserInfo(ctx) {
    try {
      //分情况，如果是通过userId查看
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
    } catch (error) {
      ctx.status = 401;
      return ctx.body = {
        code:'-1',
        msg:'请求失败',
        data:error.message
      }
    }
  }
}

module.exports = UserController;
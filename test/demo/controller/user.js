const { Sequelize } = require('sequelize/types');
const sql = require('../sql/index');
const argon2 = require('argon2')

//引入sequelize对象
const Sequelize = sql.sequelize;

// 导入model(数据表模型)
const user = Sequelize.import('../modules/user')

//自动建表 否
user.sync({force:false});

// 数据库操作类
class userModule {
    static async userRegist(param) {
        return await user.create({
            userName:param.userName,
            password: await argon2.hash(param.password),
            mobileNumber:param.mobileNumber,
            email:param.email
        })
    }

    static async getUserInfo(userId){
        return await user.findOne({
            where:{
                userId
            }
        })
    }

    static async getUserInfo(userName){
        return await user.findOne({
            where:{
                userName
            }
        })
    }
}

 class UserController{
    static async register(ctx) {
        if(ctx.request.body.userName && ctx.request.body.password ){
            try {
                const check = await userModule.getUserInfo(ctx.request.body.userName);
                if(check){
                    ctx.responce.status = 200;
                    ctx.body = {
                        code:6240,
                        msg:'用户已存在'
                    };
                    return;
                }else {
                    const param = {

                    }
                }
            } catch (error) {
                
            }
        }
    }
 }

module.exports = UserController;




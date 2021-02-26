const http = require('../../util/axios')
const config = require('../../util/config')
const User = require('../model/user');
const axios = require('axios')

const appid = 'wx6780511abd1d0ea1';
const appscret = 'fa9b16e30aabfe649f272c491e03e35f'
class UserModel{
   static async checkUserStatus(openId){
        return await User.findOrCreate({
            where:{
                openId:openId
            }
        });
   }
}

class UserController{
    /**
     * 用户登录
     * @param ctx 
     */
    static async login(ctx){
        const req = ctx.request.body;
        try {
            // await UserModel.checkUserStatus(req.code)

            http.get('/sns/jscode2session?',{
                appid:appid,
                secret:appscret,
                js_code:req.code,
                grant_type:'authorization_code'
            }).then(res =>{
                ctx.status = 200;
                ctx.body = {
                    code:1,
                    msg:'登录成功',
                    data:res
                }
                console.log(res)
            })
            


 

        } catch (error) {
            console.log(error)
            ctx.body = {
                code:-1,
                msg:'登录失败'
            }
        }
    }
}

module.exports = UserController;
// const http = require('../../util/axios')
const config = require('../../util/config')
const User = require('../model/user');
const UserPointDetail = require('../model/userPointDetail')
const axios = require('axios');
const moment = require('moment');


class UserModel{
   static async checkUserStatus(openId){
        return await User.findOne({
            where:{
                open_id:openId
            }
        });
   };

   static async createUser(openId){
        const user =  await User.create({open_id:openId});
        return user.userId
   }

   static async getUser(userId){
       return await User.findOne({
           where:{
               user_id:userId
           }
       });
   }
   
   static async getPointDetail(userId){
        return await UserPointDetail.findOne({
           where:{
               user_id:userId
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
            // const result =  await UserModel.checkUserStatus(req.code)
        try {
            const req = ctx.request.body;
            const currentTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
            console.log(currentTime)
            await axios.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${config.appid}&secret=${config.appscret}&js_code=${req.code}&grant_type=authorization_code`).then(async res => {
                let openId = res.data.openid;
                let sessionKey  = res.data.session_key;
                let result = await  UserModel.checkUserStatus(openId);
                if(!result) {
                    // 需要更新用户信息 第一次登录
                    let userId = await UserModel.createUser(openId);
                    ctx.status = 200;
                    ctx.body = {
                        code:100,
                        msg:'登录成功',
                        data:{
                            openId:openId,
                            sessionKey:sessionKey,
                            userId:userId
                        }
                    }
                }else {
                    ctx.status = 200;
                    ctx.body = {
                        code:101,
                        msg:'登录成功',
                        data:{
                            openId:openId,
                            sessionKey:sessionKey,
                            userId:result.user_id
                        }
                    }
                }
            })
        } catch (error) {
            console.log(error)
            ctx.throw(500); //把错误返回给用户
        }
    }

    /**
     * 记录用户信息
     * @param openId
     */
    static async updateUserInfo(ctx){
            const request = ctx.request.body;
            const userId = request.userId;
            const nickName = request.nickName;
            const img = request.img;
            let gender ;
            if(request.gender == 1){
                gender = 'male'
            }else if(gender == 2){
                gender = 'female'
            }else {
                gender = 'none'
            }
            await User.update({
                nick_name:nickName,
                img:img,
                gender:gender
            },{
                where:{
                    user_id:userId
                }
            });
            ctx.status = 200;
            ctx.body = {
                code:1024,
                msg:'更新成功',
            }
    }

    /**
     * 查询积分
     * @param userId
     */
    static async getUserPoint(ctx){
        const request = ctx.request.body;
        let result = await UserModel.getUser(request.userId);
        if(result){
            const point = result.point;
            ctx.status = 200;
            ctx.body = {
                code:1024,
                msg:'请求成功',
                data:{
                    point:point
                }
            }   
        }else {
            ctx.status = 200;
            ctx.body = {
                code:1024,
                msg:'请求出错',
                data:result
            }
        }
        
    }

    /**
     * 获取积分详情
     * @param userId
     */
    static async getPointDetail(ctx){
        let request = ctx.request.body;
        let result = await UserModel.getPointDetail(request.userId);
        if(result){
            let data = {
                id:user_point_detail_id,
                createDate:result.create_date,
                pointType:result.point_type,
                point:point
            }
            ctx.status = 200;
            ctx.body = {
                code:1024,
                data:data,
                msg:'查询成功'
            }
        }else{
            // 没有这个人所以为零，没有记录
            ctx.status = 200;
            ctx.body = {
                code:1024,
                data:null,
                msg:'暂无记录'
            }
            
        }
    }
}

module.exports = UserController;
// const http = require('../../util/axios')
const config = require('../../util/config')
const User = require('../model/user');
const UserPointDetail = require('../model/userPointDetail')
const axios = require('axios');
const moment = require('moment');
const sequelize = require('../../db/sql');
const sendMail = require('../plugin/mail')


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

   static async updateLoginTime(time,userId){
       await User.update({last_login_date:time},{
           where:{
               user_id:userId
           }
       });
       return;
   }

   static async updateUserInfo(info,userId){
        await User.update({nick_name:info.nickName,img:info.img,gender:info.gender},{
            where:{
                user_id:userId
            }
        })
   }
   
    //  用户签到
   static async userDaySign(userId){
        await User.update({today_sign:'1',point:sequelize.literal('`point`+ 1')},{
            where: {
                user_id:userId
            }
        })
   }

   // 更改用户连续签到状态
   static async  userChangeContinueStatus(userId,status){
       await User.update({continue_sign:status},{
           where: {
               user_id: userId
           }
       })
   }

//    更改昨日签到状态
   static async userSignYesterday(userId,status) {
       await User.update({yesterday_sign:status},{
           where: {
               user_id: userId
           }
       })
   }

//    用户积分变化方法
/**
 * 
 * @param {用户Id} userId 
 * @param {积分变化数量} point 
 * @param {变化类型1-订单消费。2-签到获取。3-订单退回。4-完成任务。} type 
 */
   static async userPointChange(userId,point,type,username){
        const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
        await UserPointDetail.create({user_id:userId,point:point,point_type:type,create_date:currentTime,user_name:username})
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
            // 邮箱验证功能start
            // let emailArray = ['912962951@qq.com','1002490065@qq.com','993504432@qq.com','572055250@qq.com','572055250@qq.com','1074059209@qq.com','1048722426@qq.com','572055250@qq.com','1748086204@qq.com','1216081508@qq.com','1721568306@qq.com','993042495@qq.com']
            // let result = sendMail(emailArray,7758521)
            // 邮箱验证功能end
            // console.log(result) 
            const req = ctx.request.body;
            const currentTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
            console.log(currentTime)
            await axios.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${config.appid}&secret=${config.appscret}&js_code=${req.code}&grant_type=authorization_code`).then(async res => {
                let openId = res.data.openid;
                let sessionKey  = res.data.session_key;
                let userId;
                  // 需要更新用户信息 第一次登录
                let result = await  UserModel.checkUserStatus(openId);
                result ? userId = result.user_id : userId = await UserModel.createUser(openId);
                const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
                await UserModel.updateLoginTime(currentTime,userId);
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
            const data = {
                nickName:nickName,
                img:img,
                gender:gender
            }
            await UserModel.updateUserInfo(data,userId)
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

    /**
     * 用户签到
     * @param userId
     */
    static async userSign(ctx){
        let request = ctx.request.body;
        let userInfo = await UserModel.getUser(request.userId);
        if(!userInfo){
            ctx.status = 404;
            return ctx.body = {
                code:-10086,
                data:'null',
                msg:'错误，用户不存在'
            }
        }
        // 今天没签到
        if(userInfo.today_sign == 0){
            //用户今日签到
            await UserModel.userDaySign(userInfo.user_id);
            await UserModel.userPointChange(userInfo.user_id,1,2,userInfo.nick_name)
            
            // 昨天没有签到签到了
            if(userInfo.yesterday_sign == 0){
                /**
                 * 还有未完成的逻辑，这里需要每天都对当日的签到规整，规整时需要判断
                 * 规整时判断当天签到是否完成，如果完成则置昨天签到是1，今天签到为0
                 * 如果为签到这当天还是0，昨天敲到为0，连续签到也为0（均是未签到）
                 */


                // 这部分不应该有业务去完成，而是由每天的自动归位方法完成。所以目前暂不操作。
                // await UserModel.userSignYesterday(userInfo.user_id,1);
                // await UserModel.userChangeContinueStatus(userInfo.user_id,1)

            }
            // 此时积分需要加1
            // await UserPointDetail
            ctx.status = 200;
            ctx.body = {
                code:1024,
                msg:'签到成功',
                data:'success'
            }

        }else {
            ctx.status = 200;
            ctx.body = {                              
                code:2048,
                msg:'今天已经签到过了',
            }
        }
    }
}

module.exports = UserController;
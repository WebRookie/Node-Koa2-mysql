const Blog = require('../model/blog');
const moment = require('moment');
const User = require('../model/user')


class BlogModel {
    /**
     * 查询用户信息
     * @param {用户Id} userId 
     * @returns 
     */
    static checkUserInfo(userId){
        return User.findOne({where:{user_id:userId}})
    }


    /**
     * 发布博客
     * @param {用户Id} userId 
     * @param {博客内容} content 
     * @param {用户名} userName 
     * @returns 
     */
    static publishBlog(userId,content,userName){
      return Blog.create({user_id:userId,content:content,author_name:userName})
    }

}


class BlogController {
    /**
     * 
     * @param {传入的参数有userId，conent} ctx 
     */
    static async blogPublish(ctx) {
        let request = ctx.request.body;
        // 参数未传直接返回
        if(!request.userId || !request.content){
            ctx.status = 400;
            return ctx.body = {
                code:-1024,
                data:null,
                msg:'请求参数不全'
            }
        }

        let userId = request.userId;
        let userInfo = await BlogModel.checkUserInfo(userId);
        // 用户未登录判断
        if(!userInfo){
            ctx.status = 400;
            return ctx.body = {
                code:-1024,
                data:null,
                msg:'请先登录'
            }
        }
        try{
            let result = await BlogModel.publishBlog(userId,request.content,userInfo.nick_name);
            ctx.code = 200;
            ctx.body = {
                code:1024,
                data:result,
                msg:'发布成功'
            }
        }catch(err){
            ctx.code = 400;
            ctx.body = {
                code:-1024,
                data:err,
                msg:'请求出错'
            }
        }

    }
}

module.exports = BlogController
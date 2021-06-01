const Blog = require('../model/blog');
const moment = require('moment');
const User = require('../model/user')


class BlogModel {
    /**
     * 查询用户信息
     * @param {用户Id} userId 
     * @returns 
     */
    static async checkUserInfo(userId){
        return await User.findOne({where:{user_id:userId}})
    }


    /**
     * 发布博客
     * @param {用户Id} userId 
     * @param {博客内容} content 
     * @param {用户名} userName 
     * @returns 
     */
    static publishBlog({userId,content,userName,picture = null}){
      return Blog.create({user_id:userId,content:content,author_name:userName,picture:picture})
    }

    /**
     * 
     * @param {里面包含分页数据} param 
     */
    static async listAllBlog(data){
        return await Blog.findAll({
            offset: (data.pageNo - 1) * data.pageSize,
            limit: data.pageSize
        })

    }

    /**
     * 
     * @param {用户信息} data 
     */
    static async blogUserList(data){
    // sql分页通过sql limit和sql
    // offset是设置跳过多少条信息，而limit是显示多少条信息。通过offset * limit就可以达到分页的效果。
        let result = await Blog.findAndCountAll({
            where:{
                user_id:data.userId
            },
            offset: (data.pageNo - 1) * data.pageSize,
            limit: data.pageSize
        });
        return result;
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
            let result;
            if(request.picture){
                // 判断博客是否含有图片
                result = await BlogModel.publishBlog({userId:userId, content:request.content, userName:userInfo.nick_name, picture:request.picture});
            }else {
                result = await BlogModel.publishBlog({userId:userId,content:request.content,userName:userInfo.nick_name});
            }
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

    static async blogList(ctx){
        let request = ctx.request.body;
        console.log(request)
        if(!request.params || !request.params['pageSize'] || !request.params['pageNo'] ){
            ctx.code = 400;
            return ctx.body = {
                code:-1204,
                data:null,
                msg:'参数不齐'
            }
        }
        // 如果不穿用户Id则是全部博客列表，如果传入用户ID，则是查看用户的博客列表
        if(!request.userId){
            try {
                let data = {
                    pageSize : request.params['pageSize'],
                    pageNo : request.params['pageNo']
                }
                let result = await BlogModel.listAllBlog(data);
                ctx.code = 200;
                ctx.body = {
                    code:1024,
                    data:result,
                    msg:'获取成功'
                }
                return;
            } catch (error) {
                ctx.code = 500;
                ctx.body = {
                    code:-1024,
                    data:error,
                    msg:'请求出错'
                }
            }
        }else{
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

            try {
                let data = {
                    userId:userId,
                    pageSize:request.params['pageSize'],
                    pageNo:request.params['pageNo']
                }
                let result = await BlogModel.blogUserList(data);
                // 返回用户BlogList中 count 是所有的数量，不管分页是多少。
                ctx.code = 200;
                ctx.body = {
                    code:1024,
                    data:result,
                    msg:'获取成功'
                }
                return;
            } catch (error) {
                ctx.code = 500;
                ctx.body = {
                    code:-1024,
                    dat:error,
                    msg:'请求出错'
                }
            }

        }
    }

    /**
     * 
     * @param {传入的参数有userId，blogId} ctx 
     */
    static async blogEdit(ctx) {
        let request = ctx.request.body;
        // 参数未传直接返回
        if(!request.userId || !request.blogId){
            ctx.status = 400;
            return ctx.body = {
                code:-1024,
                data:null,
                msg:'请求参数不全'
            }
        }
    }
}

module.exports = BlogController
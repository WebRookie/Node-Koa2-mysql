// 引入数据表模型
const blog = require('../modules/blog');
// token验证
const jwt = require('jsonwebtoken');

/**
 * 数据库操作类
 * 这部分是用来和数据库交流的一些方法。
 */
class BlogModule {
    // 发表文章
    static async BlogPublish(data){
        // var currentTime = moment(Date.now().format('YYYY-MM-DD HH:mm:ss'))
        // const data = new Date().
        return blog.create({ // 创建模型的实例。
            blogName:data.blogName,
            content:data.content,
            userName:data.userName,
            userId:data.userId,
        })
    }

    //查看博客内容
    static async getBlogDetail(blogId){
        return await blog.findOne({
            where:{
                blogId
            }
        })
    }

    //获取全部博客
    static async getAllBlog(){
        const list = await blog.findAndCountAll()
        return list;
    }

    //获取当前用户的所有博客
    static async getCurrentBlog(userId){
        return await blog.findAll({
            where:{
                userId
            }
        })
    }

    //更改博客
    static async upDateBlog(param){
        return await blog.update({
            blogId:param.BlogId,
            content:param.content,
            blogName:param.blogName
        },{
            where:{
                userId:param.userId
            }
        })
    }

    //删除博客
    static async deleteBlog(BlogId){
        return await blog.destory({
            where:{
                BlogId
            }
        })
    }
}

/**
 * 功能处理
 * 这部分是处理逻辑的，
 * 对应的,在Module里的方法，具体实现的逻辑要在下面实现出来
 */
class BlogControlller {
    static async blogPublish(ctx) {
        try {
            //验证身份  (通过token来决定是谁发的..) 
            let token = ctx.request.header.token;
            let verify = jwt.verify(token,'WebRookie');
            const userId = verify.userId
            
            const param = {
                blogName:ctx.request.body.blogName,
                content:ctx.request.body.content,
                userName:ctx.request.body.userName,
                userId:userId
            }

            //保存到数据库
             await BlogModule.BlogPublish(param);

            ctx.response.status = 200;
            ctx.body = {
                code:6240,
                msg:'发布成功',
            }
        } catch (error) {
            ctx.status = 400;
            ctx.body = {
                code:-1,
                msg:error.message
            }
            console.log(error.message);
        }
    }

      //查看博客列表
    static async getAllBlog(ctx){
          try {
            const result =  await BlogModule.getAllBlog();
            ctx.status = 200
            ctx.body = {
                code:6240,
                msg:'查询成功',
                data:result
            }
            return  
          } catch (error) {
              ctx.status = 400;
              ctx.body ={
                  code:-1,
                  data:error.message
              }
          }
       

    }
    
    static async getBlogDetail(ctx){
        try {
            const blogId = ctx.request.body.blogId
            const result = await BlogModule.getBlogDetail(blogId);
            ctx.status = 200;
            ctx.body = {
                code:6240,
                msg:'查询成功',
                data:result,

            }

        } catch (error) {
            ctx.status = 400;
            ctx.body = {
                code:-1,
                data:error.message
            }
        }
    }
}

module.exports = BlogControlller;
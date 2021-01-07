const sql = require("../sql/index");
const moment = require('moment');

// 引入sequelize对象
const Sequelize = sql.sequelize;

// 引入数据表模型
const blog = Sequelize.import("../modules/blog");

//自动建表
blog.sync({ force: false });
// 如果使用 sequelize.sync() 将自动同步所有模型




//数据库操作类
class BlogModule {
    // 发表文章
    static async BlogPublish(data){
        var currentTime = moment(Date.now().format('YYYY-MM-DD HH:mm:ss'))
        console.log(currentTime)
        // const data = new Date().
        return blog.create({ // 创建模型的实例。
            blogName:data.blogName,
            content:data.content,
            author:data.userName,
            // createTime:currentTime
        })
    }

    //查看博客内容
    static async getBlogDetail(BlogId){
        return await blog.findOne({
            where:{
                BlogId
            }
        })
    }

    //获取全部博客
    static async getAllBlog(){
        return await blog.findAll()
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
    static async BlogPublish(ctx) {
        try {
            const param = {
                blogName:ctx.request.body.blogName,
                content:ctx.request.body.content,
                author:ctx.request.body.userName,
            }

            //保存到数据库
             await BlogModule.BlogPublish(param);

            ctx.response.status = 200;
            ctx.body = {
                code:6240,
                msg:'发布成功',
            }
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = BlogControlller;
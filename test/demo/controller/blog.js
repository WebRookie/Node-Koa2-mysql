const sql = require("../sql/index");

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
        // const data = new Date().
        return blog.create({ // 创建模型的实例。
            blogName:data.blogName,
            content:data.content,
            author:data.userName
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

    //更改的博客
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
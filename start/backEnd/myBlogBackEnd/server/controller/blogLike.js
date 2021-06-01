const BlogLike = require("../model/blogLike");

class BlogLikeModel {
  static async userLikeOrCancel(userId, blogId) {
    let result = BlogLike.findAll({
        where:{
            user_id: userId,
            blog_id: blogId
        }
    })
    if(result){
        console.log(123)
    }else {
        BlogLike.create({user_id: userId, blog_id: blogId})
    }
  }
}

class BlogLikeController {
  static async likeBlog(ctx) {
    let request = ctx.request.body;
    if (!request.userId || !request.blogId) {
      ctx.status = 400;
      return (ctx.boyd = {
        code: -1024,
        data: null,
        msg: "参数不全",
      });
    }
    let userId = request.userId;
    let blogId = request.blogId;
    await BlogLikeModel.userLikeOrCancel(userId,blogId)
  }
}

const comment = require('../modules/comment')
const user = require('../modules/user')


class CommentModule {
    static async comment(params){
        return await comment.create({
            commentInfo:params.commentInfo,
            userName:params.userName,
            userId:params.userId,
            blogId:params.blogId
        })
    }

    static async getComment(blogId){
        const result = await comment.findAndCountAll({
            where:{
                blogId
            },
            order:[
             ['commentTime','DESC']   
            ],
            include:[
                {
                    model:user,
                }
            ]
        });
        console.log(result)
    }
}

class CommentController {
    static async comment(ctx){
        try {
            const param = {
                userId : ctx.request.body.userId,
                userName : ctx.request.body.userName,
                commentInfo : ctx.request.body.commentInfo,
                blogId : ctx.request.body.blogId
            };
            await CommentModule.comment(param);
            ctx.status = 200;
            ctx.body = {
                code:6240,
                msg:'发表成功',
            }
        } catch (error) {
            console.log(error.message);
            ctx.status = 401;
            ctx.body = {
                code:-1,
                msg:error.message
            };
        }
    }

    static async getComment(ctx){
        try {
            const blogId = ctx.request.body.blogId;
            const query = await CommentModule.getComment(blogId);
            ctx.status = 200;
            ctx.body = {
                code:6240,
                msg:'请求成功',
                data:query,
            }
            console.log(query)
        } catch (error) {
            
        }
    }


}

module.exports = CommentController;
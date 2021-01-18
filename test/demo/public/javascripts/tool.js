//解析Token 以及身份验证

const jwt = require('jsonwebtoken');

module.exports = () => {
    return async (ctx, next) => {
        //请求路径为api/xxx,并且不是api/login,因为登录的时候还没有token
        if(ctx.request.path.startsWith('/api/') && !ctx.request.path.endsWith('login' ) && ctx.request.method != 'GET' && !ctx.request.path.endsWith('regist')) {
            // 暂时请求方式都是post，token放在请求头中
            let token = ctx.request.header.token;
            if(!token) {
                ctx.response.status = 400;
                ctx.response.body = {
                    code:-1,
                    msg:'token不存在'
                };
                return;
            }
            try {
                let verify = jwt.verify(token,'WebRookie');
                // let verify = jwt.verify(token,'123456');
                // let userId = ctx.request.body.userId;
                if(!verify.userId) {
                    throw new Error('token无效')
                }
                await next();
            } catch (error) {
                console.log(error)
                ctx.status = 400;
                ctx.body = {
                    code:-1,
                    messages:'token无效',
                    data:error.message
                }
            }
        } else {
            await next();
        }
    }
}
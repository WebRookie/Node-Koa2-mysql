const user = require('../model/user');

class UserModel{
   static async checkUserStatus(){
       
   }
}

class UserController{
    /**
     * 用户登录
     * @param ctx 
     */
    static async login(ctx){
        const req = ctx.request.body;
        try {
            const query = await user.User.login
        } catch (error) {
            
        }
    }
}
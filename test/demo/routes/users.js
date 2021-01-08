const router = require('koa-router')()
const UserController = require('../controller/user')

router.prefix('/users')

//用户注册
router.post('/regist',UserController.register);

//用户登录
router.post('/login',UserController.login);



module.exports = router

const router = require('koa-router')()
const UserController = require('../controller/user')

router.prefix('/api')

//用户注册
router.post('/regist',UserController.register);

//用户登录
router.post('/login',UserController.login);

//查看用户信息
router.post('/getUserInfo',UserController.getUserInfo);



module.exports = router

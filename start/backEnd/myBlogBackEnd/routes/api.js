const UserController = require('../server/controller/user')

const router = require('koa-router')()


router.post('/login',UserController.login);

router.post('/updateUserInfo',UserController.updateUserInfo)

router.post('/getUserPoint',UserController.getUserPoint)

router.post('/userSign',UserController.userSign)

module.exports = router;
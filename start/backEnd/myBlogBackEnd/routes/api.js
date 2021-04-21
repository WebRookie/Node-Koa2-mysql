const UserController = require('../server/controller/user')
const BlogController = require('../server/controller/blog')

const router = require('koa-router')()

/**
 * 这里放的是所有暴露给前端的接口
 */

router.post('/login',UserController.login)

router.post('/updateUserInfo',UserController.updateUserInfo)

router.post('/getUserPoint',UserController.getUserPoint)

router.post('/userSign',UserController.userSign)

router.post('/publishBlog',BlogController.blogPublish)

module.exports = router;
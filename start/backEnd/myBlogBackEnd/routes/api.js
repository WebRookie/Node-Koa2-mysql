const UserController = require('../server/controller/user')
const router = require('koa-router')()

router.post('/login',UserController.login);




module.exports = router;
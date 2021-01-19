const router = require('koa-router')();
const CommentController = require('../controller/comment');

router.prefix('/api');

//写评论
router.post('/comment',CommentController.comment);
//产看博客评论
router.get('/getComment',CommentController.getComment);

module.exports = router;
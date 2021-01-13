
const router = require('@koa/router')();

const BlogControlller = require('../controller/blog');

router.prefix('/blog')


//写博客
router.post('/blogpublish',BlogControlller.blogPublish);
//博客查看
router.get('/getBlogDetail',BlogControlller.getBlogDetail)


module.exports = router;

const router = require('@koa/router')();

const BlogControlller = require('../controller/blog');

router.prefix('/api')

//写博客
router.post('/blogPublish',BlogControlller.blogPublish);
//查看博客列表
router.get('/getAllBlog', BlogControlller.getAllBlog);
//查看个人博客
router.post('/getAllBlog',BlogControlller.getAllBlog)
//博客查看
router.get('/getBlogDetail',BlogControlller.getBlogDetail);
//博客更改


module.exports = router;
import { post, get } from './index';
const api = {
  //登录
  login:data => post(`/login`,data),
  // 更新用户信息
  updateUserInfo:data => post('/updateUserInfo',data),
  //获取用户积分
  getUserPoint:data => post('/getUserPoint',data),
  // 用户签到
  userSign:data=>post(`/userSign`,data),
  // 发布博客
  publishBlog:data=>post(`/publishBlog`,data),
  // 查看博客列表
  getBlogList: data=>post('/listAllBlog',data)
}
module.exports = api
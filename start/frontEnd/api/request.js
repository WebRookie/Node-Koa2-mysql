import { post, get } from './index';
const api = {
  //登录
  login:data => post(`/login`,data),
  // 更新用户信息
  updateUserInfo:data => post('/updateUserInfo',data),
  //获取用户积分
  getUserPoint:data => post('/getUserPoint',data),
}
module.exports = api
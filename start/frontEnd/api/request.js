import { post, get } from './index';
const api = {
  //登录
  login:data => post(`/login`,data)
}
module.exports = api
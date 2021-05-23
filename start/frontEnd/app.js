// app.js
var http = require('./api/request');

App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.$http = http;
    // 登录
    wx.login({
      success: res => {
        const code = res.code
        console.log(code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.$http.login({code:code}).then(res => {
          var userId = res.data.data.userId
          wx.setStorageSync('userId', userId)
          console.log(res);
          if(res.data.code == 1024){
              // 获取用户信息
            wx.getSetting({
              success: res => {
                if (res.authSetting['scope.userInfo']) {
                  console.log(1)
                  // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                  wx.setStorageSync('infoFlag',true)
              }else {
                console.log(2)
                wx.setStorageSync('infoFlag', false)
              }
            }
          })
          }else {
            // 已经登录
          }
        })
      }
    })
  },
  globalData: {
    userInfo: null
  }
})

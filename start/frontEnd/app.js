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
          if(res.data.code == 100){
              // 获取用户信息
            wx.getSetting({
              success: res => {
                if (res.authSetting['scope.userInfo']) {
                  // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                  wx.getUserInfo({
                    success: res => {
                        // 可以将 res 发送给后台解码出 unionId
                    this.globalData.userInfo = res.userInfo
                      console.log(res);
                      const param = {
                        userId:userId,
                        nickName:res.userInfo.nickName,
                        img:res.userInfo.avatarUrl,
                        gender:res.userInfo.gender
                      }
                      wx.$http.updateUserInfo(param).then(res => {
                        console.log(res)
                      })
                      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                      // 所以此处加入 callback 以防止这种情况
                      if (this.userInfoReadyCallback) {
                        this.userInfoReadyCallback(res)
                      }
                    }
                });
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

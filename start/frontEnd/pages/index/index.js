// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Welcome Test!',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    if(wx.getStorageInfoSync('userInfo')){
      let userInfo = wx.getStorageSync('userInfo')
      this.setData({
        userInfo: userInfo,
        hasUserInfo: true
      })
    }
  },
  getUserInfo(e) {
    let userId = wx.getStorageSync('userId')
    wx.getUserProfile({
      desc:'xx',
      success:res=>{
        console.log(res)
        app.globalData.userInfo = res.userInfo
        const userInfo = res.userInfo;
        wx.setStorageSync('userInfo', userInfo)
        const param = {
          userId:userId,
          nickName:res.userInfo.nickName,
          img:res.userInfo.avatarUrl,
          gender:res.userInfo.gender
        }
        wx.$http.updateUserInfo(param).then(res => {
          console.log(res)
        })
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        return;
      }
    })
    console.log(e)
    return;
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})

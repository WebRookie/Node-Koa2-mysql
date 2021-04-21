// pages/action/action.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:""
  },
  input(e){
    let value = e.detail.value;
    this.setData({
      content:value
    })
  },
  submit(){
    let param = {
      userId:this.data.userId,
      content:this.data.content,
    }
    wx.$http.publishBlog(param).then(res=>{
      if(res.data.code = 1024){
        wx.showToast({
          title: '发布成功',
          duration:1500
        })
        setTimeout(()=>{
          wx.switchTab({
            url: '/pages/request/request',
          })
        },3000)
      }
      console.log(res)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const userId = wx.getStorageSync('userId');
    this.setData({
      userId:userId
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
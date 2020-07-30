// pages/userinfo/userinfo.js
// user.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    username:null,
    usercredit:null,
    menuitems: [
      { text: '账户信息', url: 'details', icon: '../../image/item.png', tips: '../../image/tip.png' },
      { text: '预约历史', url: '../book/history', icon: '../../image/item.png', tips: '../../image/tip.png' },
      { text: '待解除预约项目', url: '../book/confirm', icon: '../../image/item.png', tips: '../../image/tip.png' },
    ]
  },
  logout: function() {
    app.globalData.id = null
    app.globalData.name=null
    app.globalData.usercredit=null
    app.globalData.place=[]
    app.globalData.p_open=[]
    app.globalData.p_close=[]
    wx.navigateTo({
      url: '../login/login'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
  this.setData({
    userInfo: app.globalData.userInfo,
    username: app.globalData.name,
    usercredit: app.globalData.usercredit,
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

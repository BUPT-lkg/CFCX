// pages/book/history.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list:null,
    place: null,
    },

    onShow: function () {
    var that = this;
    //登陆的时候要传过来的参数
    var user_id = app.globalData.id
    console.log("user_id",user_id)
    //发送ajax请求到服务器-登录
    wx.request({
    url: 'http://www.cuofengchuxing.top/app/history',//127.0.0.1:5000www.cuofengchuxing.top http://localhost:8080/Weixinapp/user/login.do
    data: {
      user_id: JSON.stringify(user_id),
    },
    header: {
    'content-type': 'application/x-www-form-urlencoded', // 默认值
    'chartset': 'utf-8'
   },
    method: 'POST',
    dataType: 'json',
    success: function (res) {
     console.log("成功")
     that.setData({
      list : res.data ,
      place: app.globalData.place,
     })
     console.log(that.data.list)
    },
    fail: function (res) {
    wx.showToast({
    title: '服务器网络错误,请稍后重试',
    icon: 'loading',
    duration: 1500
    })
    },
    complete: function (res) {
  
    },
    })

    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
 
  onShow: function () {

  },
  */
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
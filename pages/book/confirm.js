// pages/book/confirm.js
const app=getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    latitude : 0,
    longitude : 0,
    list:null,
    listindex:0,
    place: null,
  },

  bindChange: function (e) {
    this.setData({
      listindex:e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  confirm:function(){
    var that = this;
    var app_id = that.data.list[that.data.listindex].app_id
    var latitude = that.data.latitude
    var longitude  = that.data.longitude 
    //发送ajax请求到服务器-登录
    wx.request({
    url: 'http://www.cuofengchuxing.top/app/confirm/check',//127.0.0.1:5000 www.cuofengchuxing.top
    data: {
      app_id: JSON.stringify(app_id),
      latitude: JSON.stringify(latitude),
      longitude : JSON.stringify(longitude)
    },
    header: {
    'content-type': 'application/x-www-form-urlencoded', // 默认值
    'chartset': 'utf-8'
  },
    method: 'POST',
    dataType: 'json',
    success: function (res) {
    console.log("成功")
    var msg = JSON.stringify(res.data)
    //弹出提示
    wx.showModal({
    title: "信息提示",
    content: msg,
    success (res) {
      if (res.confirm) {
        wx.redirectTo({
          url: '../book/confirm'  //目的页面url
        })
        console.log('用户点击确定')
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
  })
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

  cancel:function(){
    var that = this;
    var app_id = that.data.list[that.data.listindex].app_id
    //发送ajax请求到服务器
    wx.request({
    url: 'http://www.cuofengchuxing.top/app/off',//127.0.0.1:5000 www.cuofengchuxing.top
    data: {
      app_id: JSON.stringify(app_id),
    },
    header: {
    'content-type': 'application/x-www-form-urlencoded', // 默认值
    'chartset': 'utf-8'
  },
    method: 'POST',
    dataType: 'json',
    success: function (res) {
    console.log("成功")
    var msg = JSON.stringify(res.data)
    //弹出提示
    wx.showModal({
    title: "信息提示",
    content: msg,
    success (res) {
      if (res.confirm) {
        wx.redirectTo({
          url: '../book/confirm'  //目的页面url
        })
        console.log('用户点击确定')
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
    })
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady:function(){
      const that = this;
      wx.getLocation({
        type: 'wgs84',
        success(res) {
          that.setData({
            latitude : res.latitude,
            longitude : res.longitude
          })
        }
      })
    },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    var user_id = app.globalData.id
    wx.request({
    url: 'http://www.cuofengchuxing.top/app/confirm',//127.0.0.1:5000www.cuofengchuxing.top 
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

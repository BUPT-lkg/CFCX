var app = getApp()
Page({
  data: {
    //mapbgd: '../../image/mapbgd.png',
    list: [],
	//沙河校区经纬度
    latitude: 40.15698,
    longitude:116.289 ,
  },

  /**
  * 生命周期函数--监听页面初次渲染完成
  */
  onReady: function () {
  },
  /**
  * 生命周期函数--监听页面显示
  */
  onShow: function (options) {
    wx.request({
      url: 'http://www.cuofengchuxing.top/place/info',  //www.cuofengchuxing.top
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        console.log(res.data)
        this.setData({
         //第一个data为固定用法
          list: res.data ,
        })
        //在全局变量中，写入地点名
        app.globalData.place =[]
        app.globalData.p_open=[]
        app.globalData.p_close=[]
        const length = this.data.list.length
        for (let i = 0; i < length; ++i) {
          app.globalData.place=app.globalData.place.concat(this.data.list[i].place_name)
          app.globalData.p_open=app.globalData.p_open.concat(this.data.list[i].open_time)
          app.globalData.p_close=app.globalData.p_close.concat(this.data.list[i].close_time)
        }
        console.log(app.globalData.place,app.globalData.p_open,app.globalData.p_close)
      }
    })
  },
  getBook: function () {
    wx.navigateTo({
      url: '/pages/book/book'
    })
  },
  getplan: function () {
    wx.navigateTo({
      url: '/pages/plan/plan'
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
 onShareAppMessage() {
},


})
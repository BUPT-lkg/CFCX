// pages/book/book.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    calendar:[],
    currentIndex:0,
    times: '12:00',
    tstart: '08:00',
    tend: '22:00',
    objectArray: null,
    place: 0,
    date_time: null,
    place_id:0,
    user_id:null,
    list:null,
    listshow:null,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    function getThisMonthDays(year, month) {
      return new Date(year, month, 0).getDate();
    }
  // 计算每月第一天是星期几
    function getFirstDayOfWeek(year, month) {
      return new Date(Date.UTC(year, month - 1, 1)).getDay();
    }
    var date = new Date();
    const cur_year = date.getFullYear();
    var cur_month = date.getMonth() + 1;
    const cur_date=date.getDate();
    const weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];
    const hour = date.getHours()
    const minute = date.getMinutes()
    console.log(hour+':'+minute)
    function time_h_m(hour,minute){
      return hour+':'+minute
    }
    //利用构造函数创建对象
    function calendar(ton,date,week){
      if(ton==0){
        cur_month = cur_month-1+2;
        date = 1;
      }
      this.date=cur_year+'-'+cur_month+'-'+date;
      if(date==cur_date){
        this.week = "今天";
      }else{
        this.week = '星期' + week;
      }
    }
    //当前月份的天数
    var monthLength= getThisMonthDays(cur_year, cur_month)
    //当前月份的第一天是星期几
    var week = getFirstDayOfWeek(cur_year, cur_month)
    var x = week;
    var ton =1;
    for(var i=1;i<=monthLength-1+2;i++){
      //当循环完一周后，初始化再次循环
      if(x>6){
        x=0;
      }
      //利用构造函数创建对象
      if(i>monthLength){
        ton=0//下个月
        that.data.calendar[i] = new calendar(ton,i, [weeks_ch[x]][0])
      }else{
        ton=1 //这个月
        that.data.calendar[i] = new calendar(ton,i, [weeks_ch[x]][0])
      }
      x++;
    }
    //限制要渲染的日历数据天数为2天
    var flag = that.data.calendar.splice(cur_date, that.data.calendar.length - cur_date <= 2 ? that.data.calendar.length:2)
    that.setData({
      calendar: flag,
      objectArray: app.globalData.place,
      times : time_h_m(hour,minute)
    })
   console.log(that.data.calendar[1].date)
  },

  sendCmd: function () {
    var that = this;
    //请求的时候需要提交的参数
    var date = that.data.calendar[that.data.currentIndex].date
    var time = that.data.times+':00'
    var user_id= app.globalData.id
    var place = that.data.place-1+2
    // console.log("js中收到的用户名："+name+"，密码："+pwd)
    //发送ajax请求将用户注册信息传递过去进行注册
    console.log(that.data.calendar[that.data.currentIndex].date,"vv",that.data.times,"df",app.globalData.id,"dd",that.data.place)
    wx.request({
    url: 'http://www.cuofengchuxing.top/user/app',//http:/www.cuofengchuxing.top:9500/user/register
    data: {
    date: JSON.stringify(date),
    time: JSON.stringify(time),
    place_id: JSON.stringify(place),
    user_id: JSON.stringify(user_id),
    },
    header: {
    'content-type': 'application/x-www-form-urlencoded', // 默认值
    'chartset': 'utf-8'
    },
    method: "POST",
    dataType:"json",
    success: function (res) {
    //console.log("响应的数据"+res.data)
    wx.showModal({
     title: "信息提示",
     content: res.data,
     success (res) {
      if (res.confirm) {
        wx.redirectTo({
          url: '../book/book'  //目的页面url
        })
        console.log('用户点击确定')
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
     })
    },
    fail: function(res){
    wx:wx.showToast({
    title: '服务器网络错误,请稍后重试',
    icon: 'loading',
    duration: 1500,
    })
    },
    complete: function(res){
      
    }
    })
    },

  selectDay:function(event){
    //为上半部分的点击事件
    this.setData({
      currentIndex: event.currentTarget.dataset.index,
      listshow :event.currentTarget.dataset.index==0?this.data.list.today[this.data.place]:this.data.list.nextday[this.data.place],
      tstart:event.currentTarget.dataset.index==0?this.data.times:app.globalData.p_open[this.data.place],
      tend:app.globalData.p_close[this.data.place]
    })
    console.log(event.currentTarget.dataset.date)
  },

//  点击时间组件确定事件  
bindTimeChange: function (e) {
  this.setData({
    times: e.detail.value,
    tend:app.globalData.p_close[this.data.place]
  })
},
  //  点击地点组件确定事件  
  bindPickerChange: function (e) {
    console.log(e.detail.value)
   this.setData({
     place: e.detail.value,
     listshow: this.data.currentIndex==0?this.data.list.today[e.detail.value]:this.data.list.nextday[e.detail.value],
     tend:app.globalData.p_close[ e.detail.value]
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
  //根据日期和地点选择展示的现有预约人数
  onShow: function () {
    wx.request({
      url: 'http://www.cuofengchuxing.top/place/app',  //www.cuofengchuxing.top
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        console.log(res.data)
        this.setData({
          //第一个data为固定用法
          list: res.data ,
          listshow:this.data.currentIndex==0?res.data.today[this.data.place]:res.data.nextday[this.data.place],
          tstart:this.data.times
        })
         //显示预约人数
      }
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
  },
  
})
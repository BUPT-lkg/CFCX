// pages/login/login.js
const app = getApp()
Page({
  data: {
  username: "",
  password: "",
  userInfo: {},
  hasUserInfo: false,
  canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  usernameinput: function (e) {
  this.setData({
  username: e.detail.value
  })
  },
  passwordinput: function (e) {
  this.setData({
  password: e.detail.value
  })
  },
//点击登陆的时候触发的事件
login: function () {
  var that = this; //把this对象复制到临时变量that
  var name = that.data.username
  var pwd = that.data.password
  if (that.data.username == "") {
  wx.showModal({
  title: "信息提示",
  content: "用户名不能为空!"
  })
  } else if (that.data.password == "") {
  wx.showModal({
  title: "信息提示",
  content: "请输入密码!"
  })
  }else{
 //发送请求到服务器-登录
 wx.request({
	//开发者服务器接口地址
  url: 'http://www.cuofengchuxing.top/user/login',
  data: {	//要传到服务器的数据
    name: JSON.stringify(name), 
    pwd: JSON.stringify(pwd)
  },
  header: {
  'content-type': 'application/x-www-form-urlencoded', // 默认值
  'chartset': 'utf-8'
  },
  method: 'POST',  //HTTP 请求 POST
  dataType: 'json',//返回的数据为 JSON
  success: function (res) { //接口调用成功
    app.globalData.name = name  //给全局变量赋值
    app.globalData.id = res.data.id
    //把服务器返回的JSON数据赋给临时变量
   var status = JSON.stringify(res.data.status)
   var msg = JSON.stringify(res.data.msg)
   var credit = JSON.stringify(res.data.credit)
   app.globalData.usercredit = JSON.parse(credit)
   //弹出提示
   wx.showModal({
   title: "信息提示",
   content: msg
   })
   if (status == 1){
   //登录成功跳转到index页面
   wx.switchTab({ url: '../index/index', })
   }
   },
   fail: function (res) {//接口调用失败
   wx.showToast({
   title: '服务器网络错误,请稍后重试',
   icon: 'loading',
   duration: 1500
   })
  },
   //接口调用结束的回调函数（调用成功、失败都会执行）
   complete: function (res) {},
   })
  }
},
  //console.log("用户名：" + name + "密码：" + pwd)
  //console.log("成功")
  //console.log("返回的结果"+JSON.stringify(res.data.msg))
  //console.log("返回的结果" + JSON.stringify(res.data.status) +JSON.stringify(res.data.credit))
  //点击注册的时候触发的事件
  register: function() {
    wx.navigateTo({
      url: '../register/register'
    })
  },

  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  })  

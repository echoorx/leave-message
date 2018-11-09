var base64 = require("../../assets/images/base64")
const util = require('../../utils/util.js')
const baseUrl = require('../../utils/api.config.js').baseUrl
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    inputShowed: false,
    inputVal: "",
    msglist: [],
    cpage: 1,
    total: 0
  },
  //事件处理函数
  // bindViewTap: function() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  onLoad() {
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
    this.setData({
      icon20: base64.icon20,
      icon60: base64.icon60
    })
    // console.log(this, 'route')
    this.getList(this.route)
  },
  getUserInfo (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  showInput () {
    this.setData({
      inputShowed: true
    })
  },
  hideInput () {
    this.setData({
      inputVal: "",
      inputShowed: false
    })
  },
  clearInput () {
    this.setData({
      inputVal: ""
    })
  },
  inputTyping (e) {
    this.setData({
      inputVal: e.detail.value
    })
  },
  getList (cpage) {
    let _self = this
    var page = cpage || 1
    console.log(page)
    wx.request({
      url: baseUrl + 'getAllMsg',
      data: {
        page
      },
      success(res) {
        console.log(res.data)
        res.data.data.forEach((item) => {
          item.createdAt = util.myFormatTime(item.createdAt)
        })
        _self.setData({
          msglist: _self.data.msglist.concat(res.data.data),
          total: res.data.total
        })
      },

      
    })
  },
  loadMore () {
    this.setData({
      cpage: ++this.data.cpage
    })
    console.log(this.data.cpage,'this.data.cpage')
    this.getList(this.data.cpage)
  },
  onReady () {
    //获得dialog组件
    this.dialog = this.selectComponent("#dialog");
  },
  showDialog() {
    this.dialog.showDialog();
  },

  //取消事件
  _cancelEvent() {
    console.log('你点击了取消');
    this.dialog.hideDialog();
  },
  //确认事件
  _confirmEvent() {
    console.log('你点击了确定');
    this.dialog.hideDialog();
  },
  onReachBottom(){
    if (this.data.total > this.data.msglist.length){
      this.loadMore()
    }
  }
})

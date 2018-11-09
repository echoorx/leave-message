const baseUrl = require('../../utils/api.config.js').baseUrl

var app = getApp()
// pages/newmsg/newmsg.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTips: false,
    tips: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    // this.getCurrentPos()
    app.getLocationInfo(function (locationInfo) {
      console.log('map', locationInfo);
      that.setData({
        longitude: locationInfo.longitude,
        latitude: locationInfo.latitude,
        markers: [
          {
            id: 0,
            iconPath: "../../assets/images/ic_position.png",
            longitude: locationInfo.longitude,
            latitude: locationInfo.latitude
          }
        ]
      })
    })
  },

  bindFormSubmit (e) {
    var that = this
    console.log(e.detail.value)
    let data = e.detail.value
    data.userInfo = app.globalData.userInfo
    data.openid = app.globalData.userOS.openid
    console.log(data)
    wx.request({
      url: baseUrl + 'addMsg',
      method: 'post',
      data: e.detail.value,
      success (res) {
        console.log(res)
        wx.showToast({
          title: '已提交',
          icon: 'success',
          duration: 1000
        })
        console.log(e)
        that.setData({
          
        })
      }
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
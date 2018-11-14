const baseUrl = require('../../utils/api.config.js').baseUrl
const MsgCollection = require('../../controllers/msg.js')
const QQMapWX = require('../../libs/qqmap-wx-jssdk.min.js')
var app = getApp()
// pages/newmsg/newmsg.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTips: false,
    tips: '',
    address_component: {}
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

      var qqmapsdk = new QQMapWX({
        key: 'DDUBZ-UM564-37HUB-XZ46M-COPBF-5BBNU'
      })
      qqmapsdk.reverseGeocoder({
        location: {
          latitude: locationInfo.latitude,
          longitude: locationInfo.longitude
        },
        success: function (res) {
          console.log(res.result.address_component)
          that.setData({
            address_component: res.result.address_component
          })
        }
      })

    })
  },

  bindFormSubmit (e) {
    var that = this
    console.log(e.detail.value)
    let data = e.detail.value
    data.userInfo = app.globalData.userInfo
    data.createdAt = +new Date()
    data.address = that.address_component
    // data.openid = app.globalData.userOS.openid
    app.getLocationInfo(locationInfo => {
      data.location = {
        latitude: locationInfo.latitude,
        longitude: locationInfo.longitude
      }
      console.log(data, 'addMsg Data')
      MsgCollection.addMsg(data).then(res => {
        console.log(res)
        wx.showToast({
          title: '已提交',
          icon: 'success',
          duration: 1000
        })
      }).catch(err => {
        console.log(err, 'addMsg')
      })
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
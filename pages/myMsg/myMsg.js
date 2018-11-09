const baseUrl = require('../../utils/api.config.js').baseUrl;
const util = require('../../utils/util.js');
const app = getApp();
// pages/myMsg/myMsg.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    msglist: [],
    cpage: 1,
    total: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    this.getList()
  },

  getList(cpage) {
    let _self = this
    var page = cpage || 1
    wx.request({
      url: baseUrl + 'getMyMsg',
      data: {
        openid: app.globalData.userOS.openid,
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
      }
    })
  },
  loadMore() {
    this.setData({
      cpage: ++this.data.cpage
    })
    this.getList(this.data.cpage)
  },

  delFn(id){
    console.log(id,'123123123123123123123')
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
  onReachBottom () {
    if (this.data.total > this.data.msglist.length) {
      this.loadMore()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
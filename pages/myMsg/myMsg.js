const baseUrl = require('../../utils/api.config.js').baseUrl;
const util = require('../../utils/util.js');
const MsgControllers = require('../../controllers/msg.js')
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
    MsgControllers.getMsgTotal({
      _openid: app.globalData.userOS.openid
    }).then(total => {
      MsgControllers.getAllMsg({
        page
      }).then(res => {
        console.log(res.data)
        res.data.forEach((item) => {
          item.createdAt = util.myFormatTime(item.createdAt)
        })
        if (page == 1) {
          _self.setData({
            msglist: res.data,
            total: total.total
          })
        } else {
          _self.setData({
            msglist: _self.data.msglist.concat(res.data),
            total: total.total
          })
        }
      }).catch(err => {
        console.log(err, 'getAllMsg err')
      })
    }).catch(err => {
      console.log(err, 'getMsgTotal err')
    })
  },
  loadMore() {
    this.setData({
      cpage: ++this.data.cpage
    })
    this.getList(this.data.cpage)
  },

  delFn(e){
    var _self = this
    console.log(e.target.dataset.id)
    console.log('123123123123123123123')
    wx.showModal({
      title: '删除提示',
      content: '确定要删除这纸条吗',
      confirmText: "yes",
      cancelText: "no",
      success (res) {
        console.log(res)
        if (res.confirm) {
          _self.delMessage(e.target.dataset.id)
        } else {
          console.log('用户点击辅助操作')
        }
      }
    });
  },

  delMessage(id){
    var _self = this
    wx.request({
      url: baseUrl + 'delMyMsg',
      method: 'post',
      data: {
        id
      },
      success(res) {
        console.log(res.data)
        _self.getList()
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
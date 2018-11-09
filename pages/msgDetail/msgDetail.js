const baseUrl = require('../../utils/api.config.js').baseUrl;
const util = require('../../utils/util.js');
const app = getApp();
// pages/msgDetail/msgDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    toView: 'red',
    scrollTop: 100,
    msgObj: {},
    navList: [{
      label: '便签'
    },{
      label: '评论'
    }],
    bottomType: '便签',
    myComments: 'xxxxxxxx',
    comments:[],
    total: 0,
    commentsBox: false,
    cpage: 1
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDetail(options.id)
  },

  getDetail(id) {
    var that = this
    wx.request({
      url: baseUrl + 'getDetail',
      data: {
        id
      },
      success: function(res) {
        console.log(res,'getDetail')
        res.data.data[0].createdAt = util.myFormatTime(res.data.data[0].createdAt)
        that.setData({
          msgObj: res.data.data[0]
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  changeBottom(e){
    this.setData({
      bottomType: e.target.dataset.type,
      cpage: 1,
      comments: []
    })
    this.getComments()
  },
  showCommentsBox () {
    this.setData({
      commentsBox: !this.data.commentsBox
    })
  },
  addComments () {
    var _self = this
    let data = {
      msg_id: _self.data.msgObj._id,
      content: _self.data.myComments,
      openid: app.globalData.userOS.openid,
      userInfo: app.globalData.userInfo
    }
    console.log(data)
    wx.request({
      url: baseUrl + 'addComments',
      data,
      method: 'post',
      success: function (res) {
        console.log(res,123)
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  getComments(cpage) {
    var _self = this
    var page = cpage || 1
    wx.request({
      url: baseUrl + 'getComments',
      data: {
        msg_id: _self.data.msgObj._id,
        page
      },
      success: function(res) {
        console.log(res)
        _self.setData({
          comments: _self.data.comments.concat(res.data.data),
          total: res.data.total
        })
      },
      fail: function(res) {},
      complete: function(res) {},
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
    console.log(this.data.bottomType )
    if(this.data.bottomType == '评论'){
      this.setData({
        cpage: ++this.data.cpage
      })
      console.log(121231231231)
      this.getComments(this.data.cpage)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
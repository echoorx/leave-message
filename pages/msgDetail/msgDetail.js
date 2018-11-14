const baseUrl = require('../../utils/api.config.js').baseUrl;
const util = require('../../utils/util.js');
const MsgControllers = require('../../controllers/msg.js')
const CommentsControllers = require('../../controllers/comments.js')
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
    MsgControllers.getDetail(id).then(res => {
      console.log(res)
      res.data[0].createdAt = util.myFormatTime(res.data[0].createdAt)
      that.setData({
        msgObj: res.data[0]
      })
    }).catch(err => {
      console.log(err, 'getDetail err')
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
  addComments (comments) {
    var _self = this
    let data = {
      msg_id: _self.data.msgObj._id,
      content: comments,
      userInfo: app.globalData.userInfo,
      createdAt: +new Date()
    }
    console.log(data)
    CommentsControllers.addComments(data).then(res => {
      console.log(res)
      wx.showToast({
        title: '已提交',
        icon: 'success',
        duration: 1000
      })
    }).catch(err => {
      console.log(err, 'addComments')
    })
  },
  getComments(cpage) {
    var _self = this
    var page = cpage || 1
    let query = {
      msg_id: _self.data.msgObj._id
    }
    CommentsControllers.getCommentsCount(query).then(total => {
      query.page = cpage
      CommentsControllers.getAllComments(query).then( res => {
        console.log(res)
        res.data.forEach(item => {
          item.createdAt = util.myFormatTime(item.createdAt)
        })
        _self.setData({
          comments: _self.data.comments.concat(res.data),
          total: total.total
        })
      }).catch(err => {
        console.log(err, 'getAllComments err')
      })
    }).catch(err => {
      console.log(err, 'getCommentsCount err')
    })
  },
  formSubmit (e) {
    console.log(e.detail.value.c_content)
    this.addComments(e.detail.value.c_content)
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
const proApi = require('./utils/project.config.js')
var QQMapWX = require('./libs/qqmap-wx-jssdk.min.js');

//app.js
App({
  onLaunch: function () {
    wx.cloud.init({
      env: 'leave-a-message-8300cd'
    })
    this.globalData.qqmapsdk = new QQMapWX({
      key: 'DDUBZ-UM564-37HUB-XZ46M-COPBF-5BBNU'
      // AVABZ-EIPWP-7RTDK-L6UQ3-SHYET-V5B6V
    })
    
    var that = this
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)  
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res.code)
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session',
          data: {
            js_code: res.code,
            appid: proApi.appid,
            secret: proApi.secret,
            grant_type: proApi.grant_type
          },
          success (res) {
            that.globalData.userOS = res.data
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        } else {
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              wx.getUserInfo({
                success: res => {
                  // 可以将 res 发送给后台解码出 unionId
                  this.globalData.userInfo = res.userInfo

                  // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                  // 所以此处加入 callback 以防止这种情况
                  if (this.userInfoReadyCallback) {
                    this.userInfoReadyCallback(res)
                  }
                }
              })
            }
          })
        }
      },
      fail: function (res) {
        that.data.nickName = "未授权无法获取用户信息",
        that.setData({
          nickName: that.data.nickName
        })
        wx.showToast({
          title: '未授权无法获取用户信息',
          icon: 'error',
          duration: 1000
        })
      }
    })
  },
  getLocationInfo: function (cb) {
    var that = this;
    if (this.globalData.locationInfo) {
      cb(this.globalData.locationInfo)
    } else {
      wx.getLocation({
        type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
        altitude: true,
        success: function (res) {
          that.globalData.locationInfo = res;
          cb(that.globalData.locationInfo)
        },
        fail: function () {
          // fail
        },
        complete: function () {
          // complete
        }
      })
    }
  },
  globalData: {
    userInfo: null,
    locationInfo: null
  }
})
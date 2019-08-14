//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    list: '',
    word: '',
    message: '',
    avatarUrl: null,
    imgUrls: [{ url: '../image/doctor1.jpg' },
    { url: '../image/doctor2.jpg' },
    { url: '../image/doctor3.jpg' },
    { url: '../image/doctor4.jpg' }],
    autoplay: true,
    interval: 3000,
    duration: 1200,
    src: '',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  gotoPage: function (e) {
    wx.navigateTo({
      url: '../index/main'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
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
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  /**
  * 打开本地视频
  */
  bindButtonTap: function () {
    var that = this
    //拍摄视频或从手机相册中选视频
    wx.chooseVideo({
      //album 从相册选视频，camera 使用相机拍摄，默认为：['album', 'camera']
      sourceType: ['album', 'camera'],
      //拍摄视频最长拍摄时间，单位秒。最长支持60秒
      maxDuration: 60,
      //前置或者后置摄像头，默认为前后都有，即：['front', 'back']
      camera: ['front', 'back'],
      //接口调用成功，返回视频文件的临时文件路径，详见返回参数说明
      success: function (res) {
        console.log(res.tempFilePaths[0])
        that.setData({
          src: res.tempFilePaths[0]
        })
      }
    })
  },
  /**
   * 当发生错误时触发error事件，event.detail = {errMsg: 'something wrong'}
   */
  videoErrorCallback: function (e) {
    console.log('视频错误信息:')
    console.log(e.detail.errMsg)
  },

  houduanButton1: function () {
    var that = this;
    wx.request({
      url: 'http://localhost:8081/cxjggl/getUser',
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)//打印到控制台
        var list = res.data.list;
        if (list == null) {
          var toastText = '数据获取失败';
          wx.showToast({
            title: toastText,
            icon: '',
            duration: 2000
          });
        } else {
          that.setData({
            list: list
          })
        }
      }
    })
  },

  houduanTab_input: function (e) {
    this.setData({
      word: e.detail.value
    })
  },
  // houduanButton2的网络请求
  houduanButton2: function () {
    var that = this;
    wx.request({
      url: 'http://localhost:8081/cxjggl/getWord',
      data: {
        word: that.data.word
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)//打印到控制台
        var message = res.data.message;
        if (message == null) {
          var toastText = '数据获取失败';
          wx.showToast({
            title: toastText,
            icon: '',
            duration: 2000
          });
        } else {
          that.setData({
            message: message
          })
        }
      }
    })
  }


})

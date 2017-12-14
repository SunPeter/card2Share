//index.js
var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    userInfo: {}
  },
  //事件处理函数
  formSubmit: function() {
      util.request({
          method: "POST",
          data: this.data.userInfo,
          url: "https://sunshengda.com/user/sign"
      }).then(data => {
          console.log(data);
      })
  },
  bindPhone: function(e) {
      Object.assign(this.data.userInfo, {
          phone: e.detail.value
      })
      this.setData({
          userInfo: this.data.userInfo
      })
  },
  onLoad: function () {
    let self = this
    let userInfo = app.globalData.userInfo
    if (!userInfo) {
      console.error('获取微信用户信息失败');return
    }
    util.getUserInfo().then(res => {
      self.setData({
        userInfo: Object.assign(userInfo, res.userInfo)
      })
    })
  }
})

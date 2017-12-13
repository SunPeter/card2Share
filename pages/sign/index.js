//index.js
var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    userInfo: {}
  },
  //事件处理函数
  formSubmit: function() {
      console.log(this.data.userInfo);
      wx.setStorageSync('test', JSON.stringify(this.data.userInfo))
      util.request({
          method: "GET",
          url: "https://sunshengda.com"
      }).then(data => {
          console.log(data);
      })
  },
  bindPhoneInput: function(e) {
      Object.assign(this.data.userInfo, {
          phone: e.detail.value
      })
      this.setData({
          userInfo: this.data.userInfo
      })
  },
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})

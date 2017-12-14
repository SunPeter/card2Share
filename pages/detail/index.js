//logs.js
let util = require('../../utils/util.js')
let app = getApp()
Page({
  data: {
    typeList: ['快递', '小吃', '生活用品'],
    accept: false,
    task: {
      type: 0,
      des: {name: ''},
      origin: {name: ''}
    }
  },
  onLoad: function (option) {
    wx.showLoading({
      title: "努力获取数据中"
    })
    let id = option.id
    util.request({
      url: `https://sunshengda.com/task/${id}`
    }).then(res => {
      wx.hideLoading()
      this.setData({
        accept: !!res.helper,
        task: res
      })
    })
  },
  acceptTask: function() {
    let task = this.data.task
    let userInfo = app.globalData.userInfo
    if (!userInfo || !userInfo.openid) {
      wx.showToast({
        title: '登录异常',
        icon: 'fail',
        duration: 2000
      })
      return
    }

    util.request({
      url: `https://sunshengda.com/task/${task._id}`,
      data: {
        helper: userInfo.openid
      },
      method: "PUT",
      dataType: "JSON"
    }).then((res) => {
      wx.showToast({
        title: '已接收，如有疑问，可联系发布人确认',
        icon: 'success',
        duration: 2000
      })
    }, (err) => {
      wx.showToast({
        title: '接收失败',
        icon: 'fail',
        duration: 2000
      })
    })
  },
  callPublisher: function (e) {
    let task = this.data.task
    let phone  = task.publisher.phone
    wx.makePhoneCall({
      phoneNumber: phone
    })
  }
})

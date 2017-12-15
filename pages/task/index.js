//logs.js
let util = require('../../utils/util.js')
let app = getApp()
Page({
  data: {
    typeList: ['快递', '小吃', '生活用品'],
    task: {
      type: 0,
      des: {name: ''},
      origin: {name: ''}
    }
  },
  onLoad: function () {

  },
  bindTitle: function(e) {
    let task = this.data.task
    task.title = e.detail.value
    this.setData({
        task
    })
  },
  bindDesciption: function(e) {
    let task = this.data.task
    task.description = e.detail.value
    this.setData({
        task
    })
  },
  selectDes: function() {
    let task = this.data.task
    util.chooseLocation().then(data => {
      delete data.errMsg
      task.des = data
      this.setData({
        task
      })
    })
  },
  bindDesInput: function(e) {
    let task = this.data.task
    Object.assign(task.des, {name: e.detail.value})
    this.setData({
      task
    })
  },
  selectOrigin: function() {
    util.chooseLocation().then(data => {
      delete data.errMsg
      let task = this.data.task
      task.origin = data
      this.setData({
        task
      })
    })
  },
  bindOriginInput: function(e) {
    let task = this.data.task
    Object.assign(task.origin, {name: e.detail.value})
    this.setData({
      task
    })
  },
  bindTypeChange: function(e) {
    let task = this.data.task
    task.type = parseInt(e.detail.value, 10)
    this.setData({task: task})
  },
  rewardChange: function(e) {
    let task = this.data.task
    task.coin = parseInt(e.detail.value, 10)
    this.setData({task})
  },
  expireChange: function(e) {
    let task = this.data.task
    task.expire = parseInt(e.detail.value, 10)
    this.setData({task})
  },
  createTask: function() {
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
    task.openid = userInfo.openid
    util.request({
      url: "https://sunshengda.com/task",
      data: task,
      method: "POST",
      dataType: "JSON"
    }).then((res) => {
      wx.showToast({
        title: '发布成功',
        icon: 'success',
        duration: 2000,
        complete: () => {
          wx.redirectTo({
            url: '../list/index'
          })
        }
      })
    }, (err) => {
      wx.showToast({
        title: '发布失败',
        icon: 'fail',
        duration: 2000
      })
    })
  }
})

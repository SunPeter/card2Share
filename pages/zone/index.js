//index.js
var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    tabs: ["给予的帮助", "发出的帮助"],
    type: ['package', 'rice', 'shopping'],
    activeIndex: 0,
    list: []
  },
  fetchTask: function(params) {
    return util.request({
        url: "https://sunshengda.com/task",
        data: params
    })
  },
  tabClick: function (e) {
    let index = parseInt(e.currentTarget.id, 10)
    if (index === 0) {
      this.fetchTask({
        helper: this.data.userInfo._id
      }).then(list => {
        this.setData({
          list,
          activeIndex: index
        })
      })
    } else if (index === 1) {
      this.fetchTask({
        publisher: this.data.userInfo._id
      }).then(list => {
        this.setData({
          list,
          activeIndex: index
        })
      })
    }
  },
  onLoad: function () {
    let userInfo = app.globalData.userInfo
    this.fetchTask({
      helper: userInfo._id
    }).then(list => {
      this.setData({
        list,
        userInfo
      })
    })
  }
})


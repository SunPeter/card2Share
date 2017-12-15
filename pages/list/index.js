//index.js
var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    tabs: ["距离最近", "奖励最多"],
    type: ['package', 'rice', 'shopping'],
    activeIndex: 0,
    list: []
  },
  displayDistance: function (distance) {
    if (distance / 1000 >= 1) {
      distance = `${(distance / 1000).toFixed(2)}km`
    } else {
      distance = `${distance.toFixed(0)}m`
    }
    return distance
  },
  fetchTaskByGeo: function() {
    let self = this
    return util.getLocation().then(res => {
      return util.request({
        url: "https://sunshengda.com/task/nearby",
        data: {
          lat: res.lat,
          lng: res.lng
        }
      }).then(res => {
        return res.map(task => {
          task.distance = self.displayDistance(task.distance)
          return task
        })
      })
    })
  },
  fetchTaskByCoin: function() {
    return util.request({
        url: "https://sunshengda.com/task",
        data: {
          order: 'desc',
          field: 'coin'
        }
    })
  },
  tabClick: function (e) {
    let index = parseInt(e.currentTarget.id, 10)
    if (index === 0) {
      this.fetchTaskByGeo().then(list => {
        this.setData({
          list,
          activeIndex: index
        })
      })
    } else if (index === 1) {
      this.fetchTaskByCoin().then(list => {
        this.setData({
          list,
          activeIndex: index
        })
      })
    }
  },
  onLoad: function () {
    this.fetchTaskByGeo().then(list => {
      this.setData({
        list,
        userInfo: app.globalData.userInfo
      })
    })
  }
})


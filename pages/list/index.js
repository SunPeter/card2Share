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
  onLoad: function () {
    let self = this
    util.getLocation().then(res => {
      let lat = res.lat, lng = res.lng
      util.request({
        url: "https://sunshengda.com/task/nearby",
        data: {
          lat,
          lng
        }
      }).then(res => {
        this.setData({
          list: res.map(task => {
            task.distance = self.displayDistance(task.distance)
            return task
          })
        })
      })
    })
  }
})


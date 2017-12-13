//index.js
let util = require('../../utils/util.js')
let app = getApp()
Page({
    onLoad: function() {
        util.login().then((res) => {
          let code = res.code
          util.request({
            url: 'https://sunshengda.com/user/login',
            data: {
              code: code
            }
          }).then(res => {
            if (res) {
              app.globalData.userInfo = res
              wx.redirectTo({
                url: '../task/index'
              })
            } else {
              wx.redirectTo({
                url: '../sign/index'
              })
            }
          }, err => {
            console.error(err)
          })
        })
    }
})
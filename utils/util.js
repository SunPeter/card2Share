/**
 *  @params Object: {
    method: GET/POST/DELETE,
    url: String,
    data: String,
    header: Object,
    success: Function(Object),
    fail: Function(Object),
}
 */
function request(params) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: params.url,
      data: params.data,
      method: params.method || "GET",
      header: params.header || {
        'content-type': 'application/json'
      },
      dataType: params.dataType || "json",
      success: function (res) {
        resolve(res.data)
      },
      fali: function(err) {
          reject(err)
      }
    })
  })
}


/**
 *  get current location
 *  @params {tpye}
 *  @return Promise contains lng and lat
 */
function getLocation(type = 'wgs84'){
  return new Promise(resolve => {
    wx.getLocation({
      type: type,
      success: (res) => {
        var latitude = res.latitude // 经度
        var longitude = res.longitude // 纬度
        resolve({
          lat: latitude,
          lng: longitude
        })
      }
    })
  })
}

/**
 *  choose location
 *  @params none
 *  @Promise contains name and address
 */
function chooseLocation() {
    return new Promise((resolve, reject)=> {
        wx.chooseLocation({
          success: res => resolve(res),
          fali: err => reject(err)
        })
    })
}

/**
 *  get User Info
 *
 */
function getUserInfo() {
    return new Promise((resolve, reject) => {
        wx.getUserInfo({
          success: res => resolve(res),
          fali: err => reject(err)
        })
    })
}

/**
 *  WeChat Login
 */
 function login() {
     return new Promise((resolve, reject) =>{
         wx.login({
           success: (res) => resolve(res),
            fail: () => reject()
         })
     })
}

/**
 *  WeChat checkSession
 */
 function checkSession() {
     return new Promise((resolve, reject) => {
         wx.checkSession({
           success: (res) => resolve(res),
           fail: (err) => reject(err)
         })
     })
 }

module.exports = {
  request,
  getLocation,
  chooseLocation,
  getUserInfo,
  login,
  checkSession,
}

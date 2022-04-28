// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null,
    host: 'https://lhwater.dg88888888.com',
  },
  wxRequest: function(url, data, successCB, type) {
    var that = this;
    var requestUrl = that.globalData.host + '/user_api/' + url;
    var requestMethod = type ? type : 'POST';
    var requestConType = 'application/x-www-form-urlencoded';
    // if (that.fm.gain('token') && !data.shop_token) data.token = that.fm.gain('token');
    if (typeof url != 'string') {
      requestUrl = url.url;
      requestMethod = url.method;
      requestConType = url.conType;
    }
    wx.request({
      url: requestUrl,
      header: {
        'content-type': requestConType
      },
      data: data,
      method: requestMethod,
      success: function(res) {
        if (res.data.code == -5) {
          console.log('用户未授权登录');
        } else if (res.data.code == -101) {
          console.log(res.data.code);
        } else {
          typeof successCB == "function" && successCB(res);
        }
      },
      fail: function(err) {
        console.log(err);
      }
    })
  },

})

App({
  onLaunch: function () {
    const loginUtil = require('./utils/loginUtil')
    // 头条小程序登录
    loginUtil.loginInit()
  }
})

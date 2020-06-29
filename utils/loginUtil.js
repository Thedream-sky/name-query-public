function loginInit(){
     // 引入 SDK
     require('../libs/sdk-bytedance.3.12.0.js')
     const appConfig = require('./appConfig');
     // 初始化 SDK
     tt.BaaS.init(appConfig.USER_ID)
     tt.BaaS.auth.loginWithTt().then(user => {
        // 登录成功
        console.log('登录成功', user)
      }, err => {
        // 登录失败
        console.log(err)
      }) 
}

module.exports = {
  loginInit: loginInit,
}
const storgeUtil  = require('./storgeUtil')
// 从服务器获取token
function getToken(callback){
  tt.BaaS.invoke('getToken', {}).then(res => {
    if (res.code === 0) {
      // success
      console.log('打印成功', res)
      let access_token = res.data.access_token
      storgeUtil.setStorage({
        key: 'token',
        value: {
          access_token: access_token,
          expires_in: res.data.expires_in,
          token_timetemp: new Date().getTime()
        },
        success: (res)=>{
          // 成功使用回调
          callback(access_token)
        },
        fail: ()=>{
          console.log('保存失败')
        }
      })
    } else {
      // fail
      console.log('请求失败', res.error.message)
    }
  }, err => {
    // HError 对象
    //callback(err)
    console.log('token请求失败')
  })
}

// 从缓存中获取token
function getTokenFromStroge(callback){
  storgeUtil.getStorage({
    key: 'token',
    success: (res)=>{
      if(5*60* 1000+res.data.token_timetemp>= new Date().getTime()){
        // 没有超时
        console.log('token没有超时');
        callback(res.data.access_token)
      }else{
        // token超时
        console.log('token超时');
        getToken(callback)
      }
    },
    fail: (err)=>{
      // 直接从服务器获取
      console.log('token不存在，初始请求');
      getToken(callback)
    }
  })
}

module.exports = {
  getTokenFromStroge: getTokenFromStroge,
  getToken: getToken
}
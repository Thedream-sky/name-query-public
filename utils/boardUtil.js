const config = require('./appConfig')
const toastUtil = require('./toastUtil')
const versionUtil = require('./versionUtil');

// 打开广告
function openBoard(callback){
  try {
      var res = tt.getSystemInfoSync()
      // 判断抖音平台
      if (res.appName.toUpperCase() === 'DOUYIN') {
        if(versionUtil.versionStringCompare(res.version, '10.3')>=0 && res.platform === 'android'){
          openBoardDouyin(callback)
        }else if(versionUtil.versionStringCompare(res.version, '10.7')>=0 && res.platform === 'ios'){
          openBoardDouyin(callback)
        }else{
          toastUtil.showToast('抖音版本太低')
          // 其他平台直接处理结果
          callback({isEnded: true})
        }
      }else{
        toastUtil.showToast('放你一马!')
        // 其他平台直接处理结果
        callback({isEnded: true})
      }
    } catch (error) {
      console.log(`获取系统信息失败`+error)
    }
}

// 打开广告
function openBoardDouyin(callback){
    // 加载提示框
    toastUtil.showLoading('广告加载中..')
    // 广告实例
    const videoAd = tt.createRewardedVideoAd({adUnitId: config.BOARD_ID});
    try{
      if(videoAd.closeFunc){
        videoAd.offClose(videoAd.closeFunc);
      }
    }catch(e){
      console.log(e)
    }
    videoAd.closeFunc = callback;
    // 关闭窗口的监听事件
    videoAd.onClose(videoAd.closeFunc);

    videoAd
    .show()
    .then(() => {      
      console.log("广告显示成功");
      //关闭加载框
      tt.hideLoading()
    }).catch(err => {
      // 失败重试
      videoAd.load()
        .then(() => {
          console.log("广告手动加载成功");
          videoAd.show()
          //关闭加载框
          tt.hideLoading()
        })
        .catch(err => {
            console.log('激励视频 广告显示失败')
            toastUtil.showToast('广告创建失败')
        })
    })
}


module.exports = {
  openBoard: openBoard
}

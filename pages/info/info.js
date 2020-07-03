// pages/info/info.js
const toastUtil = require('../../utils/toastUtil')
const boardUtil = require('../../utils/boardUtil')
const shareUtil = require('../../utils/shareUtil')


Page({
  data: {
    info: {},
    yourName: '',
    hisName: '',
    locked: true,
  },
  onLoad: function (options) {
    // 显示分享按钮
    shareUtil.showShareIcon()
    const matchUtil = require('../../utils/matchUtil');  
    this.setData({
      info: matchUtil.getMatchInfo(options.dsc),
      yourName: options.yourName,
      hisName: options.hisName
    })
  },
  onShareAppMessage (option) {
    // option.from === 'button'
    return {
      title: '超准的姓名测试',
      path: '/pages/index/index', // ?后面的参数会在转发页面打开时传入onLoad方法
      templateId: '1acp3dmk1meb2olut2',
      success () {
        console.log('转发发布器已调起，并不意味着用户转发成功，微头条不提供这个时机的回调');
      },
      fail () {
        console.log('转发发布器调起失败');
      }
    }
  },
  // 动画
  animate: function(){
     console.log("createNewAnimation");
     if(!this.animation){
      // 创建一个默认动画组执行时间为1秒的动画
      var animation = tt.createAnimation({
        duration: 500,
        timingFunction: "cubic-bezier(0.1, 0.5, 0.1, 0.1)"
      });
      this.animation = animation;
     }
      // 创建一个动画组，使用默认设置
      this.animation.scale(1.1).step();
      this.animation.scale(0.9).step();
      // 应用第1个动画组
      this.setData({
        animationData: this.animation.export()
      });
  },
  onReady: function(){
    this.interval = setInterval(this.animate, 200)
  },
  onUnload: function(){
    clearInterval(this.interval);
  },
  countChange: function(){
    const array = [10, 0, 30, 100, 80, 50, 20, 70, 40, 90]
    setTimeout(()=>{
      
    })
  },
  // 关闭广告
  closeBoard: function(res){
    if (res.isEnded) {
      this.setData({
        locked: false
      })
    }
  },
  // 解锁
  unLock: function(){
    boardUtil.openBoard(this.closeBoard)
  },
  // 再测一次
  testAgain: function(){
    // 页面跳转
    tt.redirectTo({
      url: `/pages/index/index`,
      success(res) {
        console.log(`${res}`);
      },
      fail(res) {
        console.log(`navigateTo调用失败`, res);
      }
    });
  }
})
// pages/info/info.js
const toastUtil = require('../../utils/toastUtil')
const boardUtil = require('../../utils/boardUtil')

Page({
  data: {
    info: {},
    yourName: '',
    hisName: '',
    locked: true,
  },
  onLoad: function (options) {
    const matchUtil = require('../../utils/matchUtil');  
    this.setData({
      info: matchUtil.getMatchInfo(options.dsc),
      yourName: options.yourName,
      hisName: options.hisName
    })
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
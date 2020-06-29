const app = getApp()
const appConfig = require('../../utils/appConfig')
const toastUtil = require('../../utils/toastUtil')
const boardUtil = require('../../utils/boardUtil')
const tableUtil = require('../../utils/tableUtil')
Page({
  data: {
    yourName: '',
    hisName: '',
  },
  // 动画
  animate: function(){
      // console.log("createNewAnimation");
      // 创建一个默认动画组执行时间为1秒的动画
     if(!this.animation){
      // 创建一个默认动画组执行时间为1秒的动画
      var animation = tt.createAnimation({
        duration: 400,
        timingFunction: "cubic-bezier(0.1, 0.4, 0.1, 0.1)"
      });
      this.animation = animation;
     }
      // 创建一个动画组，使用默认设置
      this.animation.scale(1.1).step();
      this.animation.scale(0.9).step();
      this.setData({
        animationData: this.animation.export()
      });
  },
  onReady: function(){
    this.interval = setInterval(this.animate, 500)
  },
  onUnload: function(){
    if(this.interval){
      clearInterval(this.interval)
    }
  },
  // 表单输入监听
  inputChange: function(event){
    let value = event.detail.value.trim().slice(0,6);
    let id = event.target.id
    let pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？%+_]")
    // 赋值
    this.setData({
      // 去除特殊字符
      [id]: value.replace(pattern, '')
    })
  },
  // 检查名称
  checkName: function(){
    let data = this.data
    if(!(data.yourName&&data.hisName)){
      toastUtil.showToast('名字不能为空')
      return false
    }
    // if(!(/[\u4e00-\u9fa5]/.test(data.yourName)&&/[\u4e00-\u9fa5]/.test(data.hisName))){
    //   toastUtil.showToast('名字只能是中文')
    //   return false
    // }
    return true
  },
  // 提交按钮
  summitTap: function(){
    // 检查不通过
    if(!this.checkName()){
      return ;
    }
    const {yourName, hisName} = this.data;
    
    // 插入查询数据
    tableUtil.insertTable({
      tableName: appConfig.QUERY_TABLE,
      insertInfo: {
        yourName,
        hisName
      },
      callback: this.openRewardedVideoAd
    })
  },
  // 打开广告
  openRewardedVideoAd: function(){
    boardUtil.openBoard(this.closeBoard)
  },
  // 关闭广告
  closeBoard: function(res){
    if (res.isEnded) {
      // 给予奖励
      this.submitSuccess();
    }
  },
  // 广告成功后的回调函数
  submitSuccess: function(){
    const cnchar = require('../../utils/cnchar')
    // 提交跳转
    let data = this.data
    let dsc = this.compare(cnchar.stroke(data.yourName), cnchar.stroke(data.hisName))
    console.log('^^^^', cnchar.stroke(data.yourName), cnchar.stroke(data.hisName));
    // 页面跳转
    tt.redirectTo({
      url: `/pages/info/info?dsc=${dsc}&yourName=${data.yourName}&hisName=${data.hisName}`,
      success(res) {
        console.log(`${res}`);
      },
      fail(res) {
        console.log(`navigateTo调用失败`, res);
      }
    });
  },
  compare: function(a, b){
    if(a>=b){
      return a - b
    }else{
      return b-a
    }
  }
})

const app = getApp()
const appConfig = require('../../utils/appConfig')
const toastUtil = require('../../utils/toastUtil')
const boardUtil = require('../../utils/boardUtil')
const tableUtil = require('../../utils/tableUtil')
const tokenUtil = require('../../utils/getToken')
const lodash = require('../../utils/lodash')
const shareUtil = require('../../utils/shareUtil')


const yunFunctionTool = require('../../utils/yunFunctions');
Page({
  data: {
    yourName: '',
    hisName: '',
    systemAppName: ''
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
  onShareAppMessage (option) {
    // 菜单栏点击分享
    if(option.from === 'button' && option.channel === 'video'){
       return {
          extra: {
          	// 注意，只有小程序使用button组件触发分享时，会有target属性
            videoPath : '',
            videoTopics: ['姓名测试', '测试'],
            withVideoId: true
          },
          success(res){
            debugger
          },
          fail(err){
            console.log(err);
            debugger
          }
        }
    }else{
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
    }
  },
  onLoad: function(){
    shareUtil.showShareIcon()
    this.setData({
      systemAppName: tt.getSystemInfoSync().appName.toUpperCase()
    })
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
    setTimeout(()=>{
      // 赋值
      this.setData({
        // 去除特殊字符
        [id]: value.replace(pattern, '')
      })
    },0)
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
    const {yourName, hisName} = this.data;   
    // 检查不通过
    if(!this.checkName()){
      return ;
    }
    // 获取token
    tokenUtil.getTokenFromStroge(token=>{
       // 检查输入内容 
       yunFunctionTool.yunFunction({
          funcName: 'checkTextLegal',
          params: {
            XToken: token,
            checkTexts: [yourName, hisName]
          },
          success: (res)=>{
            console.log('****', res)
            if (res.code === 0) {
                if(res.data.data.every(item => item.predicts[0].prob !== 1)){
                  console.log('输入内容没有违规');
                  // 插入查询数据
                  tableUtil.insertTable({
                    tableName: appConfig.QUERY_TABLE,
                    insertInfo: {
                      yourName,
                      hisName
                    },
                    callback: this.openRewardedVideoAd
                  })
                }else{
                  toastUtil.showToast('输入名字有违规')
                }
            } else {
              if(res.code === 401){
                 // 直接刷新
                 tokenUtil.getToken(()=>{
                   console.log('获取新的token')
                 })
              }
              console.log(res)
              // callback(result.error.message)
            }
          },
          fail: (err)=>{
            console.log(err)
          }
      })
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

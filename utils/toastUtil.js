// 显示提示弹框
function showToast(message){
  tt.showToast({
      title: message,
      duration: 2000,
      success(res) {
        console.log(`${res}`)
      },
      fail(res) {
        console.log(`showToast调用失败`)
      }
  });
}

// 加载loading
function showLoading(message){
   tt.showLoading({
      title: message,
      success(res) {
        console.log(`${res}`);
      },
      fail(res) {
        console.log(`showLoading调用失败`);
      }
    });
}

// 关闭加载框
function closeLoading(){
  tt.hideLoading({
    success(res) {
      console.log(`${res}`);
    },
    fail(res) {
      console.log(`hideLoading调用失败`);
    }
  });
}

module.exports = {
  showToast: showToast,
  showLoading: showLoading,
  closeLoading: closeLoading
}

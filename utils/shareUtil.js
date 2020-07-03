function showShareIcon(){
  tt.showShareMenu({
    success(res) {
      console.log(`showShareMenu 调用成功`);
    },
    fail(res) {
      console.log(`showShareMenu 调用失败`);
    },
  });
}

module.exports = {
  showShareIcon: showShareIcon
}
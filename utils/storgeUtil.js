// 设置值 key 关键字、value 值
function setStorage({key, value, success, fail}){
  tt.setStorage({
    key: key,
    data: value,
    success(res) {
      console.log(`setStorage添加成功`);
      success(res)
    },
    fail(res) {
      console.log(`setStorage调用失败`);
      fail(res)
    },
  });
}
// 获取结果 key 关键字、callback 获取成功的回调函数
function getStorage({key, success, fail}){
  tt.getStorage({
    key: key,
    success(res) {
      // 执行回调
      success(res)
      console.log(`getStorage调用成功`);
    },
    fail(res) {
      fail(res)
      console.log(`getStorage调用失败`);
    },
  });
}

// 删除缓存 key 关键字、callback 删除成功的回调
function removeStorage({key, success, fail}){
  tt.removeStorage({
    key: key,
    success(res) {
      success(res)
      console.log(`removeStorage调用成功`);
    },
    fail(res) {
      fail(res)
      console.log(`removeStorage调用失败`);
    },
  });
}

module.exports = {
  setStorage: setStorage,
  getStorage: getStorage,
  removeStorage: removeStorage
}
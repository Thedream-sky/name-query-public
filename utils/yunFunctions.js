/** 云函数 */
function yunFunction({funcName, params, success, fail}){ 
  tt.BaaS.invoke(funcName, {...params}).then(res=>{
    success(res)
  }).catch(err=>{
    fail(err)
  })
}

module.exports={
  yunFunction: yunFunction
}
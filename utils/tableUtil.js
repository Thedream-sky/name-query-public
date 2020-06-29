/** params tableName 表名、callback 插入成功回调、insertInfo 插入的数据  */
function insertTable(params){
    const { tableName, callback, insertInfo } = params;
    
    let Table = new tt.BaaS.TableObject(tableName) //实例化对应 tableName 的数据表对象
    let table = Table.create() // 创建一条记录
    // 插入数据
    table.set({...insertInfo})
      .save()
      .then(() => {
        callback();
      })
      .catch((e)=>{
        console.log('创建表'+tableName+'失败',e)
        // 失败了回调还得继续执行
        callback();
      })
 
}

module.exports = {
  insertTable: insertTable
}
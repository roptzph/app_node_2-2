const mysql = require('mysql')
const Promise = require('promise')
const { mysql_config } = require('../config/db.js') 


const conn = mysql.createConnection(mysql_config) 
//测试连接
conn.connect( err => {
   console.log(err?`sql连接失败: --------${err}--------`:"-------sql连接成功！--------")
  // if (err) {
  //   console.log('连接sql失败：',err)
  // }else{
  //   console.log('SQL连接成功！')
  // }
}) //一定要！预连接的益处是能在后台显示连接各种错误的信息

function execSQL(sql){
  const promise = new Promise((resolve,reject) => {
    conn.query(sql,(err,result) => {
      if (err) {
        reject(err)
        return
      }
      resolve(result)
    })
  })
    return promise
}

//exports.execSQL = execSQL
exports.execSQL = execSQL
  

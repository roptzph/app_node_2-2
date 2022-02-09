const mysql = require('mysql')

var mysql_config =({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '123456',
    database: 'vue'
    //useConnectionPooling: true
    
})

function handleDisconnection() {
    var dbServer = mysql.createConnection(mysql_config)
   dbServer.connect
  
    dbServer.on('error', function (err) {
       console.log('db error', err)
       if (err.code === 'PROTOCOL_CONNECTION_LOST') {
         console.log('db error执行重连:' + err.message)
         handleDisconnection()
       } else {
         throw err
       }
     })
  
    return dbServer //返回一个connection对象，用于调用它的其他方法
  
    exports.dbServer = dbServer
  
  }
  
  exports.handleDisconnection = handleDisconnection
const mysql = require('mysql')

var mysql_config =({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '123456',
    database: 'vue'
   
})

function handleDisconnection() {
    var dbServer = mysql.createConnection(mysql_config)
    return dbServer //返回一个connection对象，用于调用它的其他方法
    exports.dbServer = dbServer
  
  }
  
  exports.handleDisconnection = handleDisconnection
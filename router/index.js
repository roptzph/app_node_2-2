const express = require('express')
const { execSQL } = require('../db/mysql.js')

const router = express.Router()

router.get('/getstaff', (req, res) => {
    let sql = 'SELECT * FROM staff'
    execSQL(sql).then(result => {
      //console.log('result',result)
      res.send(result)  //发送查到的数据给前端
    })
})



module.exports = router
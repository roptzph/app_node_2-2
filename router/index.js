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
//新增用户
router.post('/poststaff', (req, res) => {
    //let sql = "INSERT INTO staff( id, name, sex, birthday, other, age, poid) VALUES (1, '朱先生4', '男', '2020-05-05', '12', 4, 2)"
    let sql = `INSERT INTO staff(id, name, sex, birthday, other, age, poid)
       VALUES(
        '${req.body.id}',
        '${req.body.name}', 
        '${req.body.sex}',
        '${req.body.birthday}',
        '${req.body.other}',
        '${req.body.age}',
        '${req.body.poid}') `
      console.log(sql)
    //let sql = 'select 1'
    execSQL(sql).then(result => {
      console.log(req.body.name,req.body.age)
      res.send(result)  //发送查到的数据给前端
    })
})
//删除用户
router.post('/delstaff', (req, res) => {
    //let id = req.query.id
    //let id = req.params.id
    let id = req.body.id
    //let id = 90
    //let sql = "INSERT INTO staff( id, name, sex, birthday, other, age, poid) VALUES (1, '朱先生4', '男', '2020-05-05', '12', 4, 2)"
    let sql = `delete from staff where  id = '${id}'` //'${req.params.id}'`
        
      console.log(sql)
    //let sql = 'select 1'
    execSQL(sql).then(result => {
      res.send(result)  //发送查到的数据给前端
    })
})
//修改数据

//多条件查询



module.exports = router
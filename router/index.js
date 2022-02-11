const express = require('express')
const req = require('express/lib/request')
const { execSQL } = require('../db/mysql.js')

const router = express.Router()

//查询全部
router.get('/getstaff', (req, res) => {
    let sql = 'SELECT * FROM staff'
    execSQL(sql).then(result => {
      res.send(result)  //发送查到的数据给前端
    })
})

//用户详情根据ID
router.get('/getstaff_id', (req, res) => {
  let sql = `SELECT * FROM staff where id = '${req.query.id}'`
  console.log(sql)
  execSQL(sql).then(result => {
    res.send(result)  //发送查到的数据给前端
  })
})

//新增用户
router.post('/poststaff', (req, res) => {
    let sql = `INSERT INTO staff(id, name, sex, birthday, other, age, poid)
       VALUES(
        '${req.body.id}',
        '${req.body.name}', 
        '${req.body.sex}',
        '${req.body.birthday}',
        '${req.body.other}',
        '${req.body.age}',
        '${req.body.poid}') `
    execSQL(sql).then(result => {
       res.send(result)  //发送查到的数据给前端
    })
})
//删除用户
router.delete('/delstaff', (req, res) => {
    let id = req.query.id  //get  del  put
    //let id = req.params.id  //?
    //let id = req.body.id  //post
    let sql = `delete from staff where  id = '${id}'` //'${req.params.id}'`
    execSQL(sql).then(result => {
      res.send(result)  //发送查到的数据给前端
    })
})
//修改数据

//多条件查询



module.exports = router
const express = require('express')
const req = require('express/lib/request')
const { execSQL } = require('../db/mysql.js')
const dayjs = require('dayjs')

const router = express.Router()

//获取部门数据
router.get('/getDept', (req, res) => {
  let sql = 'SELECT * FROM dept'
  execSQL(sql).then(result => {
    res.send(result)  //发送查到的数据给前端
  })
})


//查询全部
router.get('/getstaff', (req, res) => {
    let sql = `SELECT * FROM staff  `
    execSQL(sql).then(result => {
      res.send(result)  //发送查到的数据给前端
    })
})

//条件查询
router.get('/findstaff', (req, res) => {
    let age1 = req.query.age1
    let age2 = req.query.age2
    if (age1 === '' && age2 === '') sql_age = ''
    if (age1 != '' && age2 === '') sql_age = ` and age >= ${age1} `
    if (age1 === '' && age2 != '') sql_age = ` and age <= ${age2} `
    if ( age1 == age2  && age1 != '') sql_age = ` and age = ${age2} `
    if ( age1 < age2  && age1 != '') sql_age = ` and age >= ${age1}  and age <= ${age2}` 
    
    let sql1 = `SELECT * FROM staff where  name  like  '%${req.query.name}%' `
    let sql2 = sql1+ `and  sex like '%${req.query.sex}%'`
    let sql3 = sql2+ ` and  poid like '%${req.query.poid}%'` 
    let sql = sql3 + sql_age 
   
   // let sq5 = sql2+ ` and  age <= '${req.query.age2}'` 
    console.log(sql)
    execSQL(sql).then(result => {
      res.send(result)  //发送查到的数据给前端
    })
})

//用户详情根据ID
router.get('/getstaff_id', (req, res) => {
  let sql = `SELECT * FROM staff where id = '${req.query.id}'`
  //console.log(sql)
  execSQL(sql).then(result => {
    res.send(result)  //发送查到的数据给前端
  })
})

//新增用户        //'${req.body.id}',
router.post('/poststaff', (req, res) => {
    let sql = `INSERT INTO staff( name, sex, birthday, other, poid,putdate)
       VALUES(

        '${req.body.name}', 
        '${req.body.sex}',
        '${req.body.birthday}',
        '${req.body.other}',
        '${req.body.poid}',
        '${dayjs().format('YYYY-MM-DD HH:mm:ss')}') `
    execSQL(sql).then(result => {
       res.send(result)  //发送查到的数据给前端
    })
})
//修改用户 (id, name, sex, birthday, other, age, poid)    //sex = '${params.sex}',       birthday = '${params.birthday}'
router.put('/putstaff', (req, res) => {
    //console.log('select 1')
      let params =req.body
      let sql = `UPDATE  staff SET 

       id = '${params.id}', 
       name = '${params.name}', 
       sex = '${params.sex}', 
       birthday = '${params.birthday}',
       other = '${params.other}',
       poid = ${params.poid},
       putdate = '${dayjs().format('YYYY-MM-DD HH:mm:ss')}' 
       where  id = ${params.id}`   
console.log(sql)
    execSQL(sql).then(result => {
      // res.send(result)  //发送查到的数据给前端
        console.log('修改用户成功！')
      })
})
//删除用户
router.delete('/delstaff', (req, res) => {
    let id = req.query.id  //get  del  put
    //let id = req.params.id  //?
    //let id = req.body.id  //post  put
    let sql = `delete from staff where  id = '${id}'` //'${req.params.id}'`
    execSQL(sql).then(result => {
      res.send(result)  //发送查到的数据给前端
    })
})
//修改数据

//多条件查询



module.exports = router

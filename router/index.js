const express = require('express')
const req = require('express/lib/request')
const { execSQL } = require('../db/mysql.js')
const dayjs = require('dayjs')
const multer  = require('multer')
const  fs  = require('fs')

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

//图片上传
//上传的文件保存在 public/images/
const storage = multer.diskStorage({
  //存储的位置
  destination(req, file, cb){
      cb(null, 'public/images/')
  },
  //文件名字的确定 multer默认帮我们取一个没有扩展名的文件名，因此需要我们自己定义
  filename(req, file, cb){
      cb(null,  file.originalname)
  }
})

//传入storage 除了这个参数我们还可以传入dest等参数
const upload = multer({storage})
router.post('/upLoad', upload.single('file'), (req, res) =>{
 
 //给客户端返回图片的访问地址 域名 + 文件名字 
 //因为在 app.js文件里面我们已经向外暴漏了存储图片的文件夹 uploa
  const url = 'http://localhost:5000/'+ req.file.filename
  res.json({url})
})



// router.post('/upload', multer({
//   //设置文件存储路径
//   dest: 'public/images'
// }).array('file', 1), function (req, res, next) {
//   const url = 'http://localhost:5000/' + req.file.filename
//   let files = req.files;
//   let file = files[0];
//   let fileInfo = {};
//   let path = 'public/images/'  + file.originalname;  //+ Date.now().toString()
//   fs.renameSync('./public/images/' + file.filename, path);
  
//   //获取文件基本信息
//   fileInfo.type = file.mimetype;
//   fileInfo.name = file.originalname;
//   fileInfo.size = file.size;
//   fileInfo.path = path;
//   res.json(url)
//  // res.json({
//  //   code: 0,
//  //   msg: 'OK',
//  //   data: fileInfo
//   //})

// });









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
    let sql = `INSERT INTO staff( name, card,sex, birthday,age, other, poid,putdate,imgurl)
       VALUES(

          '${req.body.name}', 
          '${req.body.card}',
          '${req.body.sex}',
          '${req.body.birthday}',
           ${req.body.age},
          '${req.body.other}',
           ${req.body.poid},
          '${dayjs().format('YYYY-MM-DD HH:mm:ss')}',
           '${req.body.imgurl}'
        ) `

        console.log(sql)
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

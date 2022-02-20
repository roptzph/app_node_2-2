const express = require('express')
const bodyParser = require('body-parser')
const router = require('./router/index.js')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const app = express()
const path = require('path')

// 跨域请求处理
//静态资源托管后，就能访问网页
//app.use(express.static(path.join(__dirname,'./dist')))
app.use(express.static(path.join(__dirname,'/public/images')))
// 跨域请求处理
// 跨域请求处理
app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With, X_Requested_With')
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
    res.header('X-Powered-By', '3.2.1')
    if (req.method == 'OPTIONS') res.send(200)
    /*让options请求快速返回*/ else next()
  })
  


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/v1',router)  //注意版本号，加v1  后，前端可以加/v1/getstaff

app.listen(5000,()=>{
    console.log('server is running at http://localhost:5000')
})
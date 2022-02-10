const express = require('express')
const bodyParser = require('body-parser')
const router = require('./router/index.js')
const app = express()
//const path = require('path')

// 跨域请求处理
//静态资源托管后，就能访问网页
//app.use(express.static(path.join(__dirname,'./dist')))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(router)

app.listen(5000,()=>{
    console.log('server is running at http://localhost:5000')
})
const express = require('express')
const con = require('../db/db.js')

const router = express.Router()

let db= con.handleDisconnection()

router.get('/v1/getstaff', (req, res) => {
    let sql = 'SELECT * FROM staff'
    db.query(sql, (err, results) => {
      if (err) {
        console.log(err)
      } else {
        res.send(results)
      }
    })
})

module.exports = router
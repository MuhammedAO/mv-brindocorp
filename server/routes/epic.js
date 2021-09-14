const express = require('express')
const  getTokens = require('../getToken')
const axios = require("axios")

const router = express.Router()


router.get('/', (req, res) => {
  const code = req.query.code
  if(code) {
    // res.send(code)
    res.redirect(
      `http://localhost:4000/auth/epic/redirect?code=${code}`
    )
  }
  else{
    var output = 'hello'
  }
  console.log(output)
  res.end()
})


module.exports = router
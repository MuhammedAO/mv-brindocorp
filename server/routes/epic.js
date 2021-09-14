const express = require('express')
const  getTokens = require('../getToken')
const axios = require("axios")

const router = express.Router()


// router.post("/auth/epicgames", async (req, res) => {
//   const  code  = req.query.code
  
//   console.log(access_token)
// })



router.get('/', (req, res) => {
  const code = req.query.code
  if(code) {
    var output = code
    // res.send(code)
    res.redirect(
      `http://localhost:4000/auth/epic/redirect?code=${code}`
    )
  }
  else{
    var output = 'hello'
  }
  console.log(output)
})


module.exports = router
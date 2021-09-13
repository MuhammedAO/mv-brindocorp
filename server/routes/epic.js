const express = require('express')

const router = express.Router()



router.get('/', (req, res) => {
  const code = req.query.code
  if(code) {
    var output = code
    // res.send(code)
  }
  else{
    var output = 'hello'
  }
  res.send(output)
})


module.exports = router
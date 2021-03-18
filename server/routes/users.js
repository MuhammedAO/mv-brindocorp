const express = require('express')
const { auth } = require('../middleware/auth')

const router = express.Router()

const { User } = require('../models/User')

router.get('/', (req, res) => {
  res.send({ message: 'Hello World' })
})

router.get('/auth', auth, (req, res) => {
  //send response to client
  res.status(200).json({
    _id: req._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastName: req.user.lastName,
    role: req.user.role,
    image: req.user.image,
  })
})



router.post('/register', (req, res) => {
  //we can only do this cuz we enabled body-parser
  const user = new User(req.body)
  //info gotten from the client saved in the db
  user.save((err, doc) => {
    err ? res.json({ success: false, err }) : ''
    return res.status(200).json({ success: true, userData: doc })
  })
})


router.post('/login', (req, res) => {
  //find email
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({ loginSuccess: false, message: 'Authenticated failed, Invalid Credentials' })

    //compare passwords
    user.comparePasswords(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ loginSuccess: false, message: 'Authenticated failed, Invalid Credentials' })
    })
    //generate token
    user.generateToken((err, user) => {
      if (err) return res.status(400).send(err)
      res.cookie("x_authExp", user.tokenExp)
      res
        .cookie("x_auth", user.token)
        .status(200)
        .json({ loginSuccess: true, userId: user._id })
    })


  })
})



router.get('/logout', auth, (req, res) => {
  //find specific logged in user
  User.findByIdAndUpdate({ _id: req.user._id }, { token: "", tokenExp:"" }, (err, doc) => {
    if (err) return res.json({ success: false, err })
    return res.status(200).send({ success: true, message: "You're currently logged out" })
  })
})


module.exports = router


const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const moment = require('moment')

// A Mongoose ‘schema’ is a document data structure (or shape of the document) that is enforced via the application layer.
const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxLength: 50
  },
  email: {
    type: String,
    trim: true,
    unique: 1
  },
  password: {
    type: String,
    minLength: 5
  },
  lastName: {
    type: String,
    maxLength: 50
  },
  role: {
    //distinguish between an admin and a normal user
    type: Number,
    default: 0
  },
  image: String,
  token: {
    type: String
  },
  tokenExp: {
    type: Number
  }
})


const saltRounds = 10

//before saving the user, carry out this op
userSchema.pre('save', function (next) {
  let user = this

  //this process needs to happen only when we modify the password(last step)
  if (user.isModified('password')) {

    bcrypt.genSalt(saltRounds, (err, salt) => {
      //nexe() => don't do anything, just save
      if (err) return next(err)

      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return next(err)
        user.password = hash
        next()
      })

    })
  } else {
    next()
  }
})



userSchema.methods.comparePasswords = function (plainPassword, cb) {
  bcrypt.compare(plainPassword, this.password, (err, isMatch) => {
    if (err) return cb(err)
    cb(null, isMatch)
  })
}


userSchema.methods.generateToken = function (cb) {
  let user = this
  //user._id is auto generated by mongoDB when we create a user
  let token = jwt.sign(user._id.toHexString(), 'secret')
  //token expiration
  let oneHour = moment().add(1, 'hour').valueOf()
  //token from user schema
  user.tokenExp = oneHour
  user.token = token
  user.save(function (err, user) {
    if (err) return cb(err)
    cb(null, user)
  })
}

userSchema.statics.findByToken = function (token, cb) {
  let user = this
  //verify token with jwt by decoding which returns the user._id (from jwt.sign)
  //token from our cookie
  jwt.verify(token, 'secret', function (err, decode) {
    user.findOne({ "_id": decode, "token": token }, function (err, user) {
      if (err) return cb(err)
      cb(null, user)
    })
  })

}

const User = mongoose.model('User', userSchema) //name of collection & schema

module.exports = { User }
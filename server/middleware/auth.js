const { User } = require('../models/User')

const auth = (req, res, next) => {
  //our jwt token was store in the cookie{}
  let token = req.cookies.x_auth

  //confirm whether or not a user is authenticated
  User.findByToken(token, (err, user) => {
    if (err) throw err
    if (!user) return res.json({ isAuth: false, error: true })

    // info preloaded to the req gotten from auth
    req.token = token
    req.user = user
    next()
  })
}

module.exports = { auth }
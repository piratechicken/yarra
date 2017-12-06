const User = require('../models/User')
const passport = require('passport')

passport.use(User.createStrategy())

function register(req, res, next) {
  // Create fresh user model
  const user = new User({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.firstName
  })
  // Create the user with the specified password
  User.register(user, req.body.password, (error, user) => {
    if (error) {
      next(error)
      return
    }

    req.user = user
    next()
  })
}

module.exports = {
  register,
  signIn: passport.authenticate('local', { session: false })
}
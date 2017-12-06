const passport = require('passport')
const PassportJwt = require('passport-jwt')
const JWT = require('jsonwebtoken')
const User = require('../models/User')

const jwtSecret = '.]y#rg9C43evhEsy'
const jwtAlgorithm = 'HS256'
const jwtExpiresIn = '7 days'

passport.use(User.createStrategy())

function register(req, res, next) {
  // Create a fresh user model
  const user = new User({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  })
  // Create the user with the specified password
  User.register(user, req.body.password, (error, user) => {
    if (error) {
      // Our register middleware failed
      next(error)
      return
    }

    // Store user so we can access it in our handler
    req.user = user
    // Success!
    next()
  })
}

passport.use(new PassportJwt.Strategy(
  {
    // Where will the jwt be passed in the http request?
    jwtFromRequest: PassportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret,
    algorithms: [jwtAlgorithm]
  },
  (payload, done) => {
    User.findById(payload.sub)
      .then((user) => {
        if (user) {
          done(null, user)
        }
        else {
          done(null, false)
        }
      })
      .catch((error) => {
        done(error, false)
      })
  }
))

function signJWTForUser(req, res) {
  // Get the user (either just signed in or signed up)
  const user = req.user
  // Create a signed token
  const token = JWT.sign(
    // Payload
    {
      email: user.email
    },
    // Secret
    jwtSecret,
    // Options
    {
      algorithm: jwtAlgorithm,
      expiresIn: jwtExpiresIn,
      subject: user._id.toString()
    }
  )
  // Send the token
  res.json({ token })
}

module.exports = {
  initialize: passport.initialize(),
  register,
  signIn: passport.authenticate('local', { session: false }),
  requireJWT: passport.authenticate('jwt', { session: false }),
  signJWTForUser
}
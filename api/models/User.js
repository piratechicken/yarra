const mongoose = require('./init')
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String
})

userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',
  userNameLowerCase: true, // Ensure that all emails are lowercase
  session: false // Disable sessions as we'll ue JWTs
})

const User = mongoose.model('User', userSchema)

module.exports = User
// grab the things we need
const mongoose = require('mongoose')

const Schema = mongoose.Schema

// create a schema
const userSchema = new Schema({
  endpoint: String,
  expirationTime: String,
  keys: {
    p256dh: String,
    auth: String
  },
  createdAt: { type: Date, default: new Date().toLocaleString() }
})

// the schema is useless so far
// we need to create a model using it
const User = mongoose.model('User', userSchema)

// make this available to our users in our Node applications
module.exports = User

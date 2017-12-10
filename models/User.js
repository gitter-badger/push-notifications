// grab the things we need
const mongoose = require('mongoose')

const Schema = mongoose.Schema

// create a schema
const userSchema = new Schema({
  push_reg_info: Object,
  created_at: Date,
  updated_at: Date
})

// the schema is useless so far
// we need to create a model using it
const User = mongoose.model('User', userSchema)

// make this available to our users in our Node applications
module.exports = User

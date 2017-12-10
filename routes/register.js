import express from 'express'
import User from '../models/User'
const router = express.Router()
// const User = require('../models/User')

/* POST registration info. */
router.post('/', (req, res, next) => {
  console.log(req.body.subscription)
  User.create(req.body.subscription, (err, post) => {
    if (err) return next(err)
    res.json(post)
  })
})

export default router

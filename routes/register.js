import express from 'express'
import User from '../models/User'

const router = express.Router()

function createRecord (model, data) {
  model.create(data, (err, post) => {
    if (err) return err
    return post
  })
}
/* POST registration info. */
router.post('/', (req, res) => {
  res.sendStatus(201)
})

export default router

import express from 'express'
import webpush from 'web-push'

const router = express.Router()

/* GET index page. */
router.get('/', (req, res) => {
  res.render('send')
})

router.post('/', (req, res) => {
  const options = {
    vapidDetails: {
      subject: 'mailto:semih.onay@bilgiedu.net',
      publicKey: process.env.PUBLIC_KEY,
      privateKey: process.env.PRIVATE_KEY
    },
    // 1 hour in seconds.
    TTL: 60 * 60
  }

  webpush.sendNotification(
    req.body.subscription,
    req.body.data,
    options
  )
    .then(() => {
      res.status(200).send({ success: true })
    })
    .catch((err) => {
      if (err.statusCode) {
        res.status(err.status).send(err.body)
      } else {
        res.status(err.status).send(err.message)
      }
    })
})

export default router

import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../app'

chai.should()
chai.use(chaiHttp)

/* Test the /GET route */
describe('app index route', () => {
  it('Should GET / (index page)', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200)
        done()
        if (err) {
        }
      })
  })

  it('Should handle 404 (Not found) error', (done) => {
    chai.request(app)
      .get('/notExist')
      .end((err, res) => {
        res.should.have.status(404)
        done()
        if (err) {

        }
      })
  })
})
describe('register user', () => {
  it('Should POST /register (register user page)', (done) => {
    chai.request(app)
      .post('/register')
      .send({
        subscription: {
          'endpoint': 'https://fcm.googleapis.com/fcm/send/eXnPbsxS9kw:APA91bHJc7Oc7yc6FRn1ow5TxGjAnVRirTYimoUi3bx9DkD_x35aiaBV62a9am3ZGpINUSXV0nUZ-0Zeww38OplaP26lpNGBUl1pdrzsq2r242GR4JbIRODc0_vd8KVAouu1VdytuLB9',
          'expirationTime': null,
          'keys': {
            'p256dh': 'BFKZyIhuQNp9DNoKRfX9--VnfGgqkF9Meps73_bjuv-uIHChduBiamaMMkuZvs99-Hq7QXEQan8Db0CpxKcSTic=',
            'auth': 'klALPLHQZ8pek4dLZXaSGA=='
          }
        }
      })
      .end((err, res) => {
        res.should.have.status(201)
        done()
        if (err) {
          console.error(err)
        }
      })
  })
})

describe('send push notification', () => {
  it('Should POST /send (send push notification)', (done) => {
    chai.request(app)
      .post('/send-msg')
      .send({
        subscription: {'endpoint': 'https://fcm.googleapis.com/fcm/send/eXnPbsxS9kw:APA91bHJc7Oc7yc6FRn1ow5TxGjAnVRirTYimoUi3bx9DkD_x35aiaBV62a9am3ZGpINUSXV0nUZ-0Zeww38OplaP26lpNGBUl1pdrzsq2r242GR4JbIRODc0_vd8KVAouu1VdytuLB9',
          'expirationTime': null,
          'keys': {
            'p256dh': 'BFKZyIhuQNp9DNoKRfX9--VnfGgqkF9Meps73_bjuv-uIHChduBiamaMMkuZvs99-Hq7QXEQan8Db0CpxKcSTic=',
            'auth': 'klALPLHQZ8pek4dLZXaSGA=='
          }
        },
        data: 'Mocha testing'
      })
      .end((err, res) => {
        res.status.should.be.eql(200)
        // res.text.should.be.eql({"success": true})
        done()
        if (err) {
          console.error('Error :', err)
        }
      })
  })
})

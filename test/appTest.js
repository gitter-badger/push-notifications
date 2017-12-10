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
        subscription: {'endpoint': 'https://fcm.googleapis.com/fcm/send/edjyQ8Jjsec:APA91bEibyGN5Ud5OX_5viRUFk6AnOMJoSGf6F_caHsKsISdJDbXLFXnmIVpKofpMUNhn0shlkfeJ7DRU9IEot_6xSMEUAa9OqS9HEwMA89RPmD6-eLYh1HjCy_qKTf5JswkeDwSLdQJ', 'expirationTime': null, 'keys': {'p256dh': 'BHfR5wE9kdV9-uCxG6HGGBCAM9MZq1SLZC7EqjuuUfUy7L1owWsLt5jZKBBVQKYDEMJPO1K7ogbsW8fbkqv-WVU=', 'auth': 'Gto8tU2AuLO2jSY1oYzz9w=='}}
      })
      .end((err, res) => {
        console.log(res.status)
        // res.should.have.status(201)

        if (err) {
          console.error(err)
        }
      })
    done()
  })
})

describe('send push notification', () => {
  it('Should POST /send (send push notification)', (done) => {
    chai.request(app)
      .post('/send-msg')
      .send({
        subscription: {'endpoint': 'https://fcm.googleapis.com/fcm/send/edjyQ8Jjsec:APA91bEibyGN5Ud5OX_5viRUFk6AnOMJoSGf6F_caHsKsISdJDbXLFXnmIVpKofpMUNhn0shlkfeJ7DRU9IEot_6xSMEUAa9OqS9HEwMA89RPmD6-eLYh1HjCy_qKTf5JswkeDwSLdQJ', 'expirationTime': null, 'keys': {'p256dh': 'BHfR5wE9kdV9-uCxG6HGGBCAM9MZq1SLZC7EqjuuUfUy7L1owWsLt5jZKBBVQKYDEMJPO1K7ogbsW8fbkqv-WVU=', 'auth': 'Gto8tU2AuLO2jSY1oYzz9w=='}},
        data: 'Mocha testing'
      })
      .end((err, res) => {
        res.status.should.be.eql(200)
        // res.text.should.be.eql({"success": true})
        if (err) {
          console.error('Error :', err)
        }
      })
    done()
  })
})

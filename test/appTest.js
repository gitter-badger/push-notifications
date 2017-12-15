import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../app'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
chai.should()
chai.use(chaiHttp)

describe('Database Connection Test', () => {
  it('It should connect to MongoDB', (done) => {
    mongoose.Promise = global.Promise
    mongoose.connection.openUri(process.env.DB)
    const db = mongoose.connection
    db.on('error', console.error.bind(console, 'Connection Error'))
    db.once('open', () => {

    })
    done()
  })
})

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
        subscription: process.env.REGISTER_INFO
      })
      .end((err, res) => {
        console.log(res.status)
        res.should.have.status(400)

        if (err) {
          res.should.have.status(400)
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
        subscription: process.env.REGISTER_INFO,
        data: 'Mocha testing'
      })
      .end((response, error) => {
        console.log(response.status)
        response.should.have.status(201)
        if (error) {
          response.should.have.status(400)
          console.log(error)
        }
      })
    done()
  })
})

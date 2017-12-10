import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import Debug from 'debug'
import express from 'express'
import logger from 'morgan'
import path, { dirname } from 'path'
// import favicon from 'serve-favicon';

import index from './routes/index'
import register from './routes/register'
import send from './routes/send'
import mongoose from 'mongoose'

// Connect to DB
mongoose.connect(process.env.DB)
mongoose.connection.on('open', (ref) => {
  return console.log('Connected to mongo server.')
})
mongoose.connection.on('error', function (err) {
  console.log('Could not connect to mongo server!')
  return console.log(err)
})
// add this to the VERY top of the first file loaded in your app
const opbeat = require('opbeat').start({
  appId: '76bfe95471',
  organizationId: 'bf09f7ac168f48adb9a7acce37ecfde0',
  secretToken: '841a590acc78fe16275fbb613956fc8871f0085f'
})

const result = require('dotenv').config()
if (result.error) {
  throw result.error
}
const app = express()
const debug = Debug('push-notifications:app')
app.set('views', path.join(__dirname, 'views'))
// view engine setup
app.set('view engine', 'ejs')
// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(cookieParser())

// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use('/public', express.static(path.join(__dirname, 'public')))

app.use('/', index)
app.use('/register', register)
app.use('/send-msg', send)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
/* eslint no-unused-vars: 0 */
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

// Handle uncaughtException
process.on('uncaughtException', (err) => {
  debug('Caught exception: %j', err)
  process.exit(1)
})

app.use(opbeat.middleware.express())

export default app

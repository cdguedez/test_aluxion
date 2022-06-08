const express = require('express')
const authRouter = require('./auth.routes')
const usersRouter = require('./users.routes')
const filesRouter = require('./files.routes')
class RouterApi {
  constructor(app) {
    this.app = app
    this.apiV1(this.app)
  }

  apiV1(app) {
    const router = express.Router()
    app.use('/api/v1', router)
    router.use('/auth', authRouter)
    router.use('/users', usersRouter)
    router.use('/files', filesRouter)
  }

}

module.exports = RouterApi

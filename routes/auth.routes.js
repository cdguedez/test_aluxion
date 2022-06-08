const express = require('express'),
      router = express.Router(),
      passport = require('passport'),
      validator = require('./../midlewares/validator.handler'),
      { login, register, recovery } = require('./../schemas/auth.schema'),
      authService = require('./../services/auth.service'),
      service = new authService()

router.post('/login',
  validator.validatorHandler(login, 'body'),
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const { user } = req
      const auth = service.signTokenAuth(user)
      res
        .status(200)
        .json({ data: auth })
    } catch (error) {
      next(error)
    }
  }
)

router.post('/register',
  validator.validatorHandler(register, 'body'),
  async (req, res, next) => {
    try {
      const { body } = req
      const register = await service.register(body)
      res
        .status(201)
        .json({ data: register})
    } catch (error) {
      next(error)
    }
  }
)

router.post('/recovery',
  validator.validatorHandler(recovery, 'body'),
  async (req, res, next) => {
    try {
      const { email } = req.body
      const rta = await service.sendRecovery(email)
      res
        .status(200)
        .json({ data: rta })
    } catch (error) {
      next(error)
    }
  }
)

router.post('/reset-password',
  async (req, res, next) => {
    try {
      const { token, newPassword } = req.body
      const user = await service.resetPassword(token, newPassword)
      res.json({ data: user })
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router

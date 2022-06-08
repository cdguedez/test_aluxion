const express = require('express')
const passport = require('passport')
const router = express.Router()
const UsersService =require('../services/users.service')
const validator = require('../midlewares/validator.handler')
const { checkRole } = require('./../midlewares/auth.handler')
const { createUser, updateUser, getUser, deleteUser } = require('../schemas/user.schema')
const service = new UsersService

router.get('/',
  passport.authenticate('jwt', { session: false }),
  checkRole('admin'),
  async (req, res, next) => {
    try {
      const users = await service.find()
      res
        .status(200)
        .json({
          data: users
        })
    } catch (error) {
      next(error)
    }
  }
)

router.get('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRole('admin'),
  validator.validatorHandler(getUser, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const user = await service.findOne(id)
      delete user.dataValues.password
      res
        .status(200)
        .json({
          data: user
        })
    } catch (error) {
      next(error)
    }
  }
)

router.post('/',
  passport.authenticate('jwt', { session: false }),
  checkRole('admin'),
  validator.validatorHandler(createUser, 'body'),
  async (req, res, next) => {
    try {
      const { body } = req
      const newUser = await service.create(body)
      res
        .status(201)
        .json({
          data: newUser
        })
    } catch (error) {
      next(error)
    }
  }
)

router.patch('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRole('admin'),
  validator.validatorHandler(getUser, 'params'),
  validator.validatorHandler(updateUser, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const { body } = req
      const user = await service.update(id, body)
      res
        .status(200)
        .json({
          data: user
        })
    } catch (error) {
      next(error)
    }
  }
)

router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRole('admin'),
  validator.validatorHandler(deleteUser, 'params'),
  async (req, res, next) => {
    try {
      const { id } =  req.params
      const user = await service.destroy(id)
      res
        .status(200)
        .json({
          data: user
        })
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router

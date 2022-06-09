const express = require('express')
const passport = require('passport')
const router = express.Router()
const { VerifyFile } = require('./../midlewares/validatorFile.handler')
const validator = require('./../midlewares/validator.handler')
const { uploadFile, getFile, updateFile } = require('./../schemas/files.schema')
const filesService = require('../services/files.service')
const service = new filesService()

router.get('/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const data = await service.find()
      res
        .status(200)
        .json({ data })
    } catch (error) {
      next(error)
    }
  }
)

router.post('/upload',
  passport.authenticate('jwt', { session: false }),
  validator.validatorHandler(uploadFile, 'files'),
  VerifyFile,
  async (req, res, next) => {
    try {
      const { files, user } = req
      const file = await service.upload(files, user)
      res
        .status(201)
        .json({ data: file })
    } catch (error) {
      next(error)
    }
  }
)

router.patch('/:id',
  passport.authenticate('jwt', { session: false }),
  validator.validatorHandler(getFile, 'params'),
  validator.validatorHandler(updateFile, 'body' ),
  async (req, res, next) => {
    try {
      const { name } = req.body
      const { id } = req.params
      const file = await service.update(id, name)
      res
        .status(200)
        .json({ data: file })
    } catch (error) {
      next(error)
    }
  }
)


module.exports = router

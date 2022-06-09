const express = require('express')
const passport = require('passport')
const router = express.Router()
const { VerifyFile } = require('./../midlewares/validatorFile.handler')
const validator = require('./../midlewares/validator.handler')
const { upload } = require('./../schemas/files.schema')
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
  validator.validatorHandler(upload, 'files'),
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


module.exports = router

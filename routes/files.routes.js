const express = require('express')
const passport = require('passport')
const router = express.Router()
const { VerifyFile } = require('./../midlewares/validatorFile.handler')
const filesService = require('../services/files.service')
const service = new filesService()

router.post('/upload',
passport.authenticate('jwt', { session: false }),
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

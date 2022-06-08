const express = require('express')
const router = express.Router()
const { VerifyFile } = require('./../midlewares/validatorFile.handler')
const filesService = require('../services/files.service')
const service = new filesService()

router.post('/upload',
  VerifyFile,
  async (req, res, next) => {
    try {
      const { files } = req
      const file = await service.upload(files)
      res
        .status(201)
        .json({ data: file })
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router

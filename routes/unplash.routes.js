const express = require('express')
const passport = require('passport')
const router = express.Router()
const { checkRole } = require('./../midlewares/auth.handler')
const unplashService = require('./../services/unplash.service')
const service = new unplashService()

router.get('/',
  passport.authenticate('jwt', { session: false }),
  checkRole('customer', 'admin'),
  async(req,res, next) => {
    try {
      const { response } = await service.listPhotos(req.query)
      res
        .status(200)
        .json({ data: response })
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router

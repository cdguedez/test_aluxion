const boom = require('@hapi/boom')

const VerifyFile =  (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file ) {
    return next(boom.badRequest('File not exist in request'))
  }
  next()
}

module.exports = { VerifyFile }

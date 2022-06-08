const boom = require('@hapi/boom')

const checkRole = (...role) => {
  return (req, res, next) => {
    const user = req.user
    if (!user) { return next(boom.unauthorized('Unauthorized')) }
    if (!role.includes(user.role)) { return next(boom.unauthorized('Unauthorized')) }
    return next()
  }
}

module.exports = { checkRole }

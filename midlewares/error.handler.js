const { ValidationError } = require('sequelize')
class Middleware {

  static errorLog(err, req, res, next) {
    console.error(err)
    next(err)
  }

  static errorHandler (err, req, res, next) {
    res
      .status(500)
      .json({
        error: {
          statusCode: 500,
          error: "Internal Server Error",
          message: "Internal Server Error",
          details: err.stack
        }
      })
  }

  static boomErrorHandler(err, req, res, next) {
    if(err.isBoom) {
      const { output } = err
      const { payload } = output
      return res
        .status(output.statusCode)
        .json({
          error: { ...payload, details: "" }
        })
    }
    next(err)
  }

  static sqlErrorHamdler(err, req, res, next) {
    if(err instanceof ValidationError) {
      res
        .status(409)
        .json({
          statusCode: 409,
          error: err.name,
          message: err.name,
          details: err.errors[0].message
        })
    }
    next(err)
  }

}

module.exports = Middleware

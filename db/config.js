const config = require('../config/config')
const URI = config.dbUrl

module.exports = {
  development: {
    url: URI,
    dialect: `${config.dialect}`
  },
  production: {
    url: URI,
    dialect: `${config.dialect}`
  },
  test: {
    url: URI,
    dialect: `${config.dialect}`
  }
}

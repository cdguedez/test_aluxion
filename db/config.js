const config = require('../config/config'),
      // USER = encodeURIComponent(config.dbUser),
      // PASSWORD = encodeURIComponent(config.dbPass),
      // URI = `${config.dialect}://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`
      URI = config.dbUrl

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

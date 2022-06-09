require('dotenv').config()
const express = require('express')
const fileUpload = require('express-fileupload')
const RouterApi = require('./routes')
const Middleware = require('./midlewares/error.handler')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000
const config = require('./config/config')
const swaggerUI = require('swagger-ui-express')
const swaggerDoc = require('./openapi.json')

app.use(express.json())
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/',
  debug: config.env === 'dev' ? true : false
}))

const whiteList = ['http://localhost:3000', 'http://localhost:3001']
const options = {
  origin: (origin, callback) => {
    if(whiteList.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error('not authorized'))
    }
  }
}

app.use(cors(options))
require('./utils/auth')
new RouterApi(app)
app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc))
app.use(Middleware.errorLog)
app.use(Middleware.sqlErrorHamdler)
app.use(Middleware.boomErrorHandler)
app.use(Middleware.errorHandler)

app.listen(port, () => {
  console.log(`server run on port ${port}`)
})

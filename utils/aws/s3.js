const AWS = require('aws-sdk')
const fs = require('fs')
const config = require('./../../config/config')

// AWS.config.update({
//   region: 'us-east-1'
// })

const uploadFileToAWS = (file) => {
  const stream = fs.createReadStream(file.tempFilePath)
  const s3 = new AWS.S3()
  const hash = Math.ceil(Math.random(1) * 100000)
  const params = {
    Bucket: `${config.awsBucket}`,
    Key: `${hash}-${file.name}`,
    Body: stream,
    ACL:'public-read'
  }
  const send = s3.upload(params).promise()
  return send
}

module.exports = { uploadFileToAWS }

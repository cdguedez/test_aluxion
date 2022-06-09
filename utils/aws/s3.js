const AWS = require('aws-sdk')
const fs = require('fs')
const config = require('./../../config/config')

AWS.config.update({
  region: 'us-east-1'
})

const uploadFileToAWS = (file) => {
  const stream = fs.createReadStream(file.tempFilePath)
  const s3 = new AWS.S3()
  const params = {
    Bucket: `${config.awsBucket}`,
    Key: file.name,
    Body: stream,
  }
  const send = s3.upload(params).promise()
  return send
}

const getBuckets = () => {
  const s3 = new AWS.S3()
  const buckets = s3.listBuckets().promise()
  return buckets
}


module.exports = { uploadFileToAWS, getBuckets }

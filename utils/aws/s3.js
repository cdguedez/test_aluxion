const AWS = require('aws-sdk')
const fs = require('fs')
const config = require('./../../config/config')
const boom = require('@hapi/boom')

// AWS.config.update({
//   region: 'us-east-1'
// })

const uploadFileToAWS = async (file) => {
  const stream = fs.createReadStream(file.tempFilePath)
  const s3 = new AWS.S3()
  const hash = Math.ceil(Math.random(1) * 100000)
  const params = {
    Bucket: `${config.awsBucket}`,
    Key: `${hash}-${file.name}`,
    Body: stream,
    ACL:'public-read'
  }
  const upload = await s3.upload(params).promise()
  const send = await upload
  return send
}

const renameFileToAWS = async (newData, file) => {
  try {
    const s3 = new AWS.S3()
    const newKey = newData
    const oldKey = file.name
    // // params for copyObject
    const paramsCopyFile = {
      Bucket: config.awsBucket,
      CopySource: `${config.awsBucket}/${oldKey}`,
      Key: newKey,
      ACL:'public-read'
    }

    await s3.copyObject(paramsCopyFile).promise()
    const newUrlImage = `https://${config.awsBucket}.s3.eu-west-1.amazonaws.com/${newKey}`
    return { newKey, oldKey, newUrlImage }

  } catch (error) {
    throw boom.forbidden('Forbidden')
  }
}

module.exports = {
  uploadFileToAWS,
  renameFileToAWS
}

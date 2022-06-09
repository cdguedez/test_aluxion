const AWS = require('aws-sdk')
const fs = require('fs')
const config = require('./../../config/config')
// const boom = require('@hapi/boom')

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

// const renameFileToAWS = async (newData, file) => {
//   try {
//     const s3 = new AWS.S3()
//     const newKey = newData
//     const oldKey = file.name
//     // // params for copyObject
//     const paramsCopyFile = {
//       Bucket: config.awsBucket,
//       CopySource: `${config.awsBucket}/${oldKey}`,
//       Key: newKey,
//     }
//     // params for deleteObject
//     const paramsDeleteFile = {
//       Bucket: config.awsBucket,
//       Key: newKey,
//     }

//     const copyFile = await s3.copyObject(paramsCopyFile).promise()
//     await s3.deleteObject(paramsDeleteFile).promise()
//     return copyFile

//   } catch (error) {
//     throw boom.forbidden('Forbidden')
//   }
// }

module.exports = {
  uploadFileToAWS,
  // renameFileToAWS
}

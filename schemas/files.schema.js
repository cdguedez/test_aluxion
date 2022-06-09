const Joi = require('joi')

const id = Joi.number()
const name = Joi.string()
const data = Joi.any()
const size = Joi.number().max(2097152)
const encoding = Joi.string()
const tempFilePath = Joi.string()
const truncated = Joi.boolean()
const mimetype = Joi.string()
const md5 = Joi.string()
const mv = Joi.any()

const file = Joi.object({
  tempFilePath: tempFilePath.required(),
  name: name.required(),
  data,
  size,
  encoding,
  truncated,
  mimetype,
  md5,
  mv
})

const uploadFile = Joi.object({
  file: file.required()
})

const getFile = Joi.object({
  id: id.required()
})

const updateFile = Joi.object({
  name: name.required()
})

module.exports = { uploadFile, getFile, updateFile }

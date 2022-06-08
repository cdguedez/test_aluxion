'use strict'

const { FILES_TABLE, FilesSchema } = require('../models/file.model')

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(FILES_TABLE, {
      id: FilesSchema.id,
      name: FilesSchema.name,
      urlImage: FilesSchema.urlImage,
      userId: FilesSchema.userId,
      createdAt: FilesSchema.createdAt,
      updatedAt: FilesSchema.updatedAt,
    }, {
      collate: 'utf8_unicode_ci'
    })
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(FILES_TABLE)
  }
}

const { createApi } = require('unsplash-js')
const config = require('../../config/config')

const unplashApi = createApi({ accessKey: config.upAccessKey })

const getPhotos = async (query) => {
  const { page, perPage, search } = query
  const result = await unplashApi.search.getCollections({
    query: search,
    page,
    perPage,
  })

  return result
}



module.exports = { getPhotos }

const { createApi } = require('unsplash-js')
const config = require('../../config/config')

const unplashApi = createApi({ accessKey: config.upAccessKey })

const getPhotos = async (query) => {
  const { page, perPage, search } = query
  const { response } = await unplashApi.search.getCollections({
    query: search,
    page,
    perPage,
  })

  const { total, total_pages, results } = response

  const result = results.map(item => {
    return {
      id: item.id,
      title: item.title,
      description: item.description,
      urls: item.cover_photo.urls,
      links: item.cover_photo.links
    }
  })

  return { total, total_pages, result }
}

module.exports = { getPhotos }

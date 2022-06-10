const { getPhotos } = require('./../utils/unplash/index')

class UnplashService {

  async listPhotos(query) {
    const listPhotos = getPhotos(query)
    return listPhotos
  }

}

module.exports = UnplashService

class FilesService {
  async upload(data) {
    const { ...props } = data.file
    console.log(props)
    return props
  }
}
module.exports = FilesService

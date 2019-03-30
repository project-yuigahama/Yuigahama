class YuigahamaError extends Error {
  constructor (message) {
    super(message)
    Error.captureStackTrace(this)
    this.name = 'YuigahamaError'
  }
}

module.exports = YuigahamaError

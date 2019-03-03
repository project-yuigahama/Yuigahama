class Utils {
  /**
   * @returns {string}
   * @static
   */
  static getPlatform () {
    switch (process.platform) {
      case 'win32':
        return 'Windows'
      case 'linux':
        return 'Linux'
      case 'darwin':
        return 'Mac'
      default:
        return process.platform
    }
  }
}

module.exports = Utils

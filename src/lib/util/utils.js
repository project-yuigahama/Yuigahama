class Utils {
  /**
   * @returns {string}
   * @static
   */
  static getPlatform () {
    switch (process.platform) {
      case 'win32': return 'Windows'
      case 'linux': return 'Linux'
      case 'darwin': return 'Mac'
      default: return process.platform
    }
  }

  /**
   * @param {string} type
   *
   * @returns {number}
   * @static
   */
  static resolveModTypeColor (type) {
    switch (type) {
      case 'BAN': return 0xE74C3C
      case 'KICK': return 0xF1C40F
      case 'UNKNOWN': return 0x95A5A6
      default: return 0x000000
    }
  }
}

module.exports = Utils

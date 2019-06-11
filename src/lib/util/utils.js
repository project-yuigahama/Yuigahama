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

  /**
   * @param {number} level
   *
   * @returns {number}
   */
  static getFilterLevel (level) {
    switch (level) {
      case 1: return 0.9
      case 2: return 0.8
      case 3: return 0.7
      case 4: return 0.6
      case 5: return 0.5
      case 6: return 0.4
      case 7: return 0.3
      case 8: return 0.2
      case 9: return 0.1
      default: return 0.6
    }
  }
}

module.exports = Utils

const { Event } = require('klasa')

/**
 * @extends Event
 */
class DblError extends Event {
  /**
   * @param {Error} error
   */
  run (error) {
    if (!error) return
    this.client.console.error(error)
  }
}

module.exports = DblError

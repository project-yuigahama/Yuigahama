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
    this.client.emit('error', error.stack || error)
  }
}

module.exports = DblError

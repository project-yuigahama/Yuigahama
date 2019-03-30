const { Event, Client } = require('klasa')

/**
 * @extends Event
 */
class DblError extends Event {
  /**
   * @param {Client} client
   * @param {Error} error
   */
  run (client, error) {
    if (!error) return
    client.console.error(error)
  }
}

module.exports = DblError

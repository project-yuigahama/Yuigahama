const { Event, Client } = require('klasa')

/**
 * @extends Event
 */
class DblPosted extends Event {
  /**
   * @param {Client} client
   */
  run (client) {
    client.console.debug('Server count posted!')
  }
}

module.exports = DblPosted

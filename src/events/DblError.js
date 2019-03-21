const { Event, Client } = require('klasa')

/**
 * @extends DblError
 */
class DblError extends Event {
  /**
   * @param {Client} client
   * @param {Error} error
   */
  async run (client, error) {
    client.console.error(error)
  }
}

module.exports = DblError

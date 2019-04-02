const { Event } = require('klasa')

/**
 * @extends Event
 */
class DblPosted extends Event {
  run () {
    this.client.console.debug('Server count posted!')
  }
}

module.exports = DblPosted

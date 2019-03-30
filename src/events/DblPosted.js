const { Event } = require('klasa')

/**
 * @extends Event
 */
class DblPosted extends Event {
  run () {
    this.client.console.log('Server count posted!')
  }
}

module.exports = DblPosted

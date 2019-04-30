const { Event } = require('klasa')

/**
 * @extends Event
 */
class YuigahamaReady extends Event {
  constructor (...args) {
    super(...args, {
      event: 'klasaReady'
    })
  }

  async run () {
    this.client.user.setActivity({ name: `yuigahama@help | ${this.client.guilds.size} guilds`, type: 'PLAYING' })
  }
}

module.exports = YuigahamaReady

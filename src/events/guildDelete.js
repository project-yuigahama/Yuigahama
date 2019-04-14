const { Event } = require('klasa')

/**
 * @extends Event
 */
class guildDelete extends Event {
  run () {
    this.client.user.setActivity({ name: `${this.client.options.prefix}help | ${this.client.guilds.size} guilds`, type: 'WATCHING' })
  }
}

module.exports = guildDelete

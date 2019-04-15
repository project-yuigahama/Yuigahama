const { Event, KlasaGuild } = require('klasa')

/**
 * @extends Event
 */
class guildDelete extends Event {
  /**
   * @param {KlasaGuild} guild
   */
  run (guild) {
    this.client.user.setActivity({ name: `${this.client.options.prefix}help | ${this.client.guilds.size} guilds`, type: 'WATCHING' })
    this.client.console.log(`${guild.name} から退出しました。`)
  }
}

module.exports = guildDelete

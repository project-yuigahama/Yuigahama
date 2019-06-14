const { Event, KlasaGuild } = require('klasa')

/**
 * @extends Event
 */
class guildDelete extends Event {
  /**
   * @param {KlasaGuild} guild
   */
  run (guild) {
    this.client.user.setActivity({ name: `yuigahama@help | ${this.client.guilds.size} guilds`, type: 'PLAYING' })
    this.client.console.log(`${guild.name} から退出しました。`)
  }
}

module.exports = guildDelete

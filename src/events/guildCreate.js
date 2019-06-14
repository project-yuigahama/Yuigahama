const { Event, KlasaGuild } = require('klasa')
const { MessageEmbed } = require('discord.js')

/**
 * @extends Event
 */
class guildCreate extends Event {
  /**
   * @param {KlasaGuild} guild
   */
  run (guild) {
    this.client.user.setActivity({ name: `yuigahama@help | ${this.client.guilds.size} guilds`, type: 'PLAYING' })
    this.client.console.log(`${guild.name} に参加しました。`)
  }
}

module.exports = guildCreate

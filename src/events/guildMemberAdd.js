const { Event } = require('klasa')
const { GuildMember, MessageEmbed } = require('discord.js')

/**
 * @extends Event
 */
class guildMemberAdd extends Event {
  /**
   * @param {GuildMember} member
   */
  run (member) {
    const settings = member.guild.settings
    if (settings.channels.JoinLog !== null) {
      const channel = member.guild.channels.get(settings.channels.JoinLog)
      channel.send(new MessageEmbed()
        .setColor('GREEN')
        .setTitle(`${member.user.tag} has joined the server.`)
        .setThumbnail(member.user.avatarURL({ size: 2048 }))
        .setDescription(settings.channels.JoinMessage)
        .setTimestamp()
      )
    }
  }
}

module.exports = guildMemberAdd

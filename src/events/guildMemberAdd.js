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
      if (typeof channel === 'undefined') return
      channel.send(new MessageEmbed()
        .setColor('GREEN')
        .setTitle(member.guild.language.get('MEMBER_JOIN', member.user.tag))
        .setThumbnail(member.user.avatarURL({ size: 2048 }))
        .setDescription(settings.channels.JoinMessage)
        .setTimestamp()
      )
    }
  }
}

module.exports = guildMemberAdd

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
    const guild = member.guild

    if (settings.channels.JoinLog !== null) {
      const channel = guild.channels.get(settings.channels.JoinLog)
      if (typeof channel === 'undefined') return
      channel.send(new MessageEmbed()
        .setColor('GREEN')
        .setTitle(guild.language.get('MEMBER_JOIN', member.user.tag))
        .setThumbnail(member.user.avatarURL({ size: 2048, format: 'png' }))
        .setDescription(settings.channels.JoinMessage)
        .setTimestamp()
      )
    }
  }
}

module.exports = guildMemberAdd

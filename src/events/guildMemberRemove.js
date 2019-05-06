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
    if (member.guild.settings.channels.QuitLog !== null) {
      const channel = member.guild.channels.get(member.guild.settings.channels.QuitLog)
      if (typeof channel === 'undefined') return
      channel.send(new MessageEmbed()
        .setColor('RED')
        .setTitle(member.guild.language.get('MEMBER_QUIT', member.user.tag))
        .setThumbnail(member.user.avatarURL({ size: 2048, format: 'png' }))
        .setDescription(settings.channels.QuitMessage)
        .setTimestamp()
      )
    }
  }
}

module.exports = guildMemberAdd

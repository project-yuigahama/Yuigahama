const { Event } = require('klasa')
const { GuildMember, MessageEmbed, TextChannel } = require('discord.js')

/**
 * @extends Event
 */
class MemberJoinLogging extends Event {
  constructor (...args) {
    super(...args, {
      event: 'guildMemberAdd'
    })
  }

  /**
   * @param {GuildMember} member
   */
  async run (member) {
    const setting = member.guild.settings.get('channels.JoinLog')
    const guild = member.guild

    if (setting === null) return
    if (!guild.channels.has(setting)) return
    const channel = guild.channels.get(setting)
    if (!(channel instanceof TextChannel)) return

    channel.sendEmbed(new MessageEmbed()
      .setColor('GREEN')
      .setTitle(guild.language.get('MEMBER_JOIN', member.user.tag))
      .setThumbnail(member.user.avatarURL({ size: 2048, format: 'png' }))
      .setDescription(guild.settings.has('channels.JoinMessage') ? guild.settings.get('channels.JoinMessage') : 'Welcome')
      .setTimestamp()
    )
  }
}

module.exports = MemberJoinLogging

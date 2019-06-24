const { Event } = require('klasa')
const { GuildMember, MessageEmbed, TextChannel } = require('discord.js')

/**
 * @extends Event
 */
class MemberQuitLogging extends Event {
  constructor (...args) {
    super(...args, {
      event: 'guildMemberRemove'
    })
  }

  /**
   * @param {GuildMember} member
   */
  async run (member) {
    const setting = member.guild.settings.get('channels.QuitLog')
    const guild = member.guild

    if (setting === null) return
    if (!guild.channels.has(setting)) return
    const channel = guild.channels.get(setting)
    if (!(channel instanceof TextChannel)) return

    channel.sendEmbed(new MessageEmbed()
      .setColor('GREEN')
      .setTitle(guild.language.get('MEMBER_QUIT', member.user.tag))
      .setThumbnail(member.user.avatarURL({ size: 2048, format: 'png' }))
      .setDescription(guild.settings.get('channels.QuitMessage'))
      .setTimestamp()
    )
  }
}

module.exports = MemberQuitLogging

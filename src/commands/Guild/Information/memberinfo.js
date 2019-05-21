const { Command, KlasaMessage, Timestamp } = require('klasa')
const { GuildMember, MessageEmbed } = require('discord.js')

/**
 * @extends Command
 */
class MemberInfo extends Command {
  constructor (...args) {
    super(...args, {
      description: language => language.get('COMMAND_MEMBER_INFO_DESCRIPTION'),
      runIn: ['text'],
      usage: '<member:member>'
    })
  }

  /**
   * @param {KlasaMessage} message
   * @param {[GuildMember]} usage
   */
  async run (message, [member]) {
    return message.sendEmbed(new MessageEmbed()
      .setColor(member.displayHexColor)
      .setFooter('Guide Joined At')
      .setTimestamp(member.joinedTimestamp)
      .setThumbnail(member.user.avatarURL({ size: 512, format: 'png' }))
      .addField('Display Name', member.displayName, true)
      .addField('Nickname', member.nickname ? member.nickname : 'None', true)
      .addField('Bannable', member.bannable ? ':white_check_mark:' : ':x:', true)
      .addField('Kickable', member.kickable ? ':white_check_mark:' : ':x:', true)
      .addField('Last Message ID', member.lastMessageID ? member.lastMessageID : 'None', true)
      .addField('Last Pin At', member.lastPinTimestamp ? new Timestamp('YYYY-MM-DD HH:mm:ss').display(member.lastPinTimestamp) : 'None', true)
      .addField('Roles', member.roles.filter(role => role.name !== '@everyone').map(role => role.name).join(', '), true)
    )
  }
}

module.exports = MemberInfo

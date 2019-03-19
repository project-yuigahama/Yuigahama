const { Command, KlasaMessage, Timestamp } = require('klasa')
const { GuildMember, MessageEmbed } = require('discord.js')

/**
 * @extends Command
 */
class MemberInfo extends Command {
  constructor (...args) {
    super(...args, {
      description: 'ギルドメンバーの情報を確認出来ます。',
      extendedHelp: 'No extended help available.',
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
      .setThumbnail(member.user.avatarURL({ size: 512 }))
      .addField('Display Name', member.displayName, true)
      .addField('Nickname', member.nickname ? member.nickname : 'None', true)
      .addField('Bannable', member.bannable ? 'Yes' : 'No', true)
      .addField('Kickable', member.kickable ? 'Yes' : 'No', true)
      .addField('Last Message ID', member.lastMessageID ? member.lastMessageID : 'None', true)
      .addField('Last Pin At', member.lastPinTimestamp ? new Timestamp('YYYY-MM-DD HH:mm:ss').display(member.lastPinTimestamp) : 'None', true)
      .addField('Roles', member.roles.map(role => role.name).join(', '), true)
    )
  }
}

module.exports = MemberInfo

const { Command, KlasaMessage } = require('klasa')
const { GuildMember } = require('discord.js')

/**
 * @extends Command
 */
class Ban extends Command {
  constructor (...args) {
    super(...args, {
      runIn: ['text'],
      permissionLevel: 6,
      requiredPermissions: ['BAN_MEMBERS'],
      descripition: 'ギルドからメンバーをBANします。',
      usage: '<member:member> [days:int{1,7}] [reason:...string]'
    })
  }

  /**
   * @param {KlasaMessage} message
   * @param {[GuildMember, number, string]} usage
   */
  async run (message, [member, days = 0, reason = 'Not specified']) {
    if (message.author.id === member.id) return message.sendMessage('自分自身をBANする事は出来ません。')
    if (this.client.user.id === member.id) return message.sendMessage('このボットをBANする事は出来ません。(メニューからお願いします。)')
    await member.ban({ reason: reason, days: days })
    return message.sendMessage(`**${member.user.tag}**をBANしました。`)
  }
}

module.exports = Ban

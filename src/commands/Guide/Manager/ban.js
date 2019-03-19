const { Command, KlasaMessage, KlasaUser } = require('klasa')
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
      usage: '<user:user> [days:int{1,7}] [reason:...string]',
      usageDelim: ' '
    })
  }

  /**
   * @param {KlasaMessage} message
   * @param {[KlasaUser, number, string]} usage
   */
  async run (message, [user, days = 0, reason = 'Not specified']) {
    const member = await message.guild.members.fetch(user).catch(() => null)
    if (message.author.id === user.id) return message.sendMessage('自分自身をBANする事は出来ません。')
    if (this.client.user.id === user.id) return message.sendMessage('私をBANする場合このコマンドは実行出来ません。')
    if (member instanceof GuildMember) {
      if (member.roles.highest.position >= message.member.roles.highest.position || !member.bannable) return message.sendMessage('このユーザーはBAN出来ません。理由: 自分より上の権限を持ったユーザーかこのボットの権限ではこのユーザーをBAN出来ない為')
    }
    await message.guild.members.ban(user, { days: days, reason: reason })
    return message.sendMessage(`${user.tag}をBANしました。<:SataniaThumbsUp:551707177249800204>`)
  }
}

module.exports = Ban

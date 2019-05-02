const { Command, KlasaMessage, KlasaUser } = require('klasa')

/**
 * @extends Command
 */
class Ban extends Command {
  constructor (...args) {
    super(...args, {
      runIn: ['text'],
      permissionLevel: 5,
      requiredPermissions: ['BAN_MEMBERS'],
      description: language => language.get('COMMAND_BAN_DESCRIPTION'),
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
    if (!member) {
      if (member.roles.highest.position >= message.member.roles.highest.position || !member.bannable) return message.sendMessage('このユーザーはBAN出来ません。理由: 自分より上の権限を持ったユーザーかこのボットの権限ではこのユーザーをBAN出来ない為')
    }
    await message.guild.members.ban(user, { days: days, reason: reason })
    return message.sendMessage(`${user.tag}をBANしました。`)
  }
}

module.exports = Ban

const { Command, KlasaMessage, KlasaUser } = require('klasa')
const { ModLogger } = require('../../../Yui')

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
    if (member !== null) {
      if (member.roles.highest.position >= message.member.roles.highest.position) return message.sendLocale('COMMAND_BAN_FAIL_POSITION')
      else if (!member.bannable) return message.sendLocale('COMMAND_BAN_FAIL_BANNABLE')
    }

    await message.guild.members.ban(user, { days: days, reason: reason })

    const logChannelID = message.guild.settings.mod.Logging
    const logChannel = message.guild.channels.has(logChannelID) ? message.guild.channels.get(logChannelID) : null
    if (logChannel !== null) {
      await new ModLogger(logChannel)
        .setModerator(message.author)
        .setReason(reason)
        .setTarget(user)
        .setType('BAN')
        .sendLog()
    }

    return message.sendLocale('COMMAND_BAN_DONE', user.tag)
  }
}

module.exports = Ban

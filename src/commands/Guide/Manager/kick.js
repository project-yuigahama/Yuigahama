const { Command, KlasaMessage } = require('klasa')
const { GuildMember } = require('discord.js')

/**
 * @extends Command
 */
class Kick extends Command {
  constructor (...args) {
    super(...args, {
      runIn: ['text'],
      permissionLevel: 4,
      requiredPermissions: ['KICK_MEMBERS'],
      descripition: language => language.get('COMMAND_KICK_DESCRIPTION'),
      usage: '<member:member> [reason:...string]',
      usageDelim: ' '
    })
  }

  /**
   * @param {KlasaMessage} message
   * @param {[GuildMember, string]} usage
   */
  async run (message, [member, reason = 'Not specified']) {
    if (member.roles.highest.position >= message.member.roles.highest.position) return message.sendMessage(message.language.get('COMMAND_KICK_FAIL_POSITION'))
    else if (!member.kickable) return message.sendMessage(message.language.get('COMMAND_KICK_FAIL_KICKABLE'))
    await member.kick(reason)
    return message.sendMessage(message.language.get('COMMAND_KICK_DONE', member.user.username))
  }
}

module.exports = Kick

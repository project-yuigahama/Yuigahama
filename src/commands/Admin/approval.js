const { Command, KlasaMessage, KlasaGuild } = require('klasa')

class Approval extends Command {
  constructor (...args) {
    super(...args, {
      runIn: ['text'],
      permissionLevel: 10,
      description: language => language.get('COMMAND_APPROVAL_DESCRIPTION'),
      usage: '<on|off> <id:string>',
      usageDelim: ' ',
      subcommands: true
    })
  }

  /**
   * @param {KlasaMessage} message
   * @param {[string]} usage
   */
  async on (message, [id]) {
    const guild = this.client.guilds.get(id)
    if ((guild instanceof KlasaGuild) === false) return message.sendLocale('COMMAND_APPROVAL_FAIL')
    if (guild.members.get(this.client.user.id) === null) return message.sendLocale('COMMAND_APPROVAL_FAIL')
    if (guild.settings.get('Approval') === true) return message.sendLocale('COMMAND_APPROVAL_ENABLED_RLREADY')
    await guild.settings.update('Approval', true)

    return message.sendLocale('COMMAND_APPROVAL_ENABLED')
  }

  /**
   * @param {KlasaMessage} message
   * @param {[string]} usage
   */
  async off (message, [id]) {
    const guild = this.client.guilds.get(id)
    if ((guild instanceof KlasaGuild) === false) return message.sendLocale('COMMAND_APPROVAL_FAIL')
    if (guild.members.get(this.client.user.id) === null) return message.sendLocale('COMMAND_APPROVAL_FAIL')
    if (guild.settings.get('Approval') === false) return message.sendLocale('COMMAND_APPROVAL_DISABLED_RLREADY')
    await guild.settings.update('Approval', false)

    return message.sendLocale('COMMAND_APPROVAL_DISABLED')
  }
}

module.exports = Approval

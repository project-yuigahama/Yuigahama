const { Command, KlasaMessage } = require('klasa')

module.exports = class extends Command {
  constructor (...args) {
    super(...args, {
      runIn: ['text'],
      requiredPermissions: ['MANAGE_MESSAGES'],
      permissionLevel: 6,
      description: '',
      usage: '<on|off>',
      subcommands: true
    })
  }

  /**
   * @param {KlasaMessage} message
   */
  async on (message) {
    if (message.guildSettings.get('Approval') === false) return message.sendLocale('COMMAND_IMAGE_FILTER_FAIL')
    await message.guildSettings.update('automod.ImageFilter', true)

    return message.sendLocale('COMMAND_IMAGE_FILTER_ON')
  }

  /**
   * @param {KlasaMessage} message
   */
  async off (message) {
    if (message.guildSettings.get('Approval') === false) return message.sendLocale('COMMAND_IMAGE_FILTER_FAIL')
    await message.guildSettings.update('automod.ImageFilter', false)

    return message.sendLocale('COMMAND_IMAGE_FILTER_OFF')
  }
}

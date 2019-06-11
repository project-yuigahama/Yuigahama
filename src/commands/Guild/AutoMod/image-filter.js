const { Command, KlasaMessage } = require('klasa')

module.exports = class extends Command {
  constructor (...args) {
    super(...args, {
      runIn: ['text'],
      requiredPermissions: ['MANAGE_MESSAGES'],
      permissionLevel: 6,
      description: language => language.get('COMMAND_IMAGE_FILTER_DESCRIPTION'),
      extendedHelp: language => language.get('COMMAND_IMAGE_FILTER_EXTENDED_HELP'),
      usage: '<on|off|level> [level:int{1,9}]',
      usageDelim: ' ',
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

  /**
   * @param {KlasaMessage} message
   * @param {[number]} usage
   */
  async level (message, [level]) {
    if (typeof level !== 'number') return message.sendLocale('COMMAND_IMAGE_FILTER_LEVEL_FAIL')
    await message.guildSettings.update('automod.FilterLevel', level)

    return message.sendMessage(message.language.get('COMMAND_IMAGE_FILTER_LEVEL_DONE', level))
  }
}

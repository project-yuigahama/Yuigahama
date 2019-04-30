const { Command, KlasaMessage } = require('klasa')

/**
 * @extends Command
 */
class OfficalGuild extends Command {
  constructor (...args) {
    super(...args, {
      runIn: ['dm'],
      description: language => language.get('COMMAND_OFFICIAL_GUILD_DESCRIPTION')
    })
  }

  /**
   * @param {KlasaMessage} message
   */
  async run (message) {
    return message.sendMessage('https://discord.gg/JJhtTvG')
  }
}

module.exports = OfficalGuild

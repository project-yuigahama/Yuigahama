const { Command, KlasaMessage } = require('klasa')
const os = require('os')
const { Utils: { getPlatform } } = require('../../../Yui')

/**
 * @extends Command
 */
class BotInfo extends Command {
  constructor (...args) {
    super(...args, {
      description: language => language.get('COMMAND_BOTINFO_DESCRIPTION')
    })
  }

  /**
   * @param {KlasaMessage} message
   */
  async run (message) {
    return message.sendCode('asciidoc', message.language.get('COMMAND_BOTINFO_STATUS', getPlatform(), os.cpus()[0].model, (os.totalmem() / 1024 / 1024 / 1024).toFixed(1)))
  }
}

module.exports = BotInfo

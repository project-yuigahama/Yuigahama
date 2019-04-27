const { Command, KlasaMessage } = require('klasa')

/**
 * @extends Command
 */
class Donate extends Command {
  constructor (...args) {
    super(...args, {
      description: language => language.get('COMMAND_DONATE_DESCRIPTION')
    })
  }

  /**
   * @param {KlasaMessage} message
   */
  async run (message) {
    return message.sendMessage('https://paypal.me/pools/c/8e04hFkdhp')
  }
}

module.exports = Donate

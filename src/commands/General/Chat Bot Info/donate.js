const { Command, KlasaMessage } = require('klasa')

/**
 * @extends Command
 */
class Donate extends Command {
  constructor (...args) {
    super(...args, {
      description: '寄付ページを送信します。',
      extendedHelp: 'No extended help available.'
    })
  }

  /**
   * @param {KlasaMessage} message
   */
  async run (message) {
    return message.sendMessage('https://www.paypal.me/inkohxdev')
  }
}

module.exports = Donate

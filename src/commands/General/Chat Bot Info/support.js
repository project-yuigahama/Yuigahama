const { Command, KlasaMessage } = require('klasa')

/**
 * @extends Command
 */
class Support extends Command {
  constructor (...args) {
    super(...args, {
      description: 'このボットの公式ギルドの招待URLを送信します。'
    })
  }

  /**
   * @param {KlasaMessage} message
   */
  async run (message) {
    return message.sendMessage('None')
  }
}

module.exports = Support

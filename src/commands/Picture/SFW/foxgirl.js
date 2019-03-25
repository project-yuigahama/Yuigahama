const { Command, KlasaMessage } = require('klasa')
const { MessageAttachment } = require('discord.js')
const { Nekoslife } = require('../../../Yui')

const api = new Nekoslife()

/**
 * @extends Command
 */
class FoxGirl extends Command {
  constructor (...args) {
    super(...args, {
      description: 'かわいい狐耳女の子の画像を表示します。',
      extendedHelp: 'No extended help available.'
    })
  }

  /**
   * @param {KlasaMessage} message
   */
  async run (message) {
    return message.send(new MessageAttachment((api.request(Nekoslife.END_POINTS_V3.fox, true)['data']['response']['url'])))
  }
}

module.exports = FoxGirl

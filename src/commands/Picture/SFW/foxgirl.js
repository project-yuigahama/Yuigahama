const { Command, KlasaMessage } = require('klasa')
const { MessageAttachment } = require('discord.js')
const { Nekoslife } = require('../../../Yui')

/**
 * @extends Command
 */
class FoxGirl extends Command {
  constructor (...args) {
    super(...args, {
      requiredPermissions: ['ATTACH_FILES'],
      description: '狐耳の女の子画像を送信します。',
      extendedHelp: 'No extended help available.'
    })
  }

  /**
   * @param {KlasaMessage} message
   */
  async run (message) {
    return message.send(new MessageAttachment((await Nekoslife.request(Nekoslife.END_POINTS_V3.fox, true))['data']['response']['url']))
  }
}

module.exports = FoxGirl

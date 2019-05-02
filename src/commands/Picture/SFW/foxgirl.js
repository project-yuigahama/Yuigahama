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
      description: language => language.get('COMMAND_FOXGIRL_DESCRIPTION')
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

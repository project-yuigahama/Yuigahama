const { Command, KlasaMessage } = require('klasa')
const { MessageAttachment } = require('discord.js')
const { Nekoslife } = require('../../../Yui')

/**
 * @extends Command
 */
class NekoGirl extends Command {
  constructor (...args) {
    super(...args, {
      requiredPermissions: ['ATTACH_FILES'],
      description: language => language.get('COMMAND_NEKOGIRL_DESCRIPTION'),
      extendedHelp: language => language.get('COMMAND_IMAGE_EXTENDED_HELP')
    })
  }

  /**
   * @param {KlasaMessage} message
   */
  async run (message) {
    if ('gif' in message.flags) return message.send(new MessageAttachment((await Nekoslife.request(Nekoslife.END_POINTS_V3.neko_gif, true))['data']['response']['url']))
    else return message.send(new MessageAttachment((await Nekoslife.request(Nekoslife.END_POINTS_V3.neko, true))['data']['response']['url']))
  }
}

module.exports = NekoGirl

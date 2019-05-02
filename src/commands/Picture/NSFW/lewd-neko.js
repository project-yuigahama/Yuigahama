const { Command, KlasaMessage } = require('klasa')
const { MessageAttachment } = require('discord.js')
const { Nekoslife } = require('../../../Yui')

/**
 * @extends Command
 */
class LewdNeko extends Command {
  constructor (...args) {
    super(...args, {
      nsfw: true,
      requiredPermissions: ['ATTACH_FILES'],
      description: language => language.get('COMMAND_LEWD_NEKOGIRL_DESCRIPTION'),
      extendedHelp: language => language.get('COMMAND_IMAGE_EXTENDED_HELP')
    })
  }

  /**
   * @param {KlasaMessage} message
   */
  async run (message) {
    if ('gif' in message.flags) return message.send(new MessageAttachment((await Nekoslife.request(Nekoslife.END_POINTS_V3.nsfw.neko_gif, true))['data']['response']['url']))
    else return message.send(new MessageAttachment((await Nekoslife.request(Nekoslife.END_POINTS_V3.nsfw.neko, true))['data']['response']['url']))
  }
}

module.exports = LewdNeko

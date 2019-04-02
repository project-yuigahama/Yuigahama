const { Command, KlasaMessage } = require('klasa')
const { MessageAttachment } = require('discord.js')
const { Nekoslife } = require('../../../Yui')

const api = new Nekoslife()

/**
 * @extends Command
 */
class NekoGirl extends Command {
  constructor (...args) {
    super(...args, {
      requiredPermissions: ['ATTACH_FILES'],
      description: '猫耳の女の子画像を送信します。',
      extendedHelp: ['--gif を付けるとGIF画像が送信されます。']
    })
  }

  /**
   * @param {KlasaMessage} message
   */
  async run (message) {
    if ('gif' in message.flags) return message.send(new MessageAttachment((await api.request(Nekoslife.END_POINTS_V3.neko_gif, true))['data']['response']['url']))
    else return message.send(new MessageAttachment((await api.request(Nekoslife.END_POINTS_V3.neko, true))['data']['response']['url']))
  }
}

module.exports = NekoGirl

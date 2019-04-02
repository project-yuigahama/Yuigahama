const { Command, KlasaMessage } = require('klasa')
const { MessageAttachment } = require('discord.js')
const { Nekoslife } = require('../../../Yui')

const api = new Nekoslife()

/**
 * @extends Command
 */
class LewdNeko extends Command {
  constructor (...args) {
    super(...args, {
      nsfw: true,
      requiredPermissions: ['ATTACH_FILES'],
      description: 'いやらしい猫耳の女の子画像を送信します。',
      extendedHelp: ['--gif を付けるとGIF画像が送信されます。']
    })
  }

  /**
   * @param {KlasaMessage} message
   */
  async run (message) {
    if ('gif' in message.flags) return message.send(new MessageAttachment((await api.request(Nekoslife.END_POINTS_V3.nsfw.neko_gif, true))['data']['response']['url']))
    else return message.send(new MessageAttachment((await api.request(Nekoslife.END_POINTS_V3.nsfw.neko, true))['data']['response']['url']))
  }
}

module.exports = LewdNeko

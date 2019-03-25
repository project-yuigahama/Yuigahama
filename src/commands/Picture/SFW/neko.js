const { Command, KlasaMessage } = require('klasa')
const { MessageAttachment } = require('discord.js')
const { Nekoslife } = require('../../../Yui')

module.exports = class extends Command {
  constructor (...args) {
    super(...args, {
      description: 'かわいい猫耳女の子の画像を送信します。',
      extendedHelp: ['--gif を付けるとGIF画像が送信されます。']
    })
  }

  /**
   * @param {KlasaMessage} message
   */
  async run (message) {
    const api = new Nekoslife()
    if ('gif' in message.flags) return message.send(new MessageAttachment((await api.request(Nekoslife.END_POINTS_V3.neko_gif, true))['data']['response']['url']))
    else return message.send(new MessageAttachment((await api.request(Nekoslife.END_POINTS_V3.neko, true))['data']['response']['url']))
  }
}

const { Command, KlasaMessage } = require('klasa')
const { MessageAttachment } = require('discord.js')
const { Nekoslife } = require('../../../Yui')

const api = new Nekoslife()

module.exports = class extends Command {
  constructor (...args) {
    super(...args, {
      description: '',
      extendedHelp: 'No extended help available.'
    })
  }

  /**
   * @param {KlasaMessage} message
   */
  async run (message) {
    return message.send(new MessageAttachment((await api.request(Nekoslife.END_POINTS_V3.kiss_gif, true))['data']['response']['url']))
  }
}

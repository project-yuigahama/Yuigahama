const { KlasaMessage } = require('klasa')
const { MessageEmbed } = require('discord.js')

class Logger {
  /**
   * @param {KlasaMessage} message
   */
  constructor (message) {
    if (typeof message === 'undefined') throw new Error('Undefined message.')

    /**
     * @type {KlasaMessage}
     */
    this.message = message

    /**
     * @type {MessageEmbed}
     */
    this._embed = new MessageEmbed()
  }

  get embed () {
    return this._embed
  }

  set embed (data) {
    this._embed = data

    return this
  }

  /**
   * @returns {KlasaMessage|KlasaMessage[]}
   */
  async sendLog () {
    return this.message.sendEmbed(this.embed)
  }
}

module.exports = Logger

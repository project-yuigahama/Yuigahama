const { KlasaMessage } = require('klasa')
const { TextChannel } = require('discord.js')

class Logger {
  /**
   * @param {TextChannel} channel
   */
  constructor (channel) {
    if (typeof channel === 'undefined') throw new Error('Undefined message.')

    /**
     * @type {KlasaMessage}
     */
    this.channel = channel
  }

  /**
   * @abstract
   * @returns {Promise<KlasaMessage|KlasaMessage[]>}
   */
  async sendLog () {
    throw new Error(`Missing method 'sendLog' of ${this.constructor.name}`)
  }
}

module.exports = Logger

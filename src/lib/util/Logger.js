const { KlasaMessage } = require('klasa')
const { TextChannel } = require('discord.js')

class Logger {
  /**
   * @param {TextChannel} channel
   */
  constructor (channel) {
    /**
     * @type {TextChannel}
     */
    this.channel = channel
  }

  /**
   * @abstract
   */
  async sendLog () {
    throw new Error(`Missing method 'sendLog' of ${this.constructor.name}`)
  }
}

module.exports = Logger

// @ts-check
const Logger = require('../util/Logger')
const { KlasaMessage, KlasaUser } = require('klasa')
const { MessageEmbed, Util, TextChannel } = require('discord.js')
const YuiUtil = require('../util/utils')

/**
 * @extends Logger
 */
class ModLogger extends Logger {
  /**
   * @param {TextChannel} channel
   */
  constructor (channel) {
    super(channel)

    /**
     * @type {KlasaUser}
     */
    this.moderator = null

    /**
     * @type {KlasaUser}
     */
    this.target = null

    /**
     * @type {string}
     */
    this.reason = 'Not specified'

    /**
     * @type {string}
     */
    this.type = 'UNKNOWN'
  }

  /**
   * @param {KlasaUser} user
   *
   * @returns {ModLogger}
   */
  setModerator (user) {
    this.moderator = user

    return this
  }

  /**
   * @param {KlasaUser} user
   *
   * @returns {ModLogger}
   */
  setTarget (user) {
    this.target = user

    return this
  }

  /**
   * @param {string|string[]} reason
   *
   * @returns {ModLogger}
   */
  setReason (reason) {
    this.reason = Util.resolveString(reason)

    return this
  }

  /**
   * @param {string} type
   *
   * @returns {ModLogger}
   */
  setType (type) {
    this.type = type

    return this
  }

  /**
   * @returns {Promise<KlasaMessage|KlasaMessage[]>}
   */
  async sendLog () {
    return this.channel.sendEmbed(new MessageEmbed()
      .setColor(YuiUtil.resolveModTypeColor(this.type))
      .setAuthor(this.moderator.tag, this.moderator.avatarURL())
      .addField('Member', this.target.tag, true)
      .addField('Action', this.type, true)
      .addField('Reason', this.reason, true)
      .setTimestamp()
    )
  }
}

module.exports = ModLogger

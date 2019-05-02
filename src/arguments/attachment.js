const { Argument, KlasaMessage, Possible } = require('klasa')
const { MessageAttachment } = require('discord.js')

class Attachment extends Argument {
  constructor (...args) {
    super(...args, {
      aliases: ['file']
    })
  }
  /**
   * @param {string} _args
   * @param {Possible} possible
   * @param {KlasaMessage} message
   *
   * @returns {MessageAttachment}
   */
  run (_args, possible, message) {
    // eslint-disable-next-line no-throw-literal
    if (!(message.attachments.first() instanceof MessageAttachment)) throw message.language.get('ARGUMENT_ATTACHMENT_NOT_FOUND', possible.name)
    return message.attachments.first()
  }
}

module.exports = Attachment

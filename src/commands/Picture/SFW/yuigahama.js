const { Command, KlasaMessage } = require('klasa')
const { MessageAttachment } = require('discord.js')
const fetch = require('node-fetch')
const YuigahamaError = require('../../../lib/error/YuigahamaError')

/**
 * @extends Command
 */
class Yuigahama extends Command {
  constructor (...args) {
    super(...args, {
      requiredPermissions: ['ATTACH_FILES'],
      aliases: ['yui'],
      description: language => language.get('COMMAND_YUIGAHAMA_DESCRIPTION')
    })
  }

  /**
   * @param {KlasaMessage} message
   */
  async run (message) {
    const res = await fetch('https://yuigahama.now.sh/api/v1/img/yuigahama')
      .then(res => res.json())
      .then(res => res.url)
      .catch(() => null)
    if (res === null) throw new YuigahamaError('Request failed')
    return message.send(new MessageAttachment(res))
  }
}

module.exports = Yuigahama

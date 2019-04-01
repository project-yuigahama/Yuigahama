const { Command, KlasaMessage } = require('klasa')
const os = require('os')
const { Utils: { getPlatform } } = require('../../../Yui')

/**
 * @extends Command
 */
class BotInfo extends Command {
  constructor (...args) {
    super(...args, {
      description: 'ボットが稼働している環境を表示します。',
      extendedHelp: 'No extended help available.'
    })
  }

  /**
   * @param {KlasaMessage} message
   */
  async run (message) {
    const info = [
      '= サーバー情報 =',
      '',
      `Platform       :: ${getPlatform()}`,
      `CPU            :: ${os.cpus()[0].model}`,
      `Memory         :: ${(os.totalmem() / 1024 / 1024 / 1024).toFixed(1)} GB`
    ].join('\n')
    return message.sendCode('asciidoc', info)
  }
}

module.exports = BotInfo

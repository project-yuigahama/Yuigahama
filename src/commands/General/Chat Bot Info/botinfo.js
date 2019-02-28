const { Command, KlasaMessage } = require('klasa')
const os = require('os')

/**
 * @extends Command
 */
module.exports = class BotInfo extends Command {

  constructor(...args) {
    super(...args, {
      description: ''
    })
  }

  /**
   * 
   * @param {KlasaMessage} message 
   */
  async run(message) {
    const info = [
      `Platform       :: ${this.getOS()}`,
      `CPU            :: ${os.cpus()[0].model}`,
      `Memory         :: ${(os.totalmem() / 1024 / 1024 / 1024).toFixed(1)} GB`,
    ].join('\n')
    return message.sendCode('asciidoc', info)
  }

  getPlatform() {
    const platform = process.platform
    switch (platform) {
    case 'win32':
      return 'Windows'
    case 'linux':
      return 'Linux'
    case 'darwin':
      return 'Mac'
    default:
      return platform
    }
  }
}

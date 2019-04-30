const { Command, KlasaMessage } = require('klasa')
const { Game: { MojangAPI } } = require('../../../Yui')

module.exports = class extends Command {
  constructor (...args) {
    super(...args, {
      description: language => language.get('COMMAND_MINECRAFT_UUID_DESCRIPITON'),
      usage: '<name:string>',
      aliases: ['mc-uuid']
    })
  }

  /**
   *
   * @param {KlasaMessage} message
   * @param {[string]} usage
   */
  async run (message, [name]) {
    const API = new MojangAPI(name)
    return message.sendCode('bash', await API.getUUID() || message.language('COMMAND_MINECRAFT_UUID_FAIL'))
  }
}

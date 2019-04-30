const { Command, KlasaMessage } = require('klasa')
const { Game: { MojangAPI } } = require('../../../Yui')

/**
 * @extends Command
 */
class MinecraftUUID extends Command {
  constructor (...args) {
    super(...args, {
      description: language => language.get('COMMAND_MINECRAFT_UUID_DESCRIPTION'),
      usage: '<name:string>',
      aliases: ['mc-uuid']
    })
  }

  /**
   * @param {KlasaMessage} message
   * @param {[string]} usage
   */
  async run (message, [name]) {
    const API = new MojangAPI(name)
    return message.sendCode('bash', await API.getUUID() || message.language.get('COMMAND_MINECRAFT_UUID_FAIL'))
  }
}

module.exports = MinecraftUUID

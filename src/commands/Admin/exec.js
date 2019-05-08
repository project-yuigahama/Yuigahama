const { Command, util, KlasaMessage } = require('klasa')

class Exec extends Command {
  constructor (...args) {
    super(...args, {
      guarded: true,
      permissionLevel: 10,
      description: language => language.get('COMMAND_EXEC_DESCRIPTION'),
      usage: '<cmd:...string>'
    })
  }

  /**
   * @param {KlasaMessage} message
   * @param {[string]} usage
   */
  async run (message, [cmd]) {
    let msg
    try {
      const { stdout } = await util.exec(cmd)
      const cleaned = util.clean(stdout)
      msg = await message.sendCode('prolog', cleaned)
    } catch (error) {
      msg = await message.sendCode('ts', error.stack)
    }

    return msg
  }
}

module.exports = Exec

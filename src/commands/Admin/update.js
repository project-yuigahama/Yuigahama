const { Command, util, KlasaMessage } = require('klasa')

class Update extends Command {
  constructor (...args) {
    super(...args, {
      runIn: ['dm'],
      guarded: true,
      permissionLevel: 10,
      description: 'masterブランチと同期してデータを更新します。',
      extendedHelp: 'No extended help available.'
    })
  }

  /**
   * @param {KlasaMessage} message
   */
  async run (message) {
    this.disable()
    let msg
    try {
      const { stdout } = await util.exec('git pull origin master')
      const cleaned = util.clean(stdout)
      msg = await message.sendMessage(cleaned)
      if (!cleaned.startsWith('Already up to date.')) {
        await util.exec('npm install')
        process.exit()
      }
    } catch (err) {
      msg = await message.sendCode('ts', err.stack)
    }
    this.enable()
    return msg
  }
}

module.exports = Update

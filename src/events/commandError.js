const { Event, KlasaMessage, Command } = require('klasa')
const { makeErrorReport } = require('../lib/error/Reporter')

class commandError extends Event {
  /**
   * @param {KlasaMessage} message
   * @param {Command} command
   * @param {any[]} params
   * @param {Error} error
   */
  run (message, command, params, error) {
    if (error instanceof Error) this.client.emit('wtf', `[COMMAND] ${command.path}\n${error.stack || error}`)
    if (error.message) message.sendCode('JSON', error.message).catch(err => this.client.emit('wtf', err)).finally(() => message.sendMessage('https://tenor.com/view/bfb-bfdi-tengolf-tennis-ball-golf-ball-gif-13631169'))
    else message.sendMessage(error).catch(err => this.client.emit('wtf', err))
    if ('ERROR_REPORT_CHANNEL_ID' in process.env && error instanceof Error) {
      if (this.client.ready) this.client.channels.get(process.env.ERROR_REPORT_CHANNEL_ID).sendCode('asciidoc', makeErrorReport(error, this.client)).catch(() => this.client.console.error('channel does not exist.'))
    }
  }
}

module.exports = commandError

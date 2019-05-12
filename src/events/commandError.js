const { Event } = require('klasa')
const { makeErrorReport } = require('../lib/error/Reporter')

class commandError extends Event {
  run (message, command, _params, error) {
    if (error instanceof Error) {
      this.client.emit('wtf', `[COMMAND] ${command.path}\n${error.stack || error}`)
      if ('ERROR_REPORT_CHANNEL_ID' in process.env) {
        this.client.channels.get(process.env.ERROR_REPORT_CHANNEL_ID).sendCode('asciidoc', makeErrorReport(error, this.client))
          .then(() => this.client.console.log('[REPORTER] An error report has been sent.'))
          .catch(() => this.client.console.warn('[REPORTER] Failed to send error report.'))
      }
    }
    if (error.message) message.sendCode('JSON', error.message).catch(err => this.client.emit('wtf', err))
    else message.sendMessage(error).catch(err => this.client.emit('wtf', err))
  }
}

module.exports = commandError

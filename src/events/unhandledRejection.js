const { Event } = require('klasa')
const { makeErrorReport } = require('../lib/error/Reporter')

class unhandledRejection extends Event {
  constructor (...args) {
    super(...args, { emitter: process })
    if (this.client.options.production) this.unload()
  }

  run (error) {
    if (!error) return
    this.client.emit('error', `Uncaught Promise Error: \n${error.stack || error}`)
    if ('ERROR_REPORT_CHANNEL_ID' in process.env) {
      if (this.client.ready) this.client.channels.get(process.env.ERROR_REPORT_CHANNEL_ID).sendCode('asciidoc', makeErrorReport(error, this.client)).catch(() => this.client.console.error('channel does not exist.'))
    }
  }
}

module.exports = unhandledRejection

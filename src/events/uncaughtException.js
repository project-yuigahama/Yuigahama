const { Event } = require('klasa')
const { makeCrashReport } = require('../lib/error/Reporter')

class uncaughtException extends Event {
  constructor (...args) {
    super(...args, { emitter: process })
    if (this.client.options.production) this.unload()
  }

  /**
   * @param {Error} error
   */
  run (error) {
    if (!(error instanceof Error)) process.exit(1)
    this.client.emit('error', error.stack || error)
    if ('CRASH_REPORT_CHANNEL_ID' in process.env) {
      if (this.client.ready) {
        this.client.channels.get(process.env.CRASH_REPORT_CHANNEL_ID).sendCode('asciidoc', makeCrashReport(error, this.client)).finally(() => process.exit(1))
      } else process.exit(1)
    }
  }
}

module.exports = uncaughtException

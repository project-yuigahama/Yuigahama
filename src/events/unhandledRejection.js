const { Event } = require('klasa')
const { makeErrorReport } = require('../lib/error/Reporter')

/**
 * @extends Event
 */
class unhandledRejection extends Event {
  constructor (...args) {
    super(...args, { emitter: process })
    if (this.client.options.production) this.unload()
  }

  /**
   * @param {Error} error
   */
  run (error) {
    if (!(error instanceof Error) || error.name === 'DiscordAPIError' || (error.message || '').includes('ENOTFOUND')) return
    this.client.emit('error', `Uncaught Promise Error: \n${error.stack || error}`)
    if ('ERROR_REPORT_CHANNEL_ID' in process.env) {
      if (this.client.ready) {
        this.client.channels.get(process.env.ERROR_REPORT_CHANNEL_ID).sendCode('asciidoc', makeErrorReport(error, this.client))
          .then(() => this.client.console.log('[REPORTER] An error report has been sent.'))
          .catch(() => this.client.console.warn('[REPORTER] Failed to send error report.'))
      }
    }
  }
}

module.exports = unhandledRejection

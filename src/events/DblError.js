const { Event } = require('klasa')
const { makeErrorReport } = require('../lib/error/Reporter')

/**
 * @extends Event
 */
class DblError extends Event {
  /**
   * @param {Error} error
   */
  run (error) {
    if (!(error instanceof Error)) return
    this.client.emit('error', error.stack || error)
    if ('ERROR_REPORT_CHANNEL_ID' in process.env) {
      this.client.channels.get(process.env.ERROR_REPORT_CHANNEL_ID).sendCode('asciidoc', makeErrorReport(error, this.client))
        .then(() => this.client.console.log('[REPORTER] An error report has been sent.'))
        .catch(() => this.client.console.warn('[REPORTER] Failed to send error report.'))
    }
  }
}

module.exports = DblError

const { Event } = require('klasa')
const { makeCrashReport } = require('../lib/error/Reporter')

module.exports = class extends Event {
  constructor (...args) {
    super(...args, { emitter: process })
    if (this.client.options.production) this.unload()
  }

  run (error) {
    if (!(error instanceof Error)) process.exit(1)
    if ('CRASH_REPORT_CHANNEL_ID' in process.env) {
      if (this.client.ready) {
        this.client.channels.get(process.env.CRASH_REPORT_CHANNEL_ID).sendCode('asciidoc', makeCrashReport(error, this.client))
          .catch(() => {
            this.client.console.error('channel does not exist.')
            process.exit(1)
          }).finally(() => process.exit(1))
      } else process.exit(1)
    }
  }
}

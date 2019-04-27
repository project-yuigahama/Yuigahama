const { Language } = require('klasa')

module.exports = class extends Language {
  constructor (...args) {
    super(...args)
    this.language = {
      MEMBER_JOIN: (name) => `${name} has joined the server.`,
      MEMBER_QUIT: (name) => `${name} has left the server.`,
      COMMAND_DONATE_DESCRIPTION: 'Send donation page URL.'
    }
  }

  async init () {
    await super.init()
  }
}

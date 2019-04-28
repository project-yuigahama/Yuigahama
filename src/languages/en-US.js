const { Language } = require('klasa')

module.exports = class extends Language {
  constructor (...args) {
    super(...args)
    this.language = {
      MEMBER_JOIN: (name) => `${name} has joined the server.`,
      MEMBER_QUIT: (name) => `${name} has left the server.`,
      COMMAND_DONATE_DESCRIPTION: 'Send donation page URL.',
      COMMAND_KICK_DESCRIPTION: 'Kick member from the guild.',
      COMMAND_KICK_FAIL_POSITION: 'You can not process this member.',
      COMMAND_KICK_FAIL_KICKABLE: 'I am not able to kick this member, sorry.',
      COMMAND_KICK_DONE: (name) => `${name} has been kicked from the guild.`
    }
  }

  async init () {
    await super.init()
  }
}

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
      COMMAND_KICK_FAIL_KICKABLE: 'I am not able to kick this member, Sorry.',
      COMMAND_KICK_DONE: (name) => `${name} has been kicked from the guild.`,
      COMMAND_MINECRAFT_UUID_DESCRIPITON: 'Get UUID from player name.',
      COMMAND_MINECRAFT_UUID_FAIL: 'Could not get UUID. The player name may be wrong.'
    }
  }

  async init () {
    await super.init()
  }
}

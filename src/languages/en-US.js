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
      COMMAND_MINECRAFT_UUID_DESCRIPTION: 'Get UUID from player name.',
      COMMAND_MINECRAFT_UUID_FAIL: 'Could not get UUID. The player name may be wrong.',
      COMMAND_MINECRAFT_NAMEHISTORY_DESCRIPTION: 'Send player\'s name history.',
      COMMAND_OFFICIAL_GUILD_DESCRIPTION: 'Send the official guild invite URL.'
    }
  }

  async init () {
    await super.init()
  }
}

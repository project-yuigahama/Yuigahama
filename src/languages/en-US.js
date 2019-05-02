const { Language } = require('klasa')

module.exports = class extends Language {
  constructor (...args) {
    super(...args)
    this.language = {
      MEMBER_JOIN: (name) => `${name} has joined the server.`,
      MEMBER_QUIT: (name) => `${name} has left the server.`,
      COMMAND_DONATE_DESCRIPTION: 'Send donation page URL.',
      COMMAND_BAN_DESCRIPTION: 'Ban members from the guild.',
      COMMAND_KICK_DESCRIPTION: 'Kick member from the guild.',
      COMMAND_KICK_FAIL_POSITION: 'You can not process this member.',
      COMMAND_KICK_FAIL_KICKABLE: 'I am not able to kick this member, Sorry.',
      COMMAND_KICK_DONE: (name) => `${name} has been kicked from the guild.`,
      COMMAND_MINECRAFT_UUID_DESCRIPTION: 'Get UUID from player name.',
      COMMAND_MINECRAFT_UUID_FAIL: 'Could not get UUID. The player name may be wrong.',
      COMMAND_MINECRAFT_NAMEHISTORY_DESCRIPTION: 'Send player name history.',
      COMMAND_OFFICIAL_GUILD_DESCRIPTION: 'Send the official guild invite URL.',
      COMMAND_FOXGIRL_DESCRIPTION: 'Send fox girl images.',
      COMMAND_NEKOGIRL_DESCRIPTION: 'Send neko girl images.',
      COMMAND_DOG_DESCRIPITON: 'Send dog images.',
      COMMAND_CAT_DESCRIPTION: 'Send cat images.',
      COMMAND_LEWD_FOXGIRL_DESCRIPTION: 'Send lewd fox girl images.',
      COMMAND_LEWD_NEKOGIRL_DESCRIPTION: 'Send lewd neko girl images.',
      COMMAND_HENTAI_DESCRIPTION: 'Send lewd images.',
      COMMAND_AVATAR_DESCRIPTION: 'Send avatar images of yourself or other users.',
      COMMAND_BOTINFO_DESCRIPTION: 'Shows the environment in which the bot is running.',
      COMMAND_POCKETMINE_DESCRIPTION: 'View the details of the latest PocketMine-MP release.',
      COMMAND_POGGIT_DESCRIPTION: 'Search for PocketMine-MP plugins from Poggit.',
      COMMAND_DISCORDJS_DESCRIPTION: 'Search the document of Discord.js.',
      COMMAND_CHANNEL_INFO_DESCRIPTION: 'You can check the channel information.',
      COMMAND_GUILD_INFO_DESCRIPTION: 'You can check the information of the guild.',
      COMMAND_MEMBER_INFO_DESCRIPTION: 'You can check the information of guild members.',
      COMMAND_ROLE_INFO_DESCRIPTION: 'You can check the position information.',
      COMMAND_UPDATE_DESCRIPTION: 'Update data in sync with the master branch.'
    }
  }

  async init () {
    await super.init()
  }
}

const { Command, KlasaMessage } = require('klasa')
const { User, MessageAttachment } = require('discord.js')

class Avatar extends Command {
  constructor (...args) {
    super(...args, {
      enabled: true,
      requiredPermissions: ['ATTACH_FILES'],
      description: '自身または他のユーザーのアバター画像を表示します。',
      extendedHelp: 'No extended help available.',
      usage: '[user:user]'
    })
  }

  /**
   * @param {KlasaMessage} message
   * @param {User[]} user
   */
  async run (message, [user = null]) {
    return message.send(new MessageAttachment(user ? user.avatarURL({ size: 1024 }) : message.author.avatarURL({ size: 1024 })))
  }
}

module.exports = Avatar

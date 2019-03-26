const { Command, KlasaMessage } = require('klasa')
const { User, MessageAttachment } = require('discord.js')

class Avatar extends Command {
  constructor (...args) {
    super(...args, {
      enabled: true,
      requiredPermissions: ['ATTACH_FILES'],
      description: '自身または他のユーザーのアバター画像を送信します。',
      extendedHelp: 'No extended help available.',
      usage: '[user:user]'
    })
  }

  /**
   * @param {KlasaMessage} message
   * @param {[User]} usage
   */
  async run (message, [user = null]) {
    return message.send(new MessageAttachment(user ? user.avatarURL({ size: 2048 }) : message.author.avatarURL({ size: 2048 })))
  }
}

module.exports = Avatar

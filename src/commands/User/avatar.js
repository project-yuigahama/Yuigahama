const { Command, KlasaMessage } = require('klasa')
const { User, MessageAttachment } = require('discord.js')

class Avatar extends Command {
  constructor (...args) {
    super(...args, {
      requiredPermissions: ['ATTACH_FILES'],
      description: language => language.get('COMMAND_AVATAR_DESCRIPTION'),
      usage: '[user:user]'
    })
  }

  /**
   * @param {KlasaMessage} message
   * @param {[User]} usage
   */
  async run (message, [user = null]) {
    return message.send(new MessageAttachment(user ? user.avatarURL({ size: 2048 }) : message.author.avatarURL({ size: 2048, format: 'png' })))
  }
}

module.exports = Avatar

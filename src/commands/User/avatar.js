const { Command, KlasaMessage } = require('klasa')
const { User, MessageAttachment } = require('discord.js')

module.exports = class extends Command {
  constructor (...args) {
    super(...args, {
      enabled: true,
      runIn: ['text'],
      requiredPermissions: [],
      description: '',
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

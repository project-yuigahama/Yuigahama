const { Command, KlasaMessage } = require('klasa')
const { TextChannel, VoiceChannel, MessageEmbed } = require('discord.js')

module.exports = class extends Command {
  constructor (...args) {
    super(...args, {
      runIn: ['text'],
      requiredPermissions: ['EMBED_LINKS'],
      description: language => language.get('COMMAND_CHANNEL_INFO_DESCRIPTION'),
      extendedHelp: language => language.get('COMMAND_CHANNEL_INFO_EXTENDED_HELP'),
      usage: '<channel:channel>'
    })
  }

  /**
   * @param {KlasaMessage} message
   * @param {[TextChannel|VoiceChannel]} usage
   */
  async run (message, [channel]) {
    if (channel instanceof TextChannel) {
      return message.sendEmbed(new MessageEmbed()
        .setTitle('ChannelInfo')
        .setDescription(channel.topic || 'None')
        .addField('Name', channel.name, true)
        .addField('ID', channel.id, true)
        .addField('Type', 'Text Channel', true)
        .addField('Typing Count', channel.typingCount, true)
        .addField('NSFW', channel.nsfw ? 'Yes' : 'No', true)
      )
    }
    if (channel instanceof VoiceChannel) {
      return message.sendEmbed(new MessageEmbed()
        .setTitle('ChannelInfo')
        .addField('Name', channel.name, true)
        .addField('ID', channel.id, true)
        .addField('Type', 'Voice Channel', true)
        .addField('Members', channel.members.size, true)
        .addField('Limit', channel.userLimit ? channel.userLimit : 'Infinity', true)
      )
    }
    return message.sendLocale('NOT_CHANNEL_SUPPORT')
  }
}

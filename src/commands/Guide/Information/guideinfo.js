const { Command, KlasaMessage } = require('klasa')
const { MessageEmbed } = require('discord.js')

/**
 * @extends Command
 */
class GuideInfo extends Command {
  constructor (...args) {
    super(...args, {
      description: 'ギルド(サーバー)の情報を確認出来ます。',
      extendedHelp: 'No extended help available.',
      runIn: ['text'],
      requiredPermissions: ['EMBED_LINKS'],
      aliases: ['serverinfo']
    })
  }

  /**
   *
   * @param {KlasaMessage} message
   */
  async run (message) {
    const memberCount = [
      `Total: ${message.guild.memberCount}`,
      '',
      `Online: ${message.guild.members.filter(member => member.presence.status === 'online').size}`,
      `Idle: ${message.guild.members.filter(member => member.presence.status === 'idle').size}`,
      `Dnd: ${message.guild.members.filter(member => member.presence.status === 'dnd').size}`,
      `Offline: ${message.guild.members.filter(member => member.presence.status === 'offline').size}`,
      `Bot: ${message.guild.members.filter(member => member.user.bot === true).size}`
    ].join('\n')

    const Channels = [
      `Total: ${message.guild.channels.size}`,
      '',
      `Category: ${message.guild.channels.filter(channel => channel.type === 'category').size}`,
      `Text: ${message.guild.channels.filter(channel => channel.type === 'text').size}`,
      `Voice: ${message.guild.channels.filter(channel => channel.type === 'voice').size}`
    ].join('\n')

    const Emojis = [
      `Total: ${message.guild.emojis.size}`,
      '',
      `Emoji: ${message.guild.emojis.filter(emoji => emoji.animated === false).size}`,
      `Animation: ${message.guild.emojis.filter(emoji => emoji.animated === true).size}`
    ].join('\n')

    return message.sendEmbed(new MessageEmbed()
      .setTitle(message.guild.name)
      .setThumbnail(message.guild.iconURL({ size: 512 }))
      .setTimestamp(message.guild.createdAt)
      .setFooter('Created At')
      .addField('Guide ID', message.guild.id, true)
      .addField('Owner', message.guild.owner.user.tag, true)
      .addField('Members', memberCount, true)
      .addField('Channels', Channels, true)
      .addField('Emojis', Emojis, true)
      .addField('Region', message.guild.region.toUpperCase(), true)
      .addField('Roles', `Total: ${message.guild.roles.size}\n\n${message.guild.roles.map(role => role.name).join(', ')}`, true)
    )
  }
}

module.exports = GuideInfo

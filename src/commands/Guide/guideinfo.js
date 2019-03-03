const { Command, KlasaMessage } = require('klasa')
const {MessageEmbed} = require('discord.js')

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'ギルド(サーバー)の情報を表示します。',
      runIn: ['text'],
      requiredPermissions: ['EMBED_LINKS'],
      aliases: ['serverinfo'],
    })
  }

  /**
   * 
   * @param {KlasaMessage} message 
   */
  async run(message) {
    const memberCount = [
      `Total: ${message.guild.memberCount}`,
      `Online: ${message.guild.members.filter(member => member.presence.status === 'online').size}`,
      `Idle: ${message.guild.members.filter(member => member.presence.status === 'idle').size}`,
      `Dnd: ${message.guild.members.filter(member => member.presence.status === 'dnd').size}`,
      `Offline: ${message.guild.members.filter(member =>  member.presence.status === 'offline').size}`,
      `Bot: ${message.guild.members.filter(member => member.user.bot === true).size}`
    ].join('\n')
    return message.sendEmbed(new MessageEmbed()
      .setTitle(message.guild.name)
      .setThumbnail(message.guild.iconURL({size: 512}))
      .setTimestamp(message.guild.createdAt)
      .setFooter('Created At')
      .addField('Guide ID', message.guild.id, true)
      .addField('Owner', message.guild.owner.displayName, true)
      .addField('Members', memberCount, true)
      .addField('Channels', message.guild.channels.size, true)
      .addField('Emojis', message.guild.emojis.size, true)
      .addField('Roles', message.guild.roles.size, true)
      .addField('Region', message.guild.region.toUpperCase(), true)
    )
  }
}

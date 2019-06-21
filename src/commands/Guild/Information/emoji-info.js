const { Command, KlasaMessage, Timestamp } = require('klasa')
const { MessageEmbed, GuildEmoji } = require('discord.js')

module.exports = class extends Command {
  constructor (...args) {
    super(...args, {
      runIn: ['text'],
      description: language => language.get('COMMAND_EMOJI_INFO_DESCRIPTION'),
      usage: '<emoji:emoji>'
    })
  }

  /**
   * @param {KlasaMessage} message
   * @param {[GuildEmoji]} usage
   */
  async run (message, [emoji]) {
    const Embed = new MessageEmbed()
      .setColor('RANDOM')
      .setThumbnail(emoji.url)
      .addField('Emoji name', emoji.name, true)
      .addField('ID', emoji.id, true)
      .addField('Animated', emoji.animated ? 'Yes' : 'No', true)
      .addField('Deleted', emoji.deleted ? 'Yes' : 'No', true)
      .addField('Created At', new Timestamp('YYYY-MM-DD HH:mm:ss').display(emoji.createdTimestamp), true)

    const author = await emoji.fetchAuthor().catch(() => null)

    if (author === null) return message.sendEmbed(Embed)
    else return message.sendEmbed(Embed.setAuthor(`${author.tag} has added.`, author.avatarURL({ format: 'png' })))
  }
}

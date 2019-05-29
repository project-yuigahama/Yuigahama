const { Command, KlasaMessage, RichDisplay } = require('klasa')
const { MessageEmbed } = require('discord.js')

class TopInvite extends Command {
  constructor (...args) {
    super(...args, {
      requiredPermissions: ['MANAGE_GUILD', 'MANAGE_MESSAGES'],
      runIn: ['text'],
      description: language => language.get('COMMAND_TOP_INVITE_DESCRIPTION')
    })
  }

  /**
   * @param {KlasaMessage} message
   */
  async run (message) {
    const invites = await message.guild.fetchInvites()
    const inviters = []

    if (invites.size === 0) return message.sendMessage(message.language.get('COMMAND_TOP_INVITE_NOT_FOUND'))
    invites.map((invite) => {
      inviters.push({ inviter: invite.inviter ? invite.inviter : null, url: invite.url, uses: invite.uses, createdAt: invite.createdAt })
    })

    inviters.sort((a, b) => {
      return a.uses < b.uses
    })

    const Display = new RichDisplay()
    let count = 0

    inviters.forEach((value) => {
      count++
      Display.addPage(new MessageEmbed()
        .setColor('RANDOM')
        .setThumbnail(value.inviter.avatarURL({ format: 'png' }) || 'https://discordapp.com/assets/dd4dbc0016779df1378e7812eabaa04d.png')
        .setTitle(`${value.inviter !== null ? value.inviter.tag : 'Unknown'} - Top ${count}`)
        .addField('URL', value.url, true)
        .addField('Uses', value.uses, true)
        .setTimestamp(value.createdAt)
      )
    })

    return Display.run(await message.send('Loading...'))
  }
}

module.exports = TopInvite

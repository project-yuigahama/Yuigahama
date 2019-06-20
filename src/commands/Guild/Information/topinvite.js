const { Command, KlasaMessage, RichDisplay, Timestamp } = require('klasa')
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
    const top = invites.filter(invite => invite.uses > 0).sort((a, b) => b.uses - a.uses).first(10)
    if (top.length === 0) throw message.language.get('COMMAND_TOP_INVITE_FAIL')

    const Display = new RichDisplay()
    let count = 0

    top.map((invite) => {
      count++
      Display.addPage(new MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`Top ${count}`)
        .addField('Uses', invite.uses, true)
        .addField('Code', invite.code, true)
        .addField('Author', invite.inviter !== null ? invite.inviter.tag : 'Deleted', true)
        .addField('Created At', new Timestamp('YYYY-MM-DD HH:mm:ss').display(invite.createdTimestamp), true)
      )
    })

    return Display.run(message)
  }
}

module.exports = TopInvite

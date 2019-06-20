const { Command, KlasaMessage, RichDisplay } = require('klasa')
const { MessageEmbed } = require('discord.js')
const fetch = require('node-fetch')

class TruckersMP extends Command {
  constructor (...args) {
    super(...args, {
      enabled: true,
      requiredPermissions: ['MANAGE_MESSAGES'],
      description: language => language.get('COMMAND_TRUCKERS_MP_DESCRIPTION')
    })
  }

  /**
   * @param {KlasaMessage} message
   */
  async run (message) {
    const data = await fetch('https://stats.truckersmp.com/api/v4/overall.json').then(res => res.json()).catch(() => null)
    if (data === null) throw new Error('Request failed.')
    if (data.error === true) return message.sendMessage('Error.')
    const Display = new RichDisplay()

    for (let index = 0; index < data.color.length; index++) {
      const color = data.color[index]
      const embed = new MessageEmbed().setColor(color)
      const server = data.data[index]
      embed.setTitle(server.name).addField('Players', server.players, true).addField('Max Players', server.max_players, true)
      Display.addPage(embed)
    }

    return Display.run(message)
  }
}

module.exports = TruckersMP

const { Command, KlasaMessage, RichDisplay, Timestamp } = require('klasa')
const { MessageEmbed, Util } = require('discord.js')
const { Game: { MojangAPI } } = require('../../../Yui')

/**
 * @extends Command
 */
class MinecraftNameHistory extends Command {
  constructor (...args) {
    super(...args, {
      description: language => language.get('COMMAND_MINECRAFT_NAMEHISTORY_DESCRIPTION'),
      usage: '<name:string>',
      aliases: ['mc-namehistory', 'mc-nh'],
      requiredPermissions: ['MANAGE_MESSAGES']
    })
  }

  /**
   * @param {KlasaMessage} message
   * @param {[string]} usage
   */
  async run (message, [name]) {
    const API = new MojangAPI(name)
    const data = await API.getNameHistory()

    if (data.message) return message.sendMessage(data.message)

    const Display = new RichDisplay()
    data.forEach((value) => Display.addPage(new MessageEmbed().addField(Util.escapeMarkdown(value.name), value.changedToAt ? `Updated:  ${new Timestamp('YYYY-MM-DD HH:mm:ss').display(value.changedToAt)}` : 'Initial name', true).setTitle(`${name} - Name History`).setColor('RANDOM')))

    return Display.run(await message.send('Loading...'))
  }
}

module.exports = MinecraftNameHistory

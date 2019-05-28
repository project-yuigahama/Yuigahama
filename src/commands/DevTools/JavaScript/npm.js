const { Command, KlasaMessage, RichDisplay } = require('klasa')
const { MessageEmbed } = require('discord.js')
const fetch = require('node-fetch')

class NPM extends Command {
  constructor (...args) {
    super(...args, {
      requiredPermissions: [],
      description: '',
      usage: '<search|specify> <query:...string>',
      usageDelim: ' ',
      subcommands: true
    })
  }

  /**
   * @param {KlasaMessage} message
   * @param {[string]} usage
   */
  async search (message, [query]) {
    const data = await fetch(`https://www.npmjs.com/search/suggestions?q=${encodeURIComponent(query)}`)
      .then(res => res.json())
      .catch(() => null)
    if (data === null) throw Error('Request failed.')
    const Display = new RichDisplay()
    data.forEach(value => {
      Display.addPage(new MessageEmbed()
        .setTitle(`${value.name} - v${value.version}`)
        .setDescription(value.description)
        .addField('Keywords', value.keywords.join(', '), true)
        .addField('Date', value.date, true)
        .addField('Author', value.author.name, true)
      )
    })

    return Display.run(await message.send('Loading...'))
  }
}

module.exports = NPM

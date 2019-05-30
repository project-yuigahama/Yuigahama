const { Command, KlasaMessage, RichDisplay, Timestamp } = require('klasa')
const { MessageEmbed } = require('discord.js')
const fetch = require('node-fetch')

class NPM extends Command {
  constructor (...args) {
    super(...args, {
      requiredPermissions: [],
      description: '',
      usage: '<search|registry> <query:...string>',
      usageDelim: ' ',
      subcommands: true
    })

    this.timestamp = new Timestamp('YYYY-MM-DD hh:mm:ss')
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
        .setDescription(value.description || 'None')
        .addField('Keywords', value.keywords ? value.keywords.join(', ') : 'None', true)
        .addField('Date', this.timestamp.display(value.date), true)
        .addField('Author', value.author ? value.author.name : 'None', true)
      )
    })

    return Display.run(await message.send('Loading...'))
  }

  /**
   * @param {KlasaMessage} message
   * @param {[string]} param
   */
  async registry (message, [query]) {
    const data = await fetch(`https://registry.npmjs.com/${query}`)
      .then(res => res.json())
      .catch(() => null)

    if (data === null) throw new Error('Request failed.')
    else if (data.error) return message.sendMessage(data.error)

    return message.sendEmbed(new MessageEmbed()
      .setColor('RED')
      .setTitle(data['name'])
      .setURL(`https://www.npmjs.com/package/${query}`)
      .setDescription(data['description'] || 'None')
      .addField('Version', data['dist-tags']['latest'], true)
      .addField('Author', data.author ? data.author.name : '???', true)
      .addField('Creation Date', this.timestamp.display(data['time']['created']), true)
      .addField('Modification Date', this.timestamp.display(data['time']['modified']), true)
      .addField('Keywords', data.keywords ? data['keywords'].join(', ') : 'None', true)
      .addField('License', data['license'] || 'None', true)
      .addField('Homepage', data['homepage'] || 'None', true)
    )
  }
}

module.exports = NPM

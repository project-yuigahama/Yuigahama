const { Command, KlasaMessage, RichDisplay } = require('klasa')
const { MessageEmbed } = require('discord.js')
const fetch = require('node-fetch')

class MDN extends Command {
  constructor (...args) {
    super(...args, {
      requiredPermissions: ['MANAGE_MESSAGES'],
      description: language => language.get('COMMAND_MDN_DESCRIPTION'),
      usage: '<query:...string>'
    })
  }

  /**
   * @param {KlasaMessage} message
   * @param {[string]} param1
   */
  async run (message, [query]) {
    const data = await fetch(`https://developer.mozilla.org/en-US/search.json?q=${encodeURIComponent(query)}&highlight=false`)
      .then(res => res.json())
      .catch(() => null)
    if (data === null) throw new Error('Request failed.')

    const Display = new RichDisplay()
    const Documents = data['documents']
    if (!Documents) return message.sendMessage(`Information matching \`${query}\` could not be found.`)
    Documents.forEach((value) => {
      Display.addPage(new MessageEmbed()
        .setColor('RANDOM')
        .setThumbnail('https://i.imgur.com/EWsjZJa.png')
        .setTitle(`${value['title']} - ${value['slug']}`)
        .setURL(value['url'])
        .setDescription(value['excerpt'])
        .addField('Tags', value.tags.join(', '), true)
      )
    })

    return Display.run(await message.send('Loading...'))
  }
}

module.exports = MDN

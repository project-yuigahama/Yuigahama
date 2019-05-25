const { Command, KlasaMessage, RichDisplay } = require('klasa')
const { MessageEmbed, Util } = require('discord.js')
const { Game: { FortniteAPI, FortniteUserAPI } } = require('../../../Yui')

/**
 * @extends Command
 */
class Fortnite extends Command {
  constructor (...args) {
    super(...args, {
      description: language => language.get('COMMAND_FORTNITE_DESCRIPTION'),
      usage: '<news|challenges|user> [string:...string]',
      requiredPermissions: ['MANAGE_MESSAGES'],
      subcommands: true,
      usageDelim: ' '
    })
  }

  /**
   * @param {KlasaMessage} message
   * @param {[string]} usage
   */
  async user (message, [string]) {
    if (typeof string !== 'string') return message.sendMessage('')
    const User = new FortniteUserAPI(string)

    const UserName = await User.getUsername()
    if (UserName === null) return message.sendMessage('User not found.')
    const Display = new RichDisplay()

    const Platforms = await User.getPlatforms()
    if (Platforms !== null) Display.addPage(new MessageEmbed().addField(`${UserName} - Platforms`, Platforms.join('\n'), true).setColor('RANDOM'))

    const UserData = await User.getStats()
    if (UserData !== null) {
      Display.addPage(new MessageEmbed().addField(`${UserName} - Devices`, UserData.devices.join('\n'), true).setColor('RANDOM'))

      const defaultModes = UserData['overallData']['defaultModes']
      Display.addPage(new MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`${UserName} - default Modes`)
        .addField('Players out lived', defaultModes['playersoutlived'], true)
        .addField('Kills', defaultModes['kills'], true)
        .addField('Win', defaultModes['placetop1'], true)
        .addField('Score', defaultModes['score'], true)
        .addField('Play', defaultModes['matchesplayed'], true)
        .addField('Playlists', defaultModes['includedPlaylists'].join('\n'), true)
      )

      const ltmModes = UserData['overallData']['ltmModes']
      Display.addPage(new MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`${UserName} - ltmModes`)
        .addField('Play', ltmModes['matchesplayed'], true)
        .addField('Win', ltmModes['placetop1'], true)
        .addField('Players out lived', ltmModes['playersoutlived'], true)
        .addField('Score', ltmModes['score'], true)
        .addField('Kills', ltmModes['kills'], true)
        .addField('Playlists', ltmModes['includedPlaylists'].join('\n'), true)
      )

      const TeamModes = UserData['overallData']['largeTeamModes']
      Display.addPage(new MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`${UserName} - TeamModes`)
        .addField('Win', TeamModes['placetop1'], true)
        .addField('Play', TeamModes['matchesplayed'], true)
        .addField('Kills', TeamModes['kills'], true)
        .addField('Playlists', TeamModes['includedPlaylists'].join('\n'), true)
      )
    }

    return Display.run(await message.send('Loading'))
  }

  /**
   * @param {KlasaMessage} message
   */
  async news (message) {
    const data = await FortniteAPI.getNews()
    if (data.success === false) return message.sendMessage('FortniteAPI is down.')
    const Display = new RichDisplay()
    data.entries.forEach((value) => {
      Display.addPage(new MessageEmbed()
        .setColor(value['meta']['mainColor'] || 'RANDOM')
        .setThumbnail('https://i.imgur.com/8sfn8AV.jpg')
        .setTitle(`${value['title'] || '???'} - ${value['meta']['adSpace'] || '???'}`)
        .setDescription(value['body'] || '???')
        .setImage(value['image'] || null)
      )
    })

    return Display.run(await message.send('Getting news...'))
  }

  /**
   * @param {KlasaMessage} message
   */
  async challenges (message) {
    const data = await FortniteAPI.getChallenges()
    if (data.success === false) return message.sendMessage('FortniteAPI is down.')
    const Display = new RichDisplay()
    data.challenges.week1.forEach((value) => {
      Display.addPage(new MessageEmbed()
        .setThumbnail(data['star'])
        .setColor('YELLOW')
        .setTitle('Challenges')
        .setDescription(value['challenge'])
        .addField('Star', value['stars'], true)
        .addField('Difficulty', value['difficulty'], true)
      )
    })

    return Display.run(await message.send('Getting challenges...'))
  }
}

module.exports = Fortnite

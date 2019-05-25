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
      Display.addPage(new MessageEmbed()
        .setTitle(`${UserName} - Devices`)
        .setColor('RANDOM')
        .setDescription(typeof UserData.devices !== 'undefined' ? UserData.devices.join('\n') : 'None')
      )

      const defaultModes = UserData['overallData']['defaultModes']
      Display.addPage(new MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`${UserName} - default Modes`)
        .addField('Players out lived', defaultModes['playersoutlived'] || 0, true)
        .addField('Kills', defaultModes['kills'] || 0, true)
        .addField('Win', defaultModes['placetop1'] || 0, true)
        .addField('Score', defaultModes['score'] || 0, true)
        .addField('Matches Played', defaultModes['matchesplayed'] || 0, true)
        .addField('Playlists', typeof defaultModes['includedPlaylists'] !== 'undefined' ? defaultModes['includedPlaylists'].join('\n') : 'None', true)
      )

      const ltmModes = UserData['overallData']['ltmModes']
      Display.addPage(new MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`${UserName} - ltmModes`)
        .addField('Matches Played', ltmModes['matchesplayed'] || 0, true)
        .addField('Win', ltmModes['placetop1'] || 0, true)
        .addField('Players out lived', ltmModes['playersoutlived'] || 0, true)
        .addField('Score', ltmModes['score'] || 0, true)
        .addField('Kills', ltmModes['kills'] || 0, true)
        .addField('Playlists', typeof ltmModes['includedPlaylists'] !== 'undefined' ? ltmModes['includedPlaylists'].join('\n') : 'None', true)
      )

      const TeamModes = UserData['overallData']['largeTeamModes']
      Display.addPage(new MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`${UserName} - TeamModes`)
        .addField('Win', TeamModes['placetop1'] || 0, true)
        .addField('Matches Played', TeamModes['matchesplayed'] || 0, true)
        .addField('Kills', TeamModes['kills'] || 0, true)
        .addField('Players out lived', ltmModes['playersoutlived'] || 0, true)
        .addField('Score', ltmModes['score'] || 0, true)
        .addField('Playlists', typeof TeamModes['includedPlaylists'] !== 'undefined' ? TeamModes['includedPlaylists'].join('\n') : 'None', true)
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

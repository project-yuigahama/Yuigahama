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
    const Embed = new MessageEmbed().setColor('RANDOM')
    const User = new FortniteUserAPI(string)

    const UserName = await User.getUsername()
    if (UserName === null) return message.sendMessage('User not found.')
    Embed.setTitle(`${UserName} - Status`)

    const Platforms = await User.getPlatforms()
    if (Platforms !== null) Embed.addField('Platforms', Platforms.join('\n'), true)

    const UserData = await User.getStats()
    if (UserData !== null) Embed.addField('Devices', UserData.devices.join('\n'), true)

    return message.sendEmbed(Embed)
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

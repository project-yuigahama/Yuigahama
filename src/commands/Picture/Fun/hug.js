const { Command, KlasaMessage } = require('klasa')
const { MessageEmbed, GuildMember } = require('discord.js')
const { Nekoslife } = require('../../../Yui')

/**
 * @extends Command
 */
class LewdFox extends Command {
  constructor (...args) {
    super(...args, {
      runIn: ['text'],
      description: language => language.get('COMMAND_HUG_DESCRIPTION'),
      usage: '<member:member>'
    })
  }

  /**
   * @param {KlasaMessage} message
   * @param {[GuildMember]} usage
   */
  async run (message, [member]) {
    return message.sendEmbed(new MessageEmbed().setDescription(message.language.get('COMMAND_HUG', message.author, member)).setImage((await Nekoslife.request(Nekoslife.END_POINTS_V3.hug_gif, true))['data']['response']['url']).setColor('RED'))
  }
}

module.exports = LewdFox

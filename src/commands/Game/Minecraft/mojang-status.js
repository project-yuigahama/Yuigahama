const { Command, KlasaMessage } = require('klasa')
const { MessageEmbed } = require('discord.js')
const { Game: { MojangAPI } } = require('../../../Yui')

class MojangStatus extends Command {
  constructor (...args) {
    super(...args, {
      description: language => language.get('COMMAND_MOJANG_STATUS'),
      aliases: ['mc-stats', 'mc-status']
    })
  }

  /**
   * @param {KlasaMessage} message
   */
  async run (message) {
    const data = await MojangAPI.getStatus()

    return message.sendEmbed(new MessageEmbed()
      .setColor('GREEN')
      .setTitle('MojangAPI Status')
      .addField('Mojang.com', this.toEmoji(data[7]['mojang.com']), true)
      .addField('Public API', this.toEmoji(data[5]['api.mojang.com']), true)
      .addField('Minecraft.net', this.toEmoji(data[0]['minecraft.net']), true)
      .addField('Minecraft skins', this.toEmoji(data[6]['textures.minecraft.net']), true)
      .addField('Authentication service', this.toEmoji(data[3]['authserver.mojang.com']), true)
      .addField('Mojang accounts website', this.toEmoji(data[2]['account.mojang.com']), true)
      .addField('Multiplayer session service (Mojang)', this.toEmoji(data[4]['sessionserver.mojang.com']), true)
      .addField('Multiplayer session service (Minecraft)', this.toEmoji(data[1]['session.minecraft.net']), true)
    )
  }

  /**
   * @param {string} string
   */
  toEmoji (string) {
    if (typeof string !== 'string') return ':question:'
    switch (string) {
      case 'green': return ':green_heart:'
      case 'yellow': return ':yellow_heart:'
      case 'red': return ':heart:'
      default: return ':question:'
    }
  }
}

module.exports = MojangStatus

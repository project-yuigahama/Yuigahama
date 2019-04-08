const { Command, KlasaMessage } = require('klasa')
const { MessageEmbed } = require('discord.js')
const fetch = require('node-fetch')

module.exports = class extends Command {
  constructor (...args) {
    super(...args, {
      aliases: ['pmmp', 'pocketmine-mp'],
      description: 'PocketMine-MPの最新リリースの詳細を表示します。',
      extendedHelp: 'No extended help available.'
    })
  }

  /**
   * @param {KlasaMessage} message
   */
  async run (message) {
    const body = await fetch('https://update.pmmp.io/api').then(res => res.json()).catch(() => null)
    if (!body) throw new Error()
    return message.sendEmbed(new MessageEmbed()
      .setTitle('PocketMine-MP (Stable)')
      .setURL(body['details_url'])
      .setThumbnail('https://cdn.pocketmine.net/favicon.png')
      .setColor('RANDOM')
      .addField('> PHP', body['php_version'], true)
      .addField('> API', body['base_version'], true)
      .addField('> Build Number', body['build_number'], true)
      .addField('> Minecraft Version', body['mcpe_version'], true)
      .addField('> Dev', body['is_dev'] ? 'Yes' : 'No', true)
      .addField('> Commit Hash', body['git_commit'], true)
      .setFooter('pmmp/PocketMine-MP', 'https://avatars1.githubusercontent.com/u/22548559?s=200&v=4')
    )
  }
}

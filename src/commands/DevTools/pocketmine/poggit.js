const { Command, KlasaMessage } = require('klasa')
const { MessageEmbed } = require('discord.js')
const request = require('request')
const FuseJS = require('fuse.js')

/**
 * @extends Command
 */
class PocketMine extends Command {
  constructor (...args) {
    super(...args, {
      description: 'Poggitからプラグインを検索します。',
      extendedHelp: '古いバージョンのものが検索結果に出る可能性があります。注意して下さい。',
      usage: '<query:...string>',
      cooldown: 5
    })
  }

  /**
   * @param {KlasaMessage} message
   * @param {string[]} query
   */
  async run (message, [query]) {
    await request('https://poggit.pmmp.io/releases.min.json',
      {
        json: true,
        method: 'GET'
      },
      (e, r, b) => {
        if (!b) return message.sendMessage('Not Found')
        const results = new FuseJS(b, { keys: ['name', 'tagline'] }).search(query)
        // 検索結果が悪くなるのでコメントアウト、別の方法を考え中
        // results.sort((a, b) => {
        //   return a.version < b.version ? 1 : -1
        // })
        return results ? message.sendEmbed(new MessageEmbed()
          .setURL(results[0]['html_url'] || 'https://poggit.pmmp.io')
          .setColor('#EC492C')
          .setAuthor('Poggit Search', 'https://poggit.pmmp.io/res/poggit.png', 'https://poggit.pmmp.io')
          .setTitle(results[0]['name'] || 'Error')
          .setDescription(results[0]['tagline'] || 'None')
          .addField('Status', results[0]['state_name'] || 'Error', true)
          .addField('Version', results[0]['version'] || 'Error', true)
          .addField('Downloads', results[0]['downloads'] || 0, true)
          .addField('License', results[0]['license'].toUpperCase() || 'None', true)
          .addField('Keywords', results[0]['keywords'].join(', ') || 'None', true)
          .addField('Official', results[0]['is_official'] ? 'Yes' : 'No', true)
          .addField('Outdated', results[0]['is_outdated'] ? 'Yes' : 'No', true)
          .addField('Pre Release', results[0]['is_pre_release'] ? 'Yes' : 'No', true)
          .addField('Obsolete', results[0]['is_obsolete'] ? 'Yes' : 'No', true)
          .setFooter(results[0]['repo_name'] || 'Error', results[0]['icon_url'] || 'https://poggit.pmmp.io/res/defaultPluginIcon2.png')
        ) : message.send('Error')
      }
    )
  }
}

module.exports = PocketMine

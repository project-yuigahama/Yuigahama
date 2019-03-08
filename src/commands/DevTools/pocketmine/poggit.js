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
   */
  async run (message, [query]) {
    await request('https://poggit.pmmp.io/plugins.json',
      {
        json: true,
        method: 'GET'
      },
      (e, r, b) => {
        if (!b) return message.sendMessage('Not Found')
        const results = new FuseJS(b, { keys: ['name'] }).search(query)
        return results ? message.sendEmbed(new MessageEmbed()
          .setURL(results[0]['html_url'])
          .setColor('#EC492C')
          .setAuthor('Poggit Search', 'https://poggit.pmmp.io/res/poggit.png', 'https://poggit.pmmp.io')
          .setTitle(results[0]['name'])
          .setDescription(results[0]['tagline'])
          .addField('Status', results[0]['state_name'], true)
          .addField('Version', results[0]['version'], true)
          .addField('Downloads', results[0]['downloads'], true)
          .addField('License', results[0]['license'].toUpperCase(), true)
          .addField('Keywords', results[0]['keywords'].join(', '), true)
          .addField('Official', results[0]['is_official'] ? 'Yes' : 'No', true)
          .addField('Outdated', results[0]['is_outdated'] ? 'Yes' : 'No', true)
          .addField('Pre Release', results[0]['is_pre_release'] ? 'Yes' : 'No', true)
          .addField('Obsolete', results[0]['is_obsolete'] ? 'Yes' : 'No', true)
          .setFooter(results[0]['repo_name'], results[0]['icon_url'] || 'https://poggit.pmmp.io/res/defaultPluginIcon2.png')
        ) : 'Not Found'
      }
    )
  }
}

module.exports = PocketMine

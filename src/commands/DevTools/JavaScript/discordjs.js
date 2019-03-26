const { Command, KlasaMessage } = require('klasa')
const fetch = require('node-fetch')

/**
 * @extends Command
 */
class DiscordJS extends Command {
  constructor (...args) {
    super(...args, {
      aliases: ['djs', 'djsdocs'],
      requiredPermissions: ['EMBED_LINKS'],
      description: 'Discord.jsのドキュメントを検索します。',
      extendedHelp: 'No extended help available.',
      usage: '<commando|rpc|main:default> <query:string> [branch:string]',
      usageDelim: ' ',
      subcommands: true
    })
  }

  /**
   * @param {KlasaMessage} message
   * @param {[string, string]} usage
   */
  async main (message, [query, branch = 'stable']) {
    await this.search(message, query, 'main', branch)
  }

  /**
   * @param {KlasaMessage} message
   * @param {[string]} usage
   */
  async commando (message, [query]) {
    await this.search(message, query, 'commando')
  }

  /**
   * @param {KlasaMessage} message
   * @param {[string]} usage
   */
  async rpc (message, [query]) {
    await this.search(message, query, 'rpc')
  }

  /**
   * @param {KlasaMessage} message
   * @param {string} query
   * @param {string} type
   * @param {string} branch
   *
   * @private
   * @static
   */
  async search (message, query, type, branch = 'master') {
    const body = await fetch(`https://djsdocs.sorta.moe/${type}/${branch}/embed?q=${encodeURIComponent(query)}`)
      .then(res => res.json())
      .catch(() => null)
    if (!body) return message.sendMessage(`[${type}:${branch}] Information matching \`${query}\` could not be found.`)
    return message.sendEmbed(body)
  }
}

module.exports = DiscordJS

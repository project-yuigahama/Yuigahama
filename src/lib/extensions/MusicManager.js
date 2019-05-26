const YuigahamaGuild = require('../structures/YuigahamaGuild')
const ytdl = require('ytdl-core')
const getInfo = require('util').promisify(ytdl.getInfo)

class MusicManager {
  /**
   * @param {YuigahamaGuild} guild
   */
  constructor (guild) {
    Object.defineProperty(this, 'guild', { value: guild })

    Object.defineProperty(this, 'client', { value: guild.client })

    this.queue = []

    this.channel = null

    this.next = null
  }

  /**
   * Next music URL
   * @returns {?string}
   */
  get next () {
    return this.next || null
  }

  async addQueue (url) {
    const info = await getInfo(url).catch(() => {
      throw new Error('URL may be different.')
    })
  }
}

module.exports = MusicManager

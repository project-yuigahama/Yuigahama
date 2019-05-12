const fetch = require('node-fetch')
const YuigahamaError = require('../../error/YuigahamaError')

class FortniteUserAPI {
  /**
   * @param {string} name
   */
  constructor (name) {
    if (typeof name !== 'string') throw new YuigahamaError('parameter "name" must be string.')

    this.name = name
    this.userdata = null
    this.stats = null
    this.matches = null
  }

  /**
   * @param {boolean} [force=false]
   */
  async getUser (force = false) {
    if (this.userdata !== null && force === false) return this.userdata

    const data = await fetch(`https://fortnite-public-api.theapinetwork.com/prod09/users/id?username=${encodeURIComponent(this.name)}`)
      .then(res => res.json())
      .catch(() => null)
    if (data === null) throw new YuigahamaError('Request failed.')
    this.userdata = data

    return data
  }

  /**
   * @returns {string}
   */
  async getUserId () {
    if (this.userdata.uid !== null) return this.userdata.uid
    const data = await this.getUser(true)
    return data.uid
  }

  /**
   * @returns {any[]}
   */
  async getPlatforms () {
    if (this.userdata.platforms !== null) return this.userdata.uid
    const data = await this.getUser(true)
    return data.platforms
  }

  /**
   * @returns {any[]}
   */
  async getSeasons () {
    if (this.userdata.seasons !== null) return this.userdata.seasons
    const data = await this.getUser(true)
    return data.seasons
  }

  async getStats (force = false) {
    if (this.stats !== null && force === false) return this.stats

    const data = await fetch(`https://fortnite-public-api.theapinetwork.com/prod09/users/public/br_stats_v2?user_id=${await this.getUserId()}`)
      .then(res => res.json())
      .catch(() => null)
    if (data === null) throw new YuigahamaError('Request failed.')
    this.stats = data

    return data
  }

  async getMatches (force = false) {
    if (this.matches !== null && force === false) return this.matches

    const data = await fetch(`https://fortnite-public-api.theapinetwork.com/prod09/users/public/matches_v2?user_id=${await this.getUserId()}`)
      .then(res => res.json())
      .catch(() => null)
    if (data === null) throw new YuigahamaError('Request failed.')
    this.matches = data

    return data
  }
}

module.exports = FortniteUserAPI

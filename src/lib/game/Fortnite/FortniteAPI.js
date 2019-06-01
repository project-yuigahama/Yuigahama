const fetch = require('node-fetch')
const YuigahamaError = require('../../error/YuigahamaError')

class FortniteAPI {
  static async getChallenges () {
    const data = await fetch('https://fortnite-public-api.theapinetwork.com/prod09/challenges/get?season=current')
      .then(res => res.json())
      .catch(() => null)
    if (data === null) throw new YuigahamaError('Request failed.')

    return data
  }

  /**
   * @deprecated
   */
  static async getWeapons () {
    const data = await fetch('https://fortnite-public-api.theapinetwork.com/prod09/weapons/get')
      .then(res => res.json())
      .catch(() => null)
    if (data === null) throw new YuigahamaError('Request failed.')

    return data
  }

  static async getNews (lang = 'en') {
    const data = await fetch(`https://fortnite-public-api.theapinetwork.com/prod09/br_motd/get?language=${lang}`)
      .then(res => res.json())
      .catch(() => null)
    if (data === null) throw new YuigahamaError('Request failed.')

    return data
  }

  /**
   * @deprecated
   */
  static async getStatus () {
    const data = await fetch('https://fortnite-public-api.theapinetwork.com/prod09/status/fortnite_server_status')
      .then(res => res.json())
      .catch(() => null)
    if (data === null) throw new YuigahamaError('Request failed.')

    return data
  }
}

module.exports = FortniteAPI

const fetch = require('node-fetch')
const YuigahamaError = require('../../error/YuigahamaError')

class FortniteStoreAPI {
  /**
   * A list of all items in the current store
   * @param {string} lang
   */
  static async getDailyStore (lang = 'en') {
    if (lang === 'en' || lang === 'de') {
      const data = await fetch(`https://fortnite-public-api.theapinetwork.com/prod09/store/get?language=${encodeURIComponent(lang)}`)
        .then(res => res.json())
        .catch(() => null)
      if (data === null) throw new YuigahamaError('Request failed.')

      return data
    } else throw new YuigahamaError('Language is not supported.')
  }

  /**
   * A list of all upcoming items
   */
  static async getUpcomingItem () {
    const data = await fetch('https://fortnite-public-api.theapinetwork.com/prod09/upcoming/get')
      .then(res => res.json())
      .catch(() => null)
    if (data === null) throw new YuigahamaError('Request failed.')

    return data
  }

  static async getAllItems () {
    const data = await fetch('https://fortnite-public-api.theapinetwork.com/prod09/items/list')
      .then(res => res.json())
      .catch(() => null)
    if (data === null) throw new YuigahamaError('Request failed.')

    return data
  }

  /**
   * @param {string} itemId
   */
  static async getSpecificItem (itemId) {
    if (!itemId) throw new YuigahamaError('There is no Item ID in the parameter "itemId".')
    const data = await fetch(`https://fortnite-public-api.theapinetwork.com/prod09/item/get?ids=${itemId}`)
      .then(res => res.json())
      .catch(() => null)
    if (data === null) throw new YuigahamaError('Request failed.')

    return data
  }

  static async getPopularItems () {
    const data = await fetch('https://fortnite-public-api.theapinetwork.com/prod09/items/popular')
      .then(res => res.json())
      .catch(() => null)
    if (data === null) throw new YuigahamaError('Request failed.')

    return data
  }
}

module.exports = FortniteStoreAPI

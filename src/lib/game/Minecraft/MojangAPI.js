const fetch = require('node-fetch')
const YuigahamaError = require('../../error/YuigahamaError')

class MojangAPI {
  /**
   * @param {string} name
   */
  constructor (name) {
    this.name = name
    this.uuid = null
    this.nameHistory = null
    this.profile = null
  }

  /**
   * @returns {string}
   *
   * @throws {YuigahamaError}
   */
  async getUUID (force = false) {
    if (this.uuid && force === false) return this.uuid

    const data = await fetch(`https://api.mojang.com/users/profiles/minecraft/${encodeURIComponent(this.name)}`)
      .then(res => res.json())
      .then(json => json.id)
      .catch(() => null)
    if (data === null) throw new YuigahamaError('Request failed')
    this.uuid = data

    return data
  }

  /**
   * @param {boolean} force
   *
   * @returns {Object}
   * @throws {YuigahamaError}
   */
  async getNameHistory (force = false) {
    if (this.nameHistory && force === false) return this.nameHistory

    const data = await fetch(`https://api.mojang.com/user/profiles/${await this.getUUID()}/names`)
      .then(res => res.json())
      .catch(() => null)
    if (data === null) throw new YuigahamaError('Request failed')
    this.nameHistory = data

    return data
  }

  /**
   * @param {boolean} force
   *
   * @returns {Object}
   * @throws {YuigahamaError}
   */
  async getProfile (force = false) {
    if (this.profile && force === false) return this.profile

    const data = await fetch(`https://sessionserver.mojang.com/session/minecraft/profile/${await this.getUUID()}`)
      .then(res => res.json())
      .catch(() => null)
    if (data === null) throw new YuigahamaError('Request failed')

    return data
  }

  /**
   * @returns {Object}
   *
   * @throws {YuigahamaError}
   */
  static async getStatus () {
    const data = await fetch('https://status.mojang.com/check')
      .then(res => res.json())
      .catch(() => null)
    if (data === null) throw new YuigahamaError('Request failed')

    return data
  }
}

module.exports = MojangAPI

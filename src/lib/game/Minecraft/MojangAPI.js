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
   * @returns {string|null}
   *
   * @throws {YuigahamaError}
   */
  async getUUID () {
    if (this.uuid !== null) return this.uuid

    const data = await fetch(`https://api.mojang.com/users/profiles/minecraft/${encodeURIComponent(this.name)}`)
      .then(res => res.json())
      .catch(() => null)
    if (data === null) return null
    this.uuid = data.id

    return data.id
  }

  /**
   * @param {boolean} force
   *
   * @returns {Object}
   * @throws {YuigahamaError}
   */
  async getNameHistory (force = false) {
    if (this.nameHistory !== null && force === false) return this.nameHistory
    const uuid = await this.getUUID()
    if (uuid === null) return { message: 'Could not get UUID. The player name may be wrong.' }

    const data = await fetch(`https://api.mojang.com/user/profiles/${uuid}/names`)
      .then(res => res.json())
      .catch(() => null)
    if (data === null) return { message: 'Request failed. Please wait for a while and try again.' }
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
    if (this.profile !== null && force === false) return this.profile
    const uuid = await this.getUUID()
    if (uuid === null) return { message: 'Could not get UUID. The player name may be wrong.' }

    const data = await fetch(`https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`)
      .then(res => res.json())
      .catch(() => null)
    if (data === null) return { message: 'Request failed. Please wait for a while and try again.' }

    return data
  }

  /**
   * @returns {Object[]}
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

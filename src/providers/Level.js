// Copyright (c) 2017-2019 dirigeants. All rights reserved. MIT license.
const { Provider, util: { mergeObjects } } = require('klasa')
const { Collection } = require('discord.js')
const { resolve } = require('path')
const fs = require('fs-nextra')
const Level = require('level')

/**
 * @extends Provider
 * @license https://github.com/dirigeants/klasa-pieces/blob/master/LICENSE
 * @copyright dirigeants
 */
class LevelDB extends Provider {
  /**
   * @param  {...any} args
   *
   * @property {string} baseDir
   * @property {Collection} tables
   */
  constructor (...args) {
    super(...args)
    /**
     * @type {string}
     */
    this.baseDir = resolve(this.client.userBaseDirectory, 'bwd', 'provider', 'level')

    /**
     * @type {Collection}
     */
    this.tables = new Collection()
  }

  /**
   * Closes the DB
   */
  async shutdown () {
    for (const db of this.tables.values()) db.close()
  }

  /**
   * Init the DB
   */
  async init () {
    await fs.ensureDir(this.baseDir)
    const files = await fs.readdir(this.baseDir)
    for (const file of files) this.createTable(file)
  }

  /**
   * @param {string} table
   *
   * @returns {boolean}
   */
  async hasTable (table) {
    return this.tables.has(table)
  }

  /**
   * @param {string} table
   *
   * @returns {*}
   */
  async createTable (table) {
    return this.tables.set(table, new Level(resolve(this.baseDir, table)))
  }

  /**
   * @param {string} table
   *
   * @returns {*}
   */
  async deleteTable (table) {
    if (this.tables.has(table)) {
      await this.tables.get(table).close()
      await fs.unlink(`${this.baseDir}/${table}`)
      return this.tables.delete(table)
    }
    return Promise.resolve()
  }

  /**
   * @param {string} table
   * @param {Array<string} filter
   *
   * @returns {Array<Object<string,*>>}
   */
  async getAll (table, filter = []) {
    const db = this.tables.get(table)
    if (!db) throw new Error(`The table ${table} does not exist.`)
    const stream = db.createReadStream()
    const data = await new Promise((resolve) => {
      const output = []
      stream.on('data', (data) => {
        if (filter.length) {
          const json = JSON.parse(data.value)
          if (filter.includes(json.id)) output.push(json)
        } else {
          output.push(JSON.parse(data.value))
        }
      })

      stream.once('end', () => {
        stream.removeAllListeners()
        resolve(output)
      })
    })

    return data
  }

  /**
   * @param {string} table
   *
   * @returns {string[]}
   */
  async getKeys (table) {
    const db = this.tables.get(table)
    if (!db) throw new Error(`The table ${table} does not exist.`)
    const data = await new Promise((resolve) => {
      const output = []
      const stream = db.keyStream()
        .on('data', key => output.push(key))
        .once('end', () => {
          stream.removeAllListeners()
          resolve(output)
        })
    })

    return data
  }

  /**
   * @param {string} table
   * @param {string} id
   *
   * @returns {Object<string, *>}
   */
  async get (table, id) {
    return this.tables.get(table).get(id).then(JSON.parse).catch(() => null)
  }

  /**
   * @param {string} table
   * @param {string} id
   *
   * @returns {boolean}
   */
  async has (table, id) {
    return this.tables.get(table).has(id)
  }

  /**
   * @param {string} table
   * @param {string} id
   * @param {ProviderResolvable} data
   *
   * @returns {*}
   */
  async create (table, id, data = {}) {
    return this.tables.get(table).put(id, JSON.stringify({ id, ...this.parseUpdateInput(data) }))
  }

  /**
   * @param {string} table
   * @param {string} id
   * @param {ProviderResolvable} data
   *
   * @returns {*}
   */
  async update (table, id, data) {
    return this.get(table, id).then(existent => this.create(table, id, mergeObjects(existent || { id }, this.parseUpdateInput(data))))
  }

  /**
   * @param {string} table
   * @param {string} id
   * @param {ProviderResolvable} data
   *
   * @returns {*}
   */
  async replace (table, id, data) {
    return this.create(table, id, data)
  }

  /**
   * @param {string} table
   * @param {string} id
   */
  async delete (table, id) {
    return this.get(table, id)
      .then(db => db.del(id))
  }
}

module.exports = LevelDB

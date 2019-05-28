// Copyright (c) 2017-2019 dirigeants. All rights reserved. MIT license.
const { Provider, util: { mergeObjects } } = require('klasa')
const { Collection } = require('discord.js')
const { resolve } = require('path')
const fs = require('fs-nextra')
const Level = require('level')

module.exports = class extends Provider {
  constructor (...args) {
    super(...args)
    this.baseDir = resolve(this.client.userBaseDirectory, 'bwd', 'provider', 'level')
    this.tables = new Collection()
  }

  /**
   * Closes the DB
   */
  shutdown () {
    for (const db of this.tables.values()) db.close()
  }

  async init () {
    await fs.ensureDir(this.baseDir)
    const files = await fs.readdir(this.baseDir)
    for (const file of files) this.createTable(file)
  }

  /* Table methods */

  hasTable (table) {
    return this.tables.has(table)
  }

  createTable (table) {
    return this.tables.set(table, new Level(resolve(this.baseDir, table)))
  }

  async deleteTable (table) {
    if (this.tables.has(table)) {
      await this.tables.get(table).close()
      await fs.unlink(`${this.baseDir}/${table}`)
      return this.tables.delete(table)
    }
    return Promise.resolve()
  }

  /* Document methods */

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

  get (table, id) {
    return this.tables.get(table).get(id).then(JSON.parse).catch(() => null)
  }

  has (table, id) {
    return this.tables.get(table).has(id)
  }

  create (table, id, data = {}) {
    return this.tables.get(table).put(id, JSON.stringify({ id, ...this.parseUpdateInput(data) }))
  }

  update (table, id, data) {
    return this.get(table, id)
      .then(existent => this.create(table, id, mergeObjects(existent || { id }, this.parseUpdateInput(data))))
  }

  replace (table, id, data) {
    return this.create(table, id, data)
  }

  delete (table, id) {
    return this.get(table, id)
      .then(db => db.del(id))
  }
}

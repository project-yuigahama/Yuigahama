// Copyright (c) 2017-2019 dirigeants. All rights reserved. MIT license.
const { Provider } = require('klasa')
const firebase = require('firebase-admin')
const fs = require('fs')

class FireStore extends Provider {
  constructor (...args) {
    super(...args)
    this.db = null
  }

  async init () {
    await firebase.initializeApp({
      databaseURL: process.env.DATABASE_URL,
      credential: firebase.credential.cert(fs.existsSync(process.cwd() + '/resources/serviceAccount.json') ? process.cwd() + '/resources/serviceAccount.json' : '{}')
    })

    this.db = firebase.firestore()
  }

  async hasTable (table) {
    const col = await this.db.collection(table).get()
    return Boolean(col.size)
  }

  createTable (table) {
    return this.db.collection(table)
  }

  async getKeys (table) {
    const snaps = await this.db.collection(table).get()
    return snaps.docs.map(snap => snap.id)
  }

  async get (table, id) {
    const snap = await this.db.collection(table).doc(id).get()
    return this.packData(snap.data(), snap.id)
  }

  async has (table, id) {
    const data = await this.db.collection(table).doc(id).get()
    return data.exists
  }

  create (table, id, doc = {}) {
    return this.db.collection(table).doc(id).set(this.parseUpdateInput(doc))
  }

  update (table, id, doc) {
    return this.db.collection(table).doc(id).update(this.parseUpdateInput(doc))
  }

  delete (table, id) {
    return this.db.collection(table).doc(id).delete()
  }

  replace (...args) {
    return this.create(...args)
  }

  async getAll (table, filter = []) {
    const data = await this.db.collection(table).get()
      .then(snaps => snaps.docs.map(snap => this.packData(snap.data(), snap.id)))

    return filter.length ? data.filter(nodes => filter.includes(nodes.id)) : data
  }

  packData (data, id) {
    return {
      ...data,
      id
    }
  }
}

module.exports = FireStore

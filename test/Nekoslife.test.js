const assert = require('assert')
const describe = require('mocha').describe
const it = require('mocha').it
const Nekoslife = require('../src/lib/util/Nekolife')

describe('Nekoslife', () => {
  describe('V3', () => {
    it('Check the endpoint: Safe For Work', async () => {
      Object.values(Nekoslife.END_POINTS_V3).forEach((value) => {
        if (typeof value === 'string') return Nekoslife.request(value, true).then(data => assert.strictEqual(typeof data, 'object')).catch(error => assert.fail(error.message))
      })
    })

    it('Check the endpoint: Not Safe For Work (Lewd)', async () => {
      Object.values(Nekoslife.END_POINTS_V3.nsfw).forEach((value) => {
        return Nekoslife.request(value, true).then(data => assert.strictEqual(typeof data, 'object')).catch(error => assert.fail(error.message))
      })
    })
  })

  describe('V2', () => {
    it('Check the endpoint: Safe For Work', async () => {
      Object.values(Nekoslife.END_POINTS_V2).forEach((value) => {
        if (typeof value === 'string') return Nekoslife.request(value).then(data => assert.strictEqual(typeof data, 'object')).catch(error => assert.fail(error.message))
      })
    })

    it('Check the endpoint: Not Safe For Work (Lewd)', async () => {
      Object.values(Nekoslife.END_POINTS_V2.nsfw).forEach((value) => {
        return Nekoslife.request(value).then(data => assert.strictEqual(typeof data, 'object')).catch(error => assert.fail(error.message))
      })
    })
  })
})

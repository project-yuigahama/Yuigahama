const assert = require('assert')
const utils = require('../src/lib/util/utils')
const describe = require('mocha').describe
const it = require('mocha').it

describe('Utils', () => {
  describe('getPlatform', () => {
    it('Return an string?', () => {
      assert.strictEqual(typeof utils.getPlatform(), 'string')
    })
  })

  describe('resolveModTypeColor', () => {
    it('Return an integer?', () => {
      assert.strictEqual(typeof utils.resolveModTypeColor('KICK'), 'number')
      assert.strictEqual(typeof utils.resolveModTypeColor('BAN'), 'number')
      assert.strictEqual(typeof utils.resolveModTypeColor('UNKNOWN'), 'number')
      assert.strictEqual(typeof utils.resolveModTypeColor('???'), 'number')
    })
  })
})

const assert = require('assert')
const utils = require('../src/lib/util/utils')
const describe = require('mocha').describe
const it = require('mocha').it

describe('Utils', () => {
  describe('getPlatform', () => {
    it('Return string', () => {
      assert.strictEqual(typeof utils.getPlatform(), 'string')
    })
  })

  describe('resolveModTypeColor', () => {
    it('Return integer', () => {
      assert.strictEqual(typeof utils.resolveModTypeColor('KICK'), 'number')
      assert.strictEqual(typeof utils.resolveModTypeColor('BAN'), 'number')
      assert.strictEqual(typeof utils.resolveModTypeColor('UNKNOWN'), 'number')
      assert.strictEqual(typeof utils.resolveModTypeColor('???'), 'number')
    })

    it('Return correct value', () => {
      assert.strictEqual(utils.resolveModTypeColor('BAN'), 0xE74C3C)
      assert.strictEqual(utils.resolveModTypeColor('KICK'), 0xF1C40F)
      assert.strictEqual(utils.resolveModTypeColor('UNKNOWN'), 0x95A5A6)
      assert.strictEqual(utils.resolveModTypeColor('???'), 0x000000)
    })
  })
})

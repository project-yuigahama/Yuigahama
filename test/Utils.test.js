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
    it('Return number', () => {
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

  describe('getFilterLevel', () => {
    it('Return number', () => {
      assert.strictEqual(typeof utils.getFilterLevel(1), 'number')
      assert.strictEqual(typeof utils.getFilterLevel(2), 'number')
      assert.strictEqual(typeof utils.getFilterLevel(3), 'number')
      assert.strictEqual(typeof utils.getFilterLevel(4), 'number')
      assert.strictEqual(typeof utils.getFilterLevel(5), 'number')
      assert.strictEqual(typeof utils.getFilterLevel(6), 'number')
      assert.strictEqual(typeof utils.getFilterLevel(7), 'number')
      assert.strictEqual(typeof utils.getFilterLevel(8), 'number')
      assert.strictEqual(typeof utils.getFilterLevel(9), 'number')
      assert.strictEqual(typeof utils.getFilterLevel(0), 'number')
    })

    it('Return correct value', () => {
      assert.strictEqual(utils.getFilterLevel(1), 0.9)
      assert.strictEqual(utils.getFilterLevel(2), 0.8)
      assert.strictEqual(utils.getFilterLevel(3), 0.7)
      assert.strictEqual(utils.getFilterLevel(4), 0.6)
      assert.strictEqual(utils.getFilterLevel(5), 0.5)
      assert.strictEqual(utils.getFilterLevel(6), 0.4)
      assert.strictEqual(utils.getFilterLevel(7), 0.3)
      assert.strictEqual(utils.getFilterLevel(8), 0.2)
      assert.strictEqual(utils.getFilterLevel(9), 0.1)
      assert.strictEqual(utils.getFilterLevel(0), 0.6)
    })
  })
})

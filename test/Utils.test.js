const assert = require('assert')
const utils = require('../src/lib/util/utils')
const describe = require('mocha').describe
const it = require('mocha').it

describe('Utils', () => {
  it('getPlatform() : string', (done) => {
    assert.strictEqual(typeof utils.getPlatform(), 'string')
    done()
  })
})

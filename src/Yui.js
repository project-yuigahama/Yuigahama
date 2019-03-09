const { Client } = require('klasa')
const { token } = require('../config')

new Client({
  prefix: 'yui!',
  regexPrefix: /^yuigahama(@|!)/i,
  presence: { activity: { name: 'Yuigahama!help', type: 'PLAYING' } },
  language: 'ja-JP',
  commandLogging: true,
  commandEditing: true
}).login(token)

module.exports = {
  Utils: require('./lib/util/utils')
}

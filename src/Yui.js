const {Client} = require('klasa')
const {token} = require('../config')

new Client({
  prefix: 'yui!',
  regexPrefix: /^yuigahama(@|!)/i,
  presence: { activity: { name: 'Yuigahama!help', type: 'LISTENING' } },
  language: 'ja-JP'
}).login(token)
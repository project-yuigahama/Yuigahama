const { Client } = require('klasa')
const { token } = require('../config')
const client = new Client({
  prefix: 'yui!',
  regexPrefix: /^yuigahama(@|!)/i,
  presence: { activity: { name: 'Yuigahama!help', type: 'PLAYING' } },
  language: 'ja-JP',
  commandLogging: true,
  commandEditing: true
})

client.login(token)

setInterval(async () => {
  process.title = `Memory: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}/${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)}MB - YuigahamaBot`
}, 1000)

module.exports = {
  Utils: require('./lib/util/utils')
}

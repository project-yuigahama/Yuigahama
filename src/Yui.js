require('dotenv').config()

const { Client } = require('klasa')
const { version } = require('../package.json')
const DBLAPI = require('dblapi.js')

const client = new Client({
  prefix: 'yui!',
  regexPrefix: /^yuigahama(@|!)/i,
  presence: { activity: { name: 'Yuigahama!help', type: 'PLAYING' } },
  language: 'ja-JP',
  commandLogging: true,
  commandEditing: true
})

if ('DBL_TOKEN' in process.env) {
  const DBL = new DBLAPI(process.env.DBL_TOKEN, client)

  DBL.on('error', (error) => {
    client.emit('DblError', client, error)
  })

  DBL.on('posted', () => {
    client.emit('DblPosted', client)
  })
}

client.login()

setInterval(() => {
  const heapUsed = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)
  const heapTotal = (process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)
  const onlineUser = client.users.filter(user => user.presence.status === 'online').size
  const totalUser = client.users.size
  const guilds = client.guilds.size
  const ping = Math.round(client.ws.ping)
  process.title = `YuigahamaBot v${version} - Memory: ${heapUsed}/${heapTotal} MB | Heartbeat: ${ping}ms | Users: ${onlineUser}/${totalUser} | ${guilds} guilds`
}, 1000)

module.exports = {
  Utils: require('./lib/util/utils'),
  Nekoslife: require('./lib/util/Nekolife')
}

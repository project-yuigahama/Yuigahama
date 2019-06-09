require('dotenv').config()

if (process.env.NODE_ENV === 'development') {
  process.exit(1)
}

const { Client } = require('klasa')
const { version } = require('../package.json')
const DBLAPI = require('dblapi.js')

Client.defaultPermissionLevels
  .add(4, ({ guild, member }) => guild && member.permissions.has('KICK_MEMBERS'), { fetch: true })
  .add(5, ({ guild, member }) => guild && member.permissions.has('BAN_MEMBERS'), { fetch: true })

Client.defaultGuildSchema
  .add('Approval', 'boolean', { configurable: false, default: false })

  .add('channels', folder => folder
    .add('JoinLog', 'TextChannel')
    .add('JoinMessage', 'string', { default: 'Welcome' })
    .add('QuitLog', 'TextChannel')
    .add('QuitMessage', 'string', { default: 'Bye...' })
  )
  .add('mod', folder => folder
    .add('AutoRole', 'role')
    .add('Logging', 'TextChannel')
  )
  .add('automod', folder => folder
    .add('ImageFilter', 'boolean', { configurable: false, default: false })
  )

const client = new Client({
  prefix: 'yui!',
  regexPrefix: /^yuigahama(@|!)/i,
  language: 'ja-JP',
  commandLogging: true,
  commandEditing: true,
  providers: {
    default: 'Level' // json は非推奨です。
  },
  pieceDefaults: {
    commands: {
      autoAliases: false
    }
  },
  disabledEvents: ['TYPING_START', 'PRESENCE_UPDATE'],
  shardCount: 'auto'
})

if ('DBL_TOKEN' in process.env) {
  const DBL = new DBLAPI(process.env.DBL_TOKEN, client)
  DBL.on('error', error => client.emit('DblError', error))
  DBL.on('posted', () => client.emit('DblPosted'))
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
  YuigahamaVersion: version,
  Utils: require('./lib/util/utils'),
  Nekoslife: require('./lib/util/Nekolife'),
  ModLogger: require('./lib/structures/ModLogger'),
  Game: {
    MojangAPI: require('./lib/game/Minecraft/MojangAPI'),
    FortniteAPI: require('./lib/game/Fortnite/FortniteAPI'),
    FortniteStoreAPI: require('./lib/game/Fortnite/FortniteStoreAPI'),
    FortniteUserAPI: require('./lib/game/Fortnite/FortniteUserAPI')
  }
}

const { Structures } = require('discord.js')

module.exports = Structures.extend('Guild', Guild => {
  class YuigahamaGuild extends Guild {
    constructor (...args) {
      super(...args)

      this.music = null
    }
  }

  return YuigahamaGuild
})

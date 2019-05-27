const { Command } = require('klasa')

class NPM extends Command {
  constructor (...args) {
    super(...args, {
      requiredPermissions: [],
      description: '',
      usage: '',
      usageDelim: ' ',
      subcommands: true
    })
  }

  async run (message) {

  }
}

module.exports = NPM

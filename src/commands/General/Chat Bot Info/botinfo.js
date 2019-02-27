const { Command } = require('klasa')
const os = require('os')

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: ''
    })
  }

  async run(message) {
    const info = [
      `OS:            :: ${this.getOS()}`,
      `Platform       :: ${os.platform()}`,
      `CPU            :: ${os.cpus()[0].model}`,
      `Memory         :: ${(os.totalmem() / 1024 / 1024 / 1024).toFixed(1)} GB`,
    ].join('\n')
    return message.sendCode('asciidoc', info)
  }

  getOS() {
    const platform = process.platform
    switch (platform) {
    case 'win32':
      return 'Windows'
    case 'linux':
      return 'Linux'
    case 'darwin':
      return 'Mac'
    default:
      return platform
    }
  }
}

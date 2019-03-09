const { Event, KlasaMessage } = require('klasa')

class CommandUnknown extends Event {
  /**
   * @param {KlasaMessage} message
   * @param {string} commandText
   * @param {RegExp} prefix
   * @param {int} prefixLength
   */
  run (message, commandText, prefix, prefixLength) {
    message.sendMessage(`\`${commandText}\` は存在しないコマンドです。誤字、脱字が無いか \`yuigahama!help\` で確認して下さい。 https://tenor.com/view/anime-panic-what-to-do-omg-worried-gif-13451210`)
  }
}

module.exports = CommandUnknown

const { Event, KlasaMessage, Command } = require('klasa')
const { makeErrorReport } = require('../lib/error/Reporter')

class commandError extends Event {
  /**
   * @param {KlasaMessage} message
   * @param {Command} command
   * @param {any[]} params
   * @param {Error} error
   */
  run (message, command, params, error) {
    if (error instanceof Error) this.client.emit('wtf', `[COMMAND] ${command.path}\n${error.stack || error}`)
    message.sendMessage('エラーが発生しました。エラーレポートを作成し送信します。\nhttps://tenor.com/view/anime-stressed-oh-no-slapping-desk-gif-5081298')
    if ('ERROR_REPORT_CHANNEL_ID' in process.env) {
      if (this.client.ready) {
        this.client.channels.get(process.env.ERROR_REPORT_CHANNEL_ID).sendCode('asciidoc', makeErrorReport(error, this.client))
        message.reply('エラーを報告しました。')
      }
    } else {
      message.sendCode('asciidoc', makeErrorReport(error, this.client))
      message.reply('エラーレポートチャンネルが指定されていないのでこのチャンネルにレポートを送信しました。コンソールにエラーは送信しましたが解決が遅くなるかもしれません...')
    }
  }
}

module.exports = commandError

const { Monitor, KlasaMessage, KlasaGuild } = require('klasa')
const { TextChannel } = require('discord.js')
const nsfwjs = require('nsfwjs')
const { Image, createCanvas } = require('canvas')
const { Utils } = require('../Yui')

class ImageFilter extends Monitor {
  constructor (...args) {
    super(...args, {
      ignoreOthers: false,
      ignoreEdits: false
    })
  }

  /**
   * @param {KlasaMessage} message
   */
  async run (message) {
    const attachments = message.attachments
    if (attachments.size === 0) return
    if (!(message.guild instanceof KlasaGuild)) return
    if (message.guildSettings.get('automod.ImageFilter') === false || message.guildSettings.get('Approval') === false) return
    if (!(message.channel instanceof TextChannel)) return
    if (message.channel.nsfw === true) return
    const attachment = attachments.first()
    if (attachment.url === null || attachment.width === null || attachment.height === null) return
    if (/\.(?:(?:jpe?|pn)g|tif?f|bmp)$/i.test(attachment.name) === false) return

    const width = attachment.width
    const height = attachment.height
    const image = new Image()
    const canvas = createCanvas(width, height)
    const ctx = canvas.getContext('2d')
    image.src = attachment.url
    image.onload = () => {
      ctx.drawImage(image, 0, 0, width, height)
      this.model.classify(canvas).then((predictions) => {
        const data = predictions[0]
        if (data.className === 'Porn' || data.className === 'Hentai') {
          if (data.probability > Utils.getFilterLevel(message.guildSettings.get('automod.FilterLevel')) && message.deleted === false) {
            try {
              message.delete()
            } catch (err) {
              this.client.emit('error', err)
            }
            message.reply(message.language.get('IMAGE_FILTER_DELETE_MESSAGE'))
          }
        }
      })
    }
    image.onerror = () => {
      this.client.console.warn('Processing was interrupted because the file could not be found.')
    }
  }

  async init () {
    this.model = await nsfwjs.load()
  }
}

module.exports = ImageFilter

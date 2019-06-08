const { Monitor, KlasaMessage, KlasaGuild } = require('klasa')
const { TextChannel } = require('discord.js')
const nsfwjs = require('nsfwjs')
const { Image, createCanvas } = require('canvas')

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
    if (!(message.channel instanceof TextChannel)) return
    if (message.channel.nsfw === false) return
    const attachment = attachments.first()
    if (attachment.url === null || attachment.width === null || attachment.height === null) return
    if (/\.(?:(?:jpe?|pn)g|tif?f|bmp)$/i.test(attachment.name)) {
      await nsfwjs.load().then((model) => {
        const width = attachment.width
        const height = attachment.height
        const image = new Image()
        const canvas = createCanvas(width, height)
        const ctx = canvas.getContext('2d')
        image.src = attachment.url
        image.onload = () => {
          ctx.drawImage(image, 0, 0, width, height)
          model.classify(canvas).then((predictions) => {
            const data = predictions[0]
            if (data.className === 'Porn' || data.className === 'Hentai') {
              if (data.probability > 0.72) {
                message.reply('Please do not post NSFW images in SFW channels.')
                message.delete()
              }
            }
          })
        }
        image.onerror = (error) => {
          throw error
        }
      })
    }
  }
}

module.exports = ImageFilter

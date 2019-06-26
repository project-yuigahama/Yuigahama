const { Event, Colors } = require('klasa')
const { Utils } = require('../Yui')

/**
 * @extends Event
 */
class YuigahamaReady extends Event {
  constructor (...args) {
    super(...args, {
      event: 'klasaReady'
    })
  }

  async run () {
    this.client.user.setActivity({ name: `yuigahama@help | ${this.client.guilds.size} guilds`, type: 'PLAYING' })

    const iconArray = Utils.iconToArray()
    const color = new Colors({ style: 'bold', text: 'magenta' })

    for (let index = 0; index < iconArray.length; index++) {
      const element = iconArray[index]
      this.client.console.log(color.format(element))
    }
  }
}

module.exports = YuigahamaReady

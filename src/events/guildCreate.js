const { Event, KlasaGuild } = require('klasa')
const { MessageEmbed } = require('discord.js')

/**
 * @extends Event
 */
class guildCreate extends Event {
  /**
   * @param {KlasaGuild} guild
   */
  run (guild) {
    guild.owner.createDM().then(dm => dm.sendEmbed(new MessageEmbed()
      .setColor('RANDOM')
      .setThumbnail(this.client.user.avatarURL())
      .setTitle(`Yuigahama v${require('../../package').version}`)
      .setDescription(`${this.client.user.tag} を追加してくれてありがとうございます！`)
      .addField('Yuigahama Repository', '[Click here](https://github.com/klasabots/Yuigahama)', true)
      .addField('Yuigahama Wiki', '[Click here](https://github.com/klasabots/Yuigahama/wiki)', true)
      .addField('Donate', '[Click here](https://www.paypal.me/inkohxdev)', true)
      .setFooter('Developed by InkoHX', this.client.application.owner.avatarURL())
      .setTimestamp()
    ))
    this.client.user.setActivity({ name: `${this.client.options.prefix}help | ${this.client.guilds.size} guilds`, type: 'WATCHING' })
  }
}

module.exports = guildCreate

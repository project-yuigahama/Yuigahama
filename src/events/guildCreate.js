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
      .addField('Donate', '[Click here](https://paypal.me/pools/c/8e04hFkdhp)', true)
      .setFooter('Developed by InkoHX', this.client.application.owner.avatarURL())
      .setTimestamp()
    )).catch(() => this.client.emit('error', 'DMを作成出来ませんでした。'))
    this.client.user.setActivity({ name: `${this.client.options.prefix}help | ${this.client.guilds.size} guilds`, type: 'WATCHING' })
    this.client.console.log(`${guild.name} に参加しました。`)
  }
}

module.exports = guildCreate

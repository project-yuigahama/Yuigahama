const { Event } = require('klasa')
const { GuildMember, MessageEmbed } = require('discord.js')

class guildMemberAdd extends Event {
  /**
   * @param {GuildMember} member
   */
  run (member) {
    if (member.guild.settings.channels.JoinLog !== null) {
      const channel = member.guild.channels.get(member.guild.settings.channels.JoinLog)
      channel.send(new MessageEmbed()
        .setColor('GREEN')
        .setTitle('Join')
        .setThumbnail(member.user.avatarURL({ size: 2048 }))
        .setDescription(`${member.user.tag} has joined the server!`)
        .setTimestamp()
      )
    }
  }
}

module.exports = guildMemberAdd

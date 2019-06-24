const { Event } = require('klasa')
const { GuildMember } = require('discord.js')

/**
 * @extends Event
 */
class AutoRoleEvent extends Event {
  constructor (...args) {
    super(...args, {
      event: 'guildMemberAdd'
    })
  }

  /**
   * @param {GuildMember} member
   */
  async run (member) {
    const guildSetting = member.guild.settings.get('mod.AutoRole')
    const guild = member.guild
    if (!member.manageable || guildSetting === null || member.roles.has(guildSetting) || !guild.roles.has(guildSetting)) return
    if (!guild.me.hasPermission('MANAGE_ROLES')) guild.owner.user.dmChannel.sendMessage(guild.language.get('AUTOROLE_PERMISSION_ROLE', guild.name))
    else await member.roles.add(guildSetting, 'AutoRole')
  }
}

module.exports = AutoRoleEvent

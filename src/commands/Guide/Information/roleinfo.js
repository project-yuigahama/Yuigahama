const { Command, KlasaMessage } = require('klasa')
const { Role, MessageEmbed } = require('discord.js')

class RoleInfo extends Command {
  constructor (...args) {
    super(...args, {
      runIn: ['text'],
      requiredPermissions: ['EMBED_LINKS'],
      description: '役職の情報を確認出来ます。',
      extendedHelp: 'No extended help available.',
      usage: '<role:role>'
    })
  }

  /**
   * @param {KlasaMessage} message
   * @param {Role[]} role
   */
  async run (message, [role]) {
    const permissions = {
      ADMINISTRATOR: 'Administrator',
      VIEW_AUDIT_LOG: 'View Audit Log',
      MANAGE_GUILD: 'Manage Server',
      MANAGE_ROLES: 'Manage Roles',
      MANAGE_CHANNELS: 'Manage Channels',
      KICK_MEMBERS: 'Kick Members',
      BAN_MEMBERS: 'Ban Members',
      CREATE_INSTANT_INVITE: 'Create Instant Invite',
      CHANGE_NICKNAME: 'Change Nickname',
      MANAGE_NICKNAMES: 'Manage Nicknames',
      MANAGE_EMOJIS: 'Manage Emojis',
      MANAGE_WEBHOOKS: 'Manage Webhooks',
      VIEW_CHANNEL: 'Read Text Channels and See Voice Channels',
      SEND_MESSAGES: 'Send Messages',
      SEND_TTS_MESSAGES: 'Send TTS Messages',
      MANAGE_MESSAGES: 'Manage Messages',
      EMBED_LINKS: 'Embed Links',
      ATTACH_FILES: 'Attach Files',
      READ_MESSAGE_HISTORY: 'Read Message History',
      MENTION_EVERYONE: 'Mention Everyone',
      USE_EXTERNAL_EMOJIS: 'Use External Emojis',
      ADD_REACTIONS: 'Add Reactions',
      CONNECT: 'Connect',
      SPEAK: 'Speak',
      MUTE_MEMBERS: 'Mute Members',
      DEAFEN_MEMBERS: 'Deafen Members',
      MOVE_MEMBERS: 'Move Members',
      USE_VAD: 'Use Voice Activity'
    }

    const allPermissions = Object.entries(role.permissions.serialize()).filter(perm => perm[1]).map(([perm]) => permissions[perm]).join(', ')

    return message.sendEmbed(new MessageEmbed()
      .setColor(role.hexColor)
      .setTitle('RoleInfo')
      .setFooter('Created At')
      .setTimestamp(role.createdTimestamp)
      .addField('Name', role.name, true)
      .addField('ID', role.id, true)
      .addField('Color', role.hexColor, true)
      .addField('Hoisted', role.hoist ? 'Yes' : 'No', true)
      .addField('Mentionable', role.mentionable ? 'Yes' : 'No', true)
      .addField('Permissions', allPermissions, true)
    )
  }
}

module.exports = RoleInfo

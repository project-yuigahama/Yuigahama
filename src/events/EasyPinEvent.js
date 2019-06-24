const { Event, KlasaUser, KlasaGuild } = require('klasa')
const { MessageReaction, TextChannel } = require('discord.js')

/**
 * @extends Event
 */
class EasyPinEvent extends Event {
  constructor (...args) {
    super(...args, {
      event: 'messageReactionAdd'
    })
  }

  /**
   * @param {MessageReaction} messageReaction
   * @param {KlasaUser} user
   */
  async run (messageReaction, user) {
    /** リアクションが追加されたメッセージの送信場所がサーバーかどうか */
    if (!(messageReaction.message.guild instanceof KlasaGuild)) return
    /** DMChannelでないか確認 */
    if (!(messageReaction.message.channel instanceof TextChannel)) return
    /** EasyPinが有効化されていて既にピンされているかどうか確認 */
    if (!messageReaction.message.guildSettings.get('channels.EasyPin') && !messageReaction.message.pinned) return
    /** リアクションを追加したユーザーがYuigahamaかその他のボットでないか確認 */
    if (messageReaction.me || user.bot) return
    /** リアクションを追加したユーザーに"MANAGE_MESSAGES"が与えられているか確認 */
    if (!messageReaction.message.guild.members.get(user.id).hasPermission('MANAGE_MESSAGES')) return
    /** 追加されたリアクションが:pushpin:かどうかを確認 */
    if (messageReaction.emoji.toString() !== '📌') return
    /** 既にピン留めされているか確認 */
    if (messageReaction.message.pinned) return
    /** Yuigahamaに"MANAGE_MESSAGES"が与えらているか確認し無ければ追加したユーザーにメッセージを送信 */
    if (!messageReaction.message.guild.me.hasPermission('MANAGE_MESSAGES')) messageReaction.message.channel.sendMessage(messageReaction.message.language.get('EASYPIN_PERMISSION_FAIL', user.toString()))
    /** Yuigahamaがそのメッセージをピン留めできるかを確認しできなければユーザーにメッセージを送信 */
    else if (!messageReaction.message.pinnable) messageReaction.message.channel.sendMessage(messageReaction.message.language.get('EASYPIN_FAIL'))
    /** メッセージをピン留め */
    else await messageReaction.message.pin()
  }
}

module.exports = EasyPinEvent

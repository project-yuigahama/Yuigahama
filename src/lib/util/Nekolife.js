const fetch = require('node-fetch')

class Nekolife {
  /**
   * @param {string} endpoint
   * @param {boolean} [v3=false]
   *
   * @throws {Error}
   */
  async request (endpoint, v3 = false) {
    const base = v3 ? 'https://api.nekos.dev/api/v3/images/' : 'https://nekos.life/api/v2/'
    const body = await fetch(base + endpoint).then(res => res.json()).catch(() => null)
    if (!body) throw new Error()
    return body
  }
}

Nekolife.END_POINTS_V2 = {
  neko: ''
}

Nekolife.END_POINTS_V3 = {
  neko: 'sfw/img/neko',
  neko_gif: 'sfw/gif/neko',
  fox: 'sfw/img/kitsune',
  holo: 'sfw/img/holo',
  avatar: 'sfw/img/no_tag_avatar',
  neko_avatar: 'sfw/img/neko_avatars_avatar',
  wallpaper: 'sfw/img/wallpaper',
  waifu: 'sfw/img/waifu',
  smug_gif: 'sfw/gif/smug',
  baka_gif: 'sfw/gif/baka',
  tickle_gif: 'sfw/gif/tickle',
  poke_gif: 'sfw/gif/poke',
  kiss_gif: 'sfw/gif/kiss',
  slap_gif: 'sfw/gif/slap',
  cuddle_gif: 'sfw/gif/cuddle',
  hug_gif: 'sfw/gif/hug',
  pat_gif: 'sfw/gif/pat',
  feed_gif: 'sfw/gif/feed',
  cat: 'sfw/img/cat',
  lizard: 'sfw/img/lizard',
  eightball: 'sfw/img/8ball',
  nsfw: {
    ahegao: 'nsfw/img/ahegao_avatar',
    femdom: 'nsfw/img/femdom_lewd',
    cosplay: 'nsfw/img/cosplay_lewd',
    classic: 'nsfw/img/classic_lewd',
    classic_gif: 'nsfw/gif/classic',
    feet: 'nsfw/img/feet_lewd',
    feet_gif: 'nsfw/gif/feet',
    neko: 'nsfw/img/neko_lewd',
    ero_neko: 'nsfw/img/neko_ero',
    neko_gif: 'nsfw/gif/neko',
    kuni: 'nsfw/gif/kuni',
    boobs: 'nsfw/img/tits_lewd',
    boobs_gif: 'nsfw/gif/tits',
    pussy: 'nsfw/img/pussy_lewd',
    pussy_gif: 'nsfw/gif/pussy',
    cum: 'nsfw/img/cum_lewd',
    cum_gif: 'nsfw/gif/cum',
    spank: 'nsfw/gif/spank',
    lewd: 'nsfw/img/all_tags_ero',
    hentai: 'nsfw/img/all_tags_lewd',
    hentai_gif: 'nsfw/gif/all_tags',
    solo: 'nsfw/img/solo_lewd',
    solo_gif: 'nsfw/gif/girls_solo',
    blowjob: 'nsfw/img/blowjob_lewd',
    blowjob_gif: 'nsfw/gif/blow_job',
    yuri: 'nsfw/img/yuri_lewd',
    yuri_gif: 'nsfw/gif/yuri',
    trap: 'nsfw/img/trap_lewd',
    anal: 'nsfw/img/anal_lewd',
    ero_wallpaper: 'nsfw/img/ero_wallpaper_ero',
    wallpaper: 'nsfw/img/wallpaper_lewd',
    anus: 'nsfw/img/anus_lewd',
    anal_gif: 'nsfw/gif/anal',
    futanari: 'nsfw/img/futanari_lewd',
    pwank: 'nsfw/gif/pussy_wank',
    bdsm: 'nsfw/img/bdsm_lewd',
    ero_yuri: 'nsfw/img/yuri_ero',
    ero_feet: 'nsfw/img/feet_ero',
    holo_avatar: 'nsfw/img/holo_avatar',
    ero_holo: 'nsfw/img/holo_ero',
    fox: 'nsfw/img/kitsune_lewd',
    ero_fox: 'nsfw/img/kitsune_ero',
    kemonomimi: 'nsfw/img/kemonomimi_lewd',
    ero_kemonomimi: 'nsfw/img/kemonomimi_ero',
    pantyhose: 'nsfw/img/pantyhose_lewd',
    ero_pantyhose: 'nsfw/img/pantyhose_ero',
    piersing: 'nsfw/img/piersing_lewd',
    ero_piersing: 'nsfw/img/piersing_ero',
    peeing: 'nsfw/img/peeing_lewd',
    keta: 'nsfw/img/keta_lewd',
    smallboobs: 'nsfw/img/smallboobs_lewd',
    keta_avatar: 'nsfw/img/keta_avatar',
    yiff: 'nsfw/img/yiff_lewd',
    yiff_gif: 'nsfw/gif/yiff'
  }
}

module.exports = Nekolife

class Utils {
  /**
   * @returns {string}
   * @static
   */
  static getPlatform () {
    switch (process.platform) {
      case 'win32': return 'Windows'
      case 'linux': return 'Linux'
      case 'darwin': return 'Mac'
      default: return process.platform
    }
  }

  /**
   * @param {string} type
   *
   * @returns {number}
   * @static
   */
  static resolveModTypeColor (type) {
    switch (type) {
      case 'BAN': return 0xE74C3C
      case 'KICK': return 0xF1C40F
      case 'UNKNOWN': return 0x95A5A6
      default: return 0x000000
    }
  }

  /**
   * @param {number} level
   *
   * @returns {number}
   */
  static getFilterLevel (level) {
    switch (level) {
      case 1: return 0.9
      case 2: return 0.8
      case 3: return 0.7
      case 4: return 0.6
      case 5: return 0.5
      case 6: return 0.4
      case 7: return 0.3
      case 8: return 0.2
      case 9: return 0.1
      default: return 0.6
    }
  }

  /**
   * @returns {string[]}
   *
   * @static
   */
  static iconToArray () {
    return [
      '',
      '          WVTzi<<?',
      '        EV<(C:(4e::(Ud',
      '       #I::z:::~X<(J+WHW8WWHg',
      '       Jl::zl::(d=!```_:::::::<7TnH',
      '   WMMMOc:~:?jV>_.`` .:~~::~:~::::?1wH',
      '   KHWMS6::(Z>::::::::_-_:~(_:~~~:::::(TmH',
      '    NWez1Wg$::~+<:~:(>:~:::w::::~:~~~:~::?XU',
      '       khZ>::~j>::(d3::~~:(V2:~::~::~::~::?4H',
      '      #Q$J>::(D::(WD::~::_J~dc:~::~::~:<~:::wd',
      '     R9&d3(<~dc_J3d>:~:~:j>._4/:~:~~:::I:~~:(N',
      ' HNQkqmyf(K:(K(v7!d<::::+RZ! .4-::::~:(I::~::4d',
      ' NgNMMMJl(P(fk+```?b:(dj% ```` W/(c~:~(>:~:::d                             Yahhalo~',
      '     #SK<($Z`jl.`` 4x(HP```````.4J$:::j<:~(+~dd     GitHub: https://github.com/project-yuigahama/Yuigahama',
      '     EW3:(X!.dHM!```?df!`````.`` ($:~(3:::~X+K              Patron: https://patreon.com/inkohx',
      '   WY~J?n($ ,HyW!````` ````.jMk.`,$((+_:~::dKXd',
      '  gX,(5(vXP(-7Y3```````````(NyW[`JK~._7s:~:?N',
      '   NgjJ(ZZ<ZJir```````````` ?T9_.J>(h, j<:::dd',
      '     #JmtX/_~_``````` ....``($2J(k.?&Jx0::~+_jd',
      '     NXHytdn.``````j><~~.(< ^??:(0OUGzd$:::(UmdWd',
      '      pkKWOtVW,.```.6_.~.~?;```.Xttttd$:_j2(KMMNNN',
      '      mWVmTHytOVW&-..___~_-J(QWWStrtdE(JWRnXd',
      '       NNgWmYmOttwy4dP?HD-4kOWZWOttdHqNMMdm',
      '            NNXAtdhdMMMDd-X`4d1Kttd8',
      '               NHHVqr.gNH?^ .h?wyOHJ',
      '                HdjW#WM9X8   .HZH4d8WH',
      '                @MKHD.P`?;    .Wd/RtttrVWk',
      ''
    ]
  }
}

module.exports = Utils

# YuigahamaBot

[![Discord Bots](https://discordbots.org/api/widget/531097309748920371.svg)](https://discordbots.org/bot/531097309748920371)

[![Build Status](https://travis-ci.org/project-yuigahama/Yuigahama.svg?branch=master)](https://travis-ci.org/project-yuigahama/Yuigahama)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/2c27e30554a54614bce2a1ece507b02c)](https://www.codacy.com/app/InkoHX/Yuigahama?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=InkoHX/Yuigahama&amp;utm_campaign=Badge_Grade)
[![GitHub Wiki](https://img.shields.io/badge/GitHub-Wiki-brightgreen.svg)](https://github.com/project-yuigahama/Yuigahama/wiki)
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://paypal.me/pools/c/8e04hFkdhp)

---------------------------------------------------

## Setup

```bash
git clone https://github.com/InkoHX/Yuigahama.git
cd Yuigahama

npm install --production

.env.exampleを.envに書き換え
.envの DISCORD_TOKEN の項目にボットトークンをペースト

npm run start
```

## dependencie

* [dblapi.js](https://github.com/DiscordBotList/dblapi.js)
* [discord.js](https://github.com/discordjs/discord.js)
* [dotenv](https://github.com/motdotla/dotenv)
* [fuse.js](https://github.com/krisk/Fuse)
* [klasa](https://github.com/dirigeants/klasa/tree/master)
* [node-fetch](https://github.com/bitinn/node-fetch)

## Commands

| Command Name          | Aliases                                                      | Category                 | Description                                           | Extended Help                                                | Usage                                                        |
| :-------------------- | ------------------------------------------------------------ | ------------------------ | ----------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| conf                  |                                                              | Admin - General          | Define per-guild settings.                            |                                                              | `yui!conf <set|show|remove|reset> (key:key) (value:value) [...]` |
| help                  | commands                                                     | General - Chat Bot Info  | Display help for a command.                           |                                                              | `yui!《help|commands》 (Command:command)`                    |
| info                  | details, what                                                | General - Chat Bot Info  | Provides some information about this bot.             |                                                              | `yui!《info|details|what》`                                  |
| invite                |                                                              | General - Chat Bot Info  | Displays the join guild link of the bot.              |                                                              | `yui!invite`                                                 |
| ping                  |                                                              | General - Chat Bot Info  | Runs a connection test to Discord.                    |                                                              | `yui!ping`                                                   |
| stats                 |                                                              | General - Chat Bot Info  | Provides some details about the bot and stats.        |                                                              | `yui!stats`                                                  |
| botinfo               |                                                              | General - Chat Bot Info  | Shows the environment in which the bot is running.    |                                                              | `yui!botinfo`                                                |
| donate                |                                                              | General - Chat Bot Info  | Send donation page URL.                               |                                                              | `yui!donate`                                                 |
| userconf              |                                                              | General - User Settings  | Define per-user settings.                             |                                                              | `yui!userconf <set|show|remove|reset> (key:key) (value:value) [...]` |
| avatar                |                                                              | User - General           | Send avatar images of yourself or other users.        |                                                              | `yui!avatar [user:user]`                                     |
| discordjs             |                                                              | DevTools - JavaScript    | Search the document of Discord.js.                    |                                                              | `yui!《discordjs|djs|djsdocs》 <commando|rpc|main:default> <query:string> [branch:string]` |
| pocketmine            | pocketmine-mp, pocketminemp, pmmp                            | DevTools - PocketMine-MP | View the details of the latest PocketMine-MP release. |                                                              | `yui!《pocketmine|pmmp|pocketmine-mp|pocketminemp》`         |
| poggit                |                                                              | DevTools - PocketMine-MP | Search for PocketMine-MP plugins from Poggit.         |                                                              | `yui!poggit <query:...string>`                               |
| fortnite              |                                                              | Game - Fortnite          | You can check various information about Fortnite.     | Older versions of plug-ins may appear in the search results. be careful. | `yui!fortnite <news|challenges>`                             |
| minecraft-namehistory | mc-namehistory, mc-nh, minecraftnamehistory, mcnamehistory, mcnh | Game - Minecraft         | Send player name history.                             |                                                              | `yui!《minecraft-namehistory|mc-namehistory|mc-nh|minecraftnamehistory|mcnamehistory|mcnh》 <name:string>` |
| minecraft-uuid        | mc-uuid, mcuuid, minecraftuuid                               | Game - Minecraft         | Get UUID from player name.                            |                                                              | `yui!《minecraft-uuid|mc-uuid|minecraftuuid|mcuuid》 <name:string>` |
| channelinfo           |                                                              | Guild - Information      | You can check the channel information.                | Only text and voice channels can be checked.                 | `yui!channelinfo <channel:channel>`                          |
| guildinfo             | serverinfo                                                   | Guild - Information      | You can check the information of the server.          |                                                              | `yui!《guildinfo|serverinfo》`                               |
| memberinfo            |                                                              | Guild - Information      | You can check the information of server members.      |                                                              | `yui!memberinfo <member:member>`                             |
| ban                   |                                                              | Guild - Manager          | Ban members from the server.                          |                                                              | `yui!ban <user:user> [days:int{1,7}] [reason:...string]`     |
| kick                  |                                                              | Guild - Manager          | Kick member from the server.                          |                                                              | `yui!kick <member:member> [reason:...string]`                |
| hug                   |                                                              | Picture - Fun            | Hug to other memebr.                                  |                                                              | `yui!hug <member:member>`                                    |
| cat                   |                                                              | Picture - SFW            | Send cat images.                                      |                                                              | `yui!cat`                                                    |
| dog                   |                                                              | Picture - SFW            | Send dog images.                                      |                                                              | `yui!dog`                                                    |
| foxgirl               |                                                              | Picture - SFW            | Send fox girl images.                                 |                                                              | `yui!foxgirl`                                                |
| nekogirl              |                                                              | Picture - SFW            | Send neko girl images.                                | If you add --gif, a GIF image will be sent.                  | `yui!nekogirl`                                               |
| yuigahama             | yui                                                          | Picture - SFW            | Send Yuigahama images.                                |                                                              | `yui!《yuigahama|yui》`                                      |
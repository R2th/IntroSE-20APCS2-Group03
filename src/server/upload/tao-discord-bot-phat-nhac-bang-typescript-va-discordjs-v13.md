# Mở đầu
Discord đã trở thành một dịch vụ liên lạc phổ biến với chúng ta, nhất là đối với giới gaming, và trong hoàn cảnh dịch bệnh này thì nó lại càng trở nên phổ biến hơn. Trước nay, có nhiều Bot hỗ trợ nghe nhạc chung trên Discord như [Groovy](https://groovy.bot/), [Rythm](https://rythm.fm/), etc, nhưng gần đây, Youtube bắt đầu thắt chặt việc kiểm soát việc sử dụng nội dung hơn, nên các bot này lần lượt dừng hoạt động. Vậy tại sao chúng ta không tự tạo một Bot riêng và sử dụng nhỉ 😁
<br>
Đợt trước mình đã có bài viết hướng dẫn tạo một bot như vậy, nhưng đó là dựa trên `Discord.js` v12, hiện nay đã là v13, cấu trúc, cách hoạt động đã thay đổi nhiều, nên hôm nay mình sẽ viết thêm một bài cho `Discord.js` v13.

<p align="center">
    <img src="https://images.viblo.asia/c870bfbc-3429-4cf7-8e0d-5cd6b498ee38.png" />
</p>

# Tổng quan
Bot chúng ta tạo hôm nay sẽ sử dụng `slash command` để gửi lệnh (giống `Groovy`).
Chức năng của bot bao gồm:

| Số thứ tự | Lệnh       | Mô tả                                                                                                                        |
| --------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------- |
| 1         | play       | Tìm và thêm một bài hát trên Youtube vào hàng đợi bằng từ khoá hoặc url, hoặc thêm 1 playlist vào hàng đợi bằng url          |
| 2         | soundcloud | Tìm và thêm một bài hát trên Soundcloud vào hàng đợi bằng từ khoá hoặc url, hoặc thêm 1 playlist/album vào hàng đợi bằng url |
| 3         | pause      | Dừng chơi nhạc                                                                                                               |
| 4         | resume     | Tiếp tục chơi nhạc sau khi bị dừng                                                                                           |
| 5         | skip       | Chuyển sang bài tiếp theo trong hàng đợi nêu có                                                                              |
| 6         | leave      | Dừng chơi nhạc và rời khỏi kệnh thoại                                                                                        |
| 7         | nowplaying | Lấy thông tin về bài hát đang được phát                                                                                      |
| 8         | queue      | Xem danh sách các bài hát trong hàng đợi                                                                                     |
| 9         | jump       | Phát ngay một bài hát trong hàng đợi bằng cách truyền vào vị trí của bài hát đó trong hàng đợi                               |
| 10        | remove     | Xoá một bài hát trong hàng đợi bằng cách truyền vào vị trí của bài hát đó trong hàng đợi                                     |
| 11        | ping       | Trả về độ trễ tới server                                                                                                     |
| 12        | help       | Xem danh sách các lệnh của bot                                                                                               |

# Nội dung
## Đăng ký bot và cấp các quyền cần thiết
Đầu tiên, bạn hãy truy cập [Discord Developer Portal](https://discord.com/developers/applications) và chọn `New Application` để đăng ký một ứng dụng mới.
<br>
<p align="center">
    <img src="https://images.viblo.asia/2ef0eade-0f82-437e-a2e6-e13cb04f94e2.png" />
</p>
<br>

Sau khi tạo xong ứng dụng, bạn chuyển sang tab `OAuth2` và chọn các quyền như hình dưới.

<br>
<p align="center">
    <img src="https://images.viblo.asia/896d6e93-9532-4b0b-ba5c-8dabef080090.png" />
</p>
<p align="center">
    <img src="https://images.viblo.asia/fc8b6e27-1a96-4a30-90ad-d7b8b7f95b43.png" />
</p>
<br>
Sau khi bạn chọn các quyền cần thiết xong, trên màn hình sẽ hiện ra một đoạn liên kết, đây chính là liên kết mà chúng ta sử dụng để mời bot vào server Discord, bạn truy cập và mời luôn bot vào server nhé 😉
<br>
Tiếp theo bạn chuyển sang tab `Bot` và chọn `Copy` để copy token, token này sẽ sử dụng để đăng nhập bot, các bạn lưu lại nhé.

## Tạo bot server

### Yêu cầu
Ở đây mình sử dụng `Discord.js` v13, phiên bản này yêu cầu bạn phải sử dụng `Node.js` 16.6.0 hoặc mới hơn. Ở đây mình sử dụng `yarn`, bạn nào sử dụng `npm` thì tự chuyển đổi nhá 😄

### Thực hành
Cấu trúc thư mục
```shell
root/
├─ src/
│  ├─ commands/
│  │  ├─ collections/
│  │  ├─ messages/
│  │  ├─ schema/
│  ├─ constants/
│  ├─ models/
│  ├─ services/
│  ├─ types/
│  ├─ utils/
```
Đầu tiên bạn tạo một thư mục và chạy `yarn init` và nhập các thuộc tính tương ứng như name, author,... tương ứng nhé.
<br>
Các package mình sử dụng bao gồm

| Tên                                                            | Chức năng                                     |
| -------------------------------------------------------------- | --------------------------------------------- |
| [discord.js](https://github.com/discordjs/discord.js/)         | Thư viện để kết nối với Discord               |
| [@discordjs/opus](https://github.com/discordjs/opus)           | Để sử dụng codec `Opus`                       |
| [@discordjs/voice](https://github.com/discordjs/voice)         | Sử dụng `voice API` của Discord               |
| [reconlx](https://github.com/reconlx/reconlx-api)       | Tạo pagination embed message       |
| [dotenv](https://www.npmjs.com/package/dotenv)                 | Sử dụng các biến môi trường                   |
| [ffmpeg-static](https://github.com/eugeneware/ffmpeg-static)   | Sử dụng `ffmpeg` trên `Node.js`               |
| [libsodium-wrappers](https://github.com/jedisct1/libsodium.js) | Package mã hoá yêu cầu của `@discordjs/voice` |
| [moment](https://github.com/moment/moment)                     | Format thời gian                              |
| [scdl-core](https://github.com/misa198/scdl-core)              | Sử dụng API và stream audio `SoundCloud`  |
| [ytdl-core](https://github.com/fent/node-ytdl-core)            | Stream video `Youtube`                        |
| [ytpl](https://github.com/TimeForANinja/node-ytpl)             | Lấy thông tin của playlist trên `Youtube`     |
| [ytsr](https://github.com/TimeForANinja/node-ytsr)             | Sử dụng API tìm kiếm của `Youtube`            |
| [module-alias](https://github.com/ilearnio/module-alias)       | Sử dụng absolute paths trong production       |

Bên cạnh đó mình còn sử dụng `nodemon`, `ts-node` để thuận tiện hơn khi code và các package `@types` của chúng.
<br>
Cài đặt các packages:
<br>
```bash
yarn add discord.js @discordjs/opus @discordjs/voice dotenv ffmpeg-static libsodium-wrappers moment scdl-core ytdl-core ytpl ytsr module-alias reconlx
```

```bash
yarn add @types/module-alias @types/node nodemon ts-node tsconfig-paths typescript -D
```

Đầu tiên mình tạo một số file config cơ bản.
<br>

Tạo file `tsconfig.json` ở thư mục gốc với nội dung như sau:

```json
{
  "ts-node": {
    "require": [
      "tsconfig-paths/register"
    ]
  },
  "compilerOptions": {
    "module": "commonjs",
    "esModuleInterop": true,
    "target": "es6",
    "noImplicitAny": true,
    "moduleResolution": "node",
    "strict": true,
    "sourceMap": false,
    "outDir": "dist",
    "baseUrl": "src",
    "paths": {
      "@/*": [
        "./*"
      ],
    },
  },
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

Ở đây, để tiện cho việc import, mình setup absolute paths cho project với thư mục gốc là `src` và có đường dẫn gốc là `@/*`, và đăng ký này cho `ts-node`.
<br>
Để sử dụng absolute paths trong production, bạn thêm đoạn mã sau vào file `pagekage.json`:

```json
"_moduleAliases": {
    "@": "dist"
},
```

Tạo file `nodemon.json`:

```json
{
  "watch": ["src"],
  "ext": "ts,json",
  "ignore": ["src/**/*.test.ts"],
  "exec": "ts-node --project tsconfig.json src/index.ts"
}
```

Tạo file `.env`:
```scala:text
TOKEN = bot_token # Token bạn đã copy ở trên
```

Thêm `scripts` vào `package.json`:
```json
"scripts": {
    "start": "NODE_ENV=production node dist/index.js",
    "build": "rm -rf dist && tsc",
    "dev": "nodemon",
},
```

Tạo file `index.ts` trong thư mục `src`:

```javascript:typescript
import { config } from "dotenv";
config();

if (process.env.NODE_ENV === "production") {
  require("module-alias/register");
}

import { Client, Intents } from "discord.js";

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_INTEGRATIONS,
  ],
});

client.on("ready", () => {
  console.log(`> Bot is on ready`);
});

client.login(process.env.TOKEN);
```

Bạn chạy thử `yarn dev`, kết quả ta thu được như dưới và vào trong Discord server kiểm tra xem bot online chưa.
<br>
<p align="center">
    <img src="https://images.viblo.asia/c0a00db7-f91c-4006-8ced-476e8a351108.png" />
</p>
<br>

#### Triển khai slash commands
Tạo file `index.ts` trong `commands/schema`, đây là nơi chứa các commands của bot.

```javascript:typescript
// Danh sách các slash command của bot
import { Constants, ApplicationCommandData } from 'discord.js';

export const schema: ApplicationCommandData[] = [
  {
    name: 'play',
    description: 'Plays a song or playlist on Youtube',
    options: [
      {
        name: 'input',
        type: Constants.ApplicationCommandOptionTypes.STRING,
        description:
          'The url or keyword to search videos or playlist on Youtube',
        required: true,
      },
    ],
  },
  {
    name: 'soundcloud',
    description: 'Plays a song, album or playlist on SoundCloud',
    options: [
      {
        name: 'input',
        type: Constants.ApplicationCommandOptionTypes.STRING,
        description:
          'The url or keyword to search videos or playlist on SoundCloud',
        required: true,
      },
    ],
  },
  {
    name: 'skip',
    description: 'Skip to the next song in the queue',
  },
  {
    name: 'queue',
    description: 'See the music queue',
  },
  {
    name: 'pause',
    description: 'Pauses the song that is currently playing',
  },
  {
    name: 'resume',
    description: 'Resume playback of the current song',
  },
  {
    name: 'leave',
    description: 'Leave the voice channel',
  },
  {
    name: 'nowplaying',
    description: 'See the song that is currently playing',
  },
  {
    name: 'jump',
    description: 'Jump to song in queue by position',
    options: [
      {
        name: 'position',
        type: Constants.ApplicationCommandOptionTypes.NUMBER,
        description: 'The position of song in queue',
        required: true,
      },
    ],
  },
  {
    name: 'remove',
    description: 'Remove song in queue by position',
    options: [
      {
        name: 'position',
        type: Constants.ApplicationCommandOptionTypes.NUMBER,
        description: 'The position of song in queue',
        required: true,
      },
    ],
  },
  {
    name: 'ping',
    description: 'See the ping to server',
  },
  {
    name: 'help',
    description: 'See the help for this bot',
  },
];
```

Bây giờ ta cần deploy các `slash command` này vào Discord server.
<br>
Tạo file `deploy.ts` trong thư mục `commands/collections`:

```javascript:typescript
import { Client } from 'discord.js';
import { schema } from '../schema';

export const deploy = (client: Client): void => {
  client.on('messageCreate', async (message) => {
    if (!message.guild) return;
     // Chỉ cho phép deploy khi là người sở hữu server
    if (!client.application?.owner) await client.application?.fetch();
    if (
      message.content.toLowerCase() === '!deploy' &&
      message.author.id === client.application?.owner?.id
    ) {
      try {
        await message.guild.commands.set(schema);
        await message.reply('Deployed!');
      } catch (e) {
        message.reply('Fail to deploy!');
      }
    }
  });
};
```

Tạo file `index.ts` trong thư mục `commands`:

```javascript:typescript
import { Client } from "discord.js";
import { deploy } from "./collections/deploy";

export const bootstrap = (client: Client): void => {
  deploy(client);
};
```

Import hàm `bootstrap` vào file `src/index.ts` và sửa lại như sau:
```javascript
//...
client.login(process.env.TOKEN).then(() => {
  bootstrap(client);
});
//...
```

Bây giờ bạn vào Discord server, gửi `!deploy` để triển khai các slash command vào server.
<br>
<p align="center">
    <img src="https://images.viblo.asia/1cc7587d-75d9-4ab9-8fa9-3a8c9d315040.gif" />
</p>
<br>

#### Tạo các services cho Youtube và SoundCloud
Tạo các types trong thư mục `types`.

```javascript:typescript
// Playlist.ts
import { Song } from './Song';

export interface Playlist {
  title: string;
  thumbnail: string;
  author: string;
  songs: Song[];
}
```

```perl:typescript
// Song.ts
export enum Platform {
  YOUTUBE = 'Youtube',
  SOUND_CLOUD = 'SoundCloud',
}

export interface Song {
  title: string;
  length: number;
  author: string;
  thumbnail: string;
  url: string;
  platform: Platform;
}
```

Tạo file `regex.ts` trong thư mục `constants`:

```javascript:typescript
// Validate Youtube video URL
export const youtubeVideoRegex = new RegExp(
  /(?:youtube\.com\/(?:[^\\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\\/\s]{11})/,
);

// Validate Youtube playlist URL
export const youtubePlaylistRegex = new RegExp(
  /(?!.*\?.*\bv=)https:\/\/www\.youtube\.com\/.*\?.*\blist=.*/,
);

// Validate SoundCloud track URL
export const soundCloudTrackRegex = new RegExp(
  /^https?:\/\/(soundcloud\.com|snd\.sc)\/(.*)$/,
);

// Validate SoundCloud playlist/album URL
export const soundCloudPlaylistRegex = new RegExp(
  /^https?:\/\/(soundcloud\.com|snd\.sc)\/([^?])*\/sets\/(.*)$/,
);
```

Tạo 2 file `youtube.ts` và `soundcloud.ts` trong thư mục services.

```javascript:typescript
// youtube.ts
import { youtubePlaylistRegex, youtubeVideoRegex } from '@/constants/regex';
import { Playlist } from '@/types/Playlist';
import { Platform, Song } from '@/types/Song';
import ytdl from 'ytdl-core';
import ytpl from 'ytpl';
import ytsr, { Video } from 'ytsr';

export class YoutubeService {
  public static async getVideoDetails(content: string): Promise<Song> {
    const parsedContent = content.match(youtubeVideoRegex);
    let id = '';
    if (!parsedContent) {
      const result = await this.searchVideo(content);
      if (!result) throw new Error();
      id = result;
    } else {
      id = parsedContent[1];
    }
    const videoUrl = this.generateVideoUrl(id);
    const result = await ytdl.getInfo(videoUrl);
    return {
      title: result.videoDetails.title,
      length: parseInt(result.videoDetails.lengthSeconds, 10),
      author: result.videoDetails.author.name,
      thumbnail:
        result.videoDetails.thumbnails[
          result.videoDetails.thumbnails.length - 1
        ].url,
      url: videoUrl,
      platform: Platform.YOUTUBE,
    };
  }

  public static async getPlaylist(url: string): Promise<Playlist> {
    const id = url.split('?')[1].split('=')[1];
    const playlist = await ytpl(id);
    const songs: Song[] = [];
    playlist.items.forEach((item) => {
      songs.push({
        title: item.title,
        thumbnail: item.bestThumbnail.url || '',
        author: item.author.name,
        url: item.shortUrl,
        length: item.durationSec || 0,
        platform: Platform.YOUTUBE,
      });
    });

    return {
      title: playlist.title,
      thumbnail: playlist.bestThumbnail.url || '',
      author: playlist.author.name,
      songs,
    };
  }

  private static async searchVideo(keyword: string): Promise<string> {
    const result = await ytsr(keyword, { pages: 1 });
    const filteredRes = result.items.filter((item) => item.type === 'video');
    if (filteredRes.length === 0) throw new Error();
    const item = filteredRes[0] as Video;
    return item.id;
  }

  public static isPlaylist(url: string): string | null {
    const paths = url.match(youtubePlaylistRegex);
    if (paths) return paths[0];
    return null;
  }

  private static generateVideoUrl(id: string) {
    return `https://www.youtube.com/watch?v=${id}`;
  }
}
```

```javascript:typescript
// soundcloud.ts
import {
  soundCloudPlaylistRegex,
  soundCloudTrackRegex,
} from '@/constants/regex';
import { Playlist } from '@/types/Playlist';
import { Platform, Song } from '@/types/Song';
import { SoundCloud } from 'scdl-core';

export const scdl = new SoundCloud();

export class SoundCloudService {
  public static async getTrackDetails(content: string): Promise<Song> {
    let url = '';
    const paths = content.match(soundCloudTrackRegex);
    if (!paths) {
      url = await this.searchTrack(content);
    } else {
      url = paths[0];
    }
    if (!url) throw new Error();
    const track = await scdl.tracks.getTrack(url);
    if (track)
      return {
        title: track.title,
        length: track.duration / 1000,
        author: track.user.username,
        thumbnail: track.artwork_url ? track.artwork_url : '',
        url,
        platform: Platform.SOUND_CLOUD,
      };
    throw new Error();
  }

  public static async getPlaylist(url: string): Promise<Playlist> {
    const playlist = await scdl.playlists.getPlaylist(url);
    if (!playlist) if (!url) throw new Error();
    const songs: Song[] = [];
    playlist.tracks.forEach((track) => {
      songs.push({
        title: track.title,
        thumbnail: track.artwork_url ? track.artwork_url : '',
        author: track.user.username,
        url: track.permalink_url,
        length: track.duration / 1000,
        platform: Platform.SOUND_CLOUD,
      });
    });

    return {
      title: `SoundCloud set ${playlist.id}`,
      thumbnail: playlist.artwork_url ? playlist.artwork_url : '',
      author: `${playlist.user.first_name} ${playlist.user.last_name}`,
      songs,
    };
  }

  public static isPlaylist(url: string): string | null {
    const paths = url.match(soundCloudPlaylistRegex);
    if (paths) return paths[0];
    return null;
  }

  private static async searchTrack(keyword: string): Promise<string> {
    const res = await scdl.search({
      query: keyword,
      filter: 'tracks',
    });

    if (res.collection.length > 0) {
      return res.collection[0].permalink_url;
    }
    return '';
  }
}
```

Mở file `src/index.ts` và sửa lại như sau.
```javascript:typescript
// ...

import { scdl } from './services/soundcloud';

// ...

client.login(process.env.TOKEN).then(async () => {
  await scdl.connect();
  bootstrap(client);
});
```

#### Triển khai các chức năng
Tạo file `messages` trong thư mục `constants`, đây là nơi chứa các message trả về cho người dùng.

```javascript:typescript
// messages.ts
// Các tin nhắn trả về cho người dùng
export default {
  error: '❌ Error!',
  cantFindAnyThing: "❌ Can't find anything!",
  joinVoiceChannel: '🔊 Join a voice channel and try again!',
  failToJoinVoiceChannel: '❌ Failed to join voice channel!',
  failToPlay: '❌ Failed to play!',
  addedToQueue: 'Added to queue by',
  author: 'Author',
  length: 'Length',
  type: 'Type',
  platform: 'Platform',
  noSongsInQueue: '👀 No songs in queue!',
  skippedSong: '⏩ Skipped song!',
  notPlaying: '🔇 Not playing!',
  alreadyPaused: '⏸ Already paused!',
  paused: '⏸ Paused!',
  resumed: '▶ Resumed!',
  alreadyPlaying: '▶ Already playing!',
  leaved: '👋 Bye bye',
  nothing: '🤷‍♂️ Nothing',
  yourQueue: '🎶 Your queue',
  invalidPosition: '❌ Invalid position!',
  jumpedTo: '⏩ Jumped to',
  removed: '🗑 Removed',
  help: '💡 Help',
  ping: '📶 Ping',
};
```

Tạo file `Server.ts` trong thư mục `models`

```typescript
import { scdl } from '@/services/soundcloud';
import { Platform, Song } from '@/types/Song';
import {
  AudioPlayer,
  AudioPlayerStatus,
  createAudioPlayer,
  createAudioResource,
  entersState,
  VoiceConnection,
  VoiceConnectionDisconnectReason,
  VoiceConnectionStatus,
} from '@discordjs/voice';
import { Snowflake } from 'discord.js';
import ytdl from 'ytdl-core';

export interface QueueItem {
  song: Song;
  requester: string;
}

export class Server {
  public guildId: string;
  public playing?: QueueItem;
  public queue: QueueItem[];
  public readonly voiceConnection: VoiceConnection;
  public readonly audioPlayer: AudioPlayer;
  private isReady = false;

  constructor(voiceConnection: VoiceConnection, guildId: string) {
    this.voiceConnection = voiceConnection;
    this.audioPlayer = createAudioPlayer();
    this.queue = [];
    this.playing = undefined;
    this.guildId = guildId;

    this.voiceConnection.on('stateChange', async (_, newState) => {
      if (newState.status === VoiceConnectionStatus.Disconnected) {
        /*
          Nếu websocket đã bị đóng với mã 4014 có 2 khả năng:
          - Nếu nó có khả năng tự kết nối lại (có khả năng do chuyển kênh thoại), ta cho dảnh ra 5s để tìm hiểu và cho kết nối lại.
          - Nếu bot bị kick khỏi kênh thoại, ta sẽ phá huỷ kết nối.
				*/
        if (
          newState.reason === VoiceConnectionDisconnectReason.WebSocketClose &&
          newState.closeCode === 4014
        ) {
          try {
            await entersState(
              this.voiceConnection,
              VoiceConnectionStatus.Connecting,
              5_000,
            );
          } catch (e) {
            this.leave();
          }
        } else if (this.voiceConnection.rejoinAttempts < 5) {
          this.voiceConnection.rejoin();
        } else {
          this.leave();
        }
      } else if (newState.status === VoiceConnectionStatus.Destroyed) {
        this.leave();
      } else if (
        !this.isReady &&
        (newState.status === VoiceConnectionStatus.Connecting ||
          newState.status === VoiceConnectionStatus.Signalling)
      ) {
        /*
					Nếu tín hiệu kết nối ở trạng thái "Connecting" hoặc "Signalling", ta sẽ đợi 20s để kết nối sẵn sàng.
          Sau 20s nếu kết nối không thành công, ta sẽ phá huỷ kết nối.
				*/
        this.isReady = true;
        try {
          await entersState(
            this.voiceConnection,
            VoiceConnectionStatus.Ready,
            20_000,
          );
        } catch {
          if (
            this.voiceConnection.state.status !==
            VoiceConnectionStatus.Destroyed
          )
            this.voiceConnection.destroy();
        } finally {
          this.isReady = false;
        }
      }
    });

    // Đây là sự kiện khi một bài hát kết thúc và ta chuyển sang bài mới.
    this.audioPlayer.on('stateChange', async (oldState, newState) => {
      if (
        newState.status === AudioPlayerStatus.Idle &&
        oldState.status !== AudioPlayerStatus.Idle
      ) {
        await this.play();
      }
    });

    voiceConnection.subscribe(this.audioPlayer);
  }

  public async addSongs(queueItems: QueueItem[]): Promise<void> {
    this.queue = this.queue.concat(queueItems);
    if (!this.playing) {
      await this.play();
    }
  }

  public stop(): void {
    this.playing = undefined;
    this.queue = [];
    this.audioPlayer.stop();
  }

  // Bot rời khỏi kênh thoại và xoá server hiện tại khỏi map.
  public leave(): void {
    if (this.voiceConnection.state.status !== VoiceConnectionStatus.Destroyed) {
      this.voiceConnection.destroy();
    }
    this.stop();
    servers.delete(this.guildId);
  }

  // Dừng bài hát đang phát
  public pause(): void {
    this.audioPlayer.pause();
  }

  // Tiếp tục bài hát bị dừng
  public resume(): void {
    this.audioPlayer.unpause();
  }

  // Chuyển tới bài hát trong queue
  public async jump(position: number): Promise<QueueItem> {
    const target = this.queue[position - 1];
    this.queue = this.queue
      .splice(0, position - 1)
      .concat(this.queue.splice(position, this.queue.length - 1));
    this.queue.unshift(target);
    await this.play();
    return target;
  }

  // Xoá bài hát trong queue
  public remove(position: number): QueueItem {
    return this.queue.splice(position - 1, 1)[0];
  }

  public async play(): Promise<void> {
    try {
      // Phát bài hát đầu tiên trong queue nếu queue không rỗng
      if (this.queue.length > 0) {
        this.playing = this.queue.shift() as QueueItem;
        let stream: any;
        const highWaterMark = 1024 * 1024 * 10;
        if (this.playing?.song.platform === Platform.YOUTUBE) {
          stream = ytdl(this.playing.song.url, {
            highWaterMark,
            filter: 'audioonly',
            quality: 'highestaudio',
          });
        } else {
          stream = await scdl.download(this.playing.song.url, {
            highWaterMark,
          });
        }
        const audioResource = createAudioResource(stream);
        this.audioPlayer.play(audioResource);
      } else {
        // Dừng việc phát nhạc, gán thuộc tính playing = undefined
        this.playing = undefined;
        this.audioPlayer.stop();
      }
    } catch (e) {
      // Nếu việc stream 1 bài hát có trục trặc gì, thì ta sẽ phát tiếp tục bài hát tiếp theo
      this.play();
    }
  }
}

// Map các server mà bot đang trong kênh thoại
export const servers = new Map<Snowflake, Server>();
```

Tạo file `formatTime.ts` trong thư mục `utils`, chứa hàm chuyển thời gian từ giây qua dạng `mm:ss` hoặc `hh:mm:ss`.

```javascript:typescript
import moment from 'moment';

export const formatSeconds = (seconds: number): string => {
  return moment
    .utc(seconds * 1000)
    .format(seconds > 3600 ? 'HH:mm:ss' : 'mm:ss');
};
```

##### Chức năng `play` 

Tạo file `playMessage.ts` trong folder `commands/messages`, dùng để tạo embed message trả về khi dùng lệnh `play` hoặc `soundcloud`.

```javascript:typescript
import messages from '@/constants/messages';
import { Platform } from '@/types/Song';
import { formatSeconds } from '@/utils/formatTime';
import { EmbedFieldData, MessageEmbed } from 'discord.js';

export const createPlayMessage = (payload: {
  title: string;
  url: string;
  author: string;
  thumbnail: string;
  type: 'Song' | 'Playlist';
  length: number;
  platform: Platform;
  requester: string;
}): MessageEmbed => {
  const author: EmbedFieldData = {
    name: messages.author,
    value: payload.author,
    inline: true,
  };
  const length: EmbedFieldData = {
    name: messages.length,
    value:
      payload.type === 'Playlist'
        ? payload.length.toString()
        : formatSeconds(payload.length),
    inline: true,
  };
  const type: EmbedFieldData = {
    name: messages.type,
    value: payload.type,
    inline: true,
  };
  return new MessageEmbed()
    .setTitle(payload.title)
    .setURL(payload.url)
    .setAuthor(`${messages.addedToQueue} ${payload.requester}`)
    .setThumbnail(payload.thumbnail)
    .addFields(author, length, type);
};
```

Tạo file `play.ts` trong thư mục `commands/collections`.

```javascript:typescript
import messages from '@/constants/messages';
import { QueueItem, Server, servers } from '@/models/Server';
import { YoutubeService } from '@/services/youtube';
import { Platform } from '@/types/Song';
import {
  entersState,
  joinVoiceChannel,
  VoiceConnectionStatus,
} from '@discordjs/voice';
import { CommandInteraction, GuildMember } from 'discord.js';
import { createPlayMessage } from '../messages/playMessage';

export const play = {
  name: 'play',
  execute: async (interaction: CommandInteraction): Promise<void> => {
    await interaction.deferReply();
    let server = servers.get(interaction.guildId as string);
    if (!server) {
      if (
        interaction.member instanceof GuildMember &&
        interaction.member.voice.channel
      ) {
        const channel = interaction.member.voice.channel;
        server = new Server(
          joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
          }),
          interaction.guildId as string,
        );
        servers.set(interaction.guildId as string, server);
      }
    }

    if (!server) {
      await interaction.followUp(messages.joinVoiceChannel);
      return;
    }

    // Make sure the connection is ready before processing the user's request
    try {
      await entersState(
        server.voiceConnection,
        VoiceConnectionStatus.Ready,
        20e3,
      );
    } catch (error) {
      await interaction.followUp(messages.failToJoinVoiceChannel);
      return;
    }
    try {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const input = interaction.options.get('input')!.value! as string;
      const playListId = YoutubeService.isPlaylist(input);
      if (playListId) {
        const playlist = await YoutubeService.getPlaylist(playListId);
        const songs = playlist.songs.map((song) => {
          const queueItem: QueueItem = {
            song,
            requester: interaction.member?.user.username as string,
          };
          return queueItem;
        });
        await server.addSongs(songs);
        interaction.followUp({
          embeds: [
            createPlayMessage({
              title: playlist.title,
              url: input,
              author: playlist.author,
              thumbnail: playlist.thumbnail,
              type: 'Playlist',
              length: playlist.songs.length,
              platform: Platform.YOUTUBE,
              requester: interaction.member?.user.username as string,
            }),
          ],
        });
      } else {
        const song = await YoutubeService.getVideoDetails(input);
        const queueItem: QueueItem = {
          song,
          requester: interaction.member?.user.username as string,
        };
        await server.addSongs([queueItem]);
        interaction.followUp({
          embeds: [
            createPlayMessage({
              title: song.title,
              url: song.url,
              author: song.author,
              thumbnail: song.thumbnail,
              type: 'Song',
              length: song.length,
              platform: Platform.YOUTUBE,
              requester: interaction.member?.user.username as string,
            }),
          ],
        });
      }
    } catch (error) {
      await interaction.followUp(messages.failToPlay);
    }
  },
};
```

Import file `play.ts` vào file `commands/index.ts` và sửa lại như sau.

```javascript:typescript
import messages from '@/constants/messages';
import { Client } from 'discord.js';
import { deploy } from './collections/deploy';
import { play } from './collections/play';

export const bootstrap = (client: Client): void => {
  deploy(client);

  client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand() || !interaction.guildId) return;
    try {
      switch (interaction.commandName) {
        case play.name:
          play.execute(interaction);
          break;
      }
    } catch (e) {
      interaction.reply(messages.error);
    }
  });
};
```

Test thử nào 😁
<br>
<p align="center">
    <img src="https://images.viblo.asia/31f8d3ac-0937-4e27-8bf8-0e41b746be1c.gif" />
</p>
<br>

Tương tự với các chức năng còn lại. 

##### Chức năng `soundcloud`

Tạo file `soundcloud.ts` trong thư mục `commands/collections`.

```javascript:typescript
import messages from '@/constants/messages';
import { QueueItem, Server, servers } from '@/models/Server';
import { SoundCloudService } from '@/services/soundcloud';
import { Platform } from '@/types/Song';
import {
  entersState,
  joinVoiceChannel,
  VoiceConnectionStatus,
} from '@discordjs/voice';
import { CommandInteraction, GuildMember } from 'discord.js';
import { createPlayMessage } from '../messages/playMessage';

export const soundcloud = {
  name: 'soundcloud',
  execute: async (interaction: CommandInteraction): Promise<void> => {
    await interaction.deferReply();
    let server = servers.get(interaction.guildId as string);
    if (!server) {
      if (
        interaction.member instanceof GuildMember &&
        interaction.member.voice.channel
      ) {
        const channel = interaction.member.voice.channel;
        server = new Server(
          joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
          }),
          interaction.guildId as string,
        );
        servers.set(interaction.guildId as string, server);
      }
    }

    if (!server) {
      await interaction.followUp(messages.joinVoiceChannel);
      return;
    }

    // Make sure the connection is ready before processing the user's request
    try {
      await entersState(
        server.voiceConnection,
        VoiceConnectionStatus.Ready,
        20e3,
      );
    } catch (error) {
      await interaction.followUp(messages.failToJoinVoiceChannel);
      return;
    }
    try {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const input = interaction.options.get('input')!.value! as string;
      const playlistUrl = SoundCloudService.isPlaylist(input);
      if (playlistUrl) {
        const playlist = await SoundCloudService.getPlaylist(playlistUrl);
        const songs = playlist.songs.map((song) => {
          const queueItem: QueueItem = {
            song,
            requester: interaction.member?.user.username as string,
          };
          return queueItem;
        });
        await server.addSongs(songs);
        interaction.followUp({
          embeds: [
            createPlayMessage({
              title: playlist.title,
              url: playlistUrl,
              author: playlist.author,
              thumbnail: playlist.thumbnail,
              type: 'Playlist',
              length: playlist.songs.length,
              platform: Platform.SOUND_CLOUD,
              requester: interaction.member?.user.username as string,
            }),
          ],
        });
      } else {
        const song = await SoundCloudService.getTrackDetails(input);
        const queueItem: QueueItem = {
          song,
          requester: interaction.member?.user.username as string,
        };
        await server.addSongs([queueItem]);
        interaction.followUp({
          embeds: [
            createPlayMessage({
              title: song.title,
              url: song.url,
              author: song.author,
              thumbnail: song.thumbnail,
              type: 'Song',
              length: song.length,
              platform: Platform.SOUND_CLOUD,
              requester: interaction.member?.user.username as string,
            }),
          ],
        });
      }
    } catch (error) {
      await interaction.followUp(messages.failToPlay);
    }
  },
};
```

##### Chức năng `pause`

Tạo file `pause.ts` trong `commands/collections`

```javascript:typescript
import messages from '@/constants/messages';
import { servers } from '@/models/Server';
import { AudioPlayerStatus } from '@discordjs/voice';
import { CommandInteraction } from 'discord.js';

export const pause = {
  name: 'pause',
  execute: async (interaction: CommandInteraction): Promise<void> => {
    await interaction.deferReply();
    const server = servers.get(interaction.guildId as string);
    if (!server) {
      await interaction.followUp(messages.joinVoiceChannel);
      return;
    }
    if (server.audioPlayer.state.status === AudioPlayerStatus.Playing) {
      server.audioPlayer.pause();
      await interaction.followUp(messages.paused);
      return;
    }
    await interaction.followUp(messages.notPlaying);
  },
};

```

##### Chức năng `resume`

Tạo file `resume.ts` trong `commands/collections`

```javascript:typescript
import messages from '@/constants/messages';
import { servers } from '@/models/Server';
import { AudioPlayerStatus } from '@discordjs/voice';
import { CommandInteraction } from 'discord.js';

export const resume = {
  name: 'resume',
  execute: async (interaction: CommandInteraction): Promise<void> => {
    await interaction.deferReply();
    const server = servers.get(interaction.guildId as string);
    if (!server) {
      await interaction.followUp(messages.joinVoiceChannel);
      return;
    }
    if (server.audioPlayer.state.status === AudioPlayerStatus.Paused) {
      server.audioPlayer.unpause();
      await interaction.followUp(messages.resumed);
      return;
    }
    await interaction.followUp(messages.notPlaying);
  },
};
```

##### Chức năng `skip`

Tạo file `skip.ts` trong `commands/collections`

```javascript:typescript
import messages from '@/constants/messages';
import { servers } from '@/models/Server';
import { CommandInteraction } from 'discord.js';

export const skip = {
  name: 'skip',
  execute: async (interaction: CommandInteraction): Promise<void> => {
    await interaction.deferReply();
    const server = servers.get(interaction.guildId as string);
    if (!server) {
      await interaction.followUp(messages.joinVoiceChannel);
      return;
    }
    if (server.queue.length === 0) {
      await interaction.followUp(messages.noSongsInQueue);
    }
    await server.play();
    if (server.playing) {
      await interaction.followUp(messages.skippedSong);
    }
  },
};

```

##### Chức năng `leave`

Tạo file `leave.ts` trong `commands/collections`

```javascript:typescript
import messages from '@/constants/messages';
import { servers } from '@/models/Server';
import { CommandInteraction } from 'discord.js';

export const leave = {
  name: 'leave',
  execute: async (interaction: CommandInteraction): Promise<void> => {
    await interaction.deferReply();
    const server = servers.get(interaction.guildId as string);
    if (!server) {
      await interaction.followUp(messages.joinVoiceChannel);
      return;
    }
    server.leave();
    await interaction.followUp(messages.leaved);
  },
};
```

##### Chức năng `nowplaying`

Tạo file `nowPlayingMessage.ts` trong `commands/messages`

```javascript:typescript
import messages from '@/constants/messages';
import { Platform } from '@/types/Song';
import { formatSeconds } from '@/utils/formatTime';
import { EmbedFieldData, MessageEmbed } from 'discord.js';

export const createNowPlayingMessage = (payload: {
  title: string;
  url: string;
  author: string;
  thumbnail: string;
  length: number;
  platform: Platform;
  requester: string;
}): MessageEmbed => {
  const author: EmbedFieldData = {
    name: messages.author,
    value: payload.author,
    inline: true,
  };
  const length: EmbedFieldData = {
    name: messages.length,
    value: formatSeconds(payload.length),
    inline: true,
  };
  return new MessageEmbed()
    .setTitle(payload.title)
    .setURL(payload.url)
    .setAuthor(`${messages.addedToQueue} ${payload.requester}`)
    .setThumbnail(payload.thumbnail)
    .addFields(author, length);
};
```

Tạo file `nowplaying.ts` trong `commands/collections`

```javascript:typescript
import messages from '@/constants/messages';
import { servers } from '@/models/Server';
import { CommandInteraction } from 'discord.js';
import { createNowPlayingMessage } from '../messages/nowPlayingMessage';

export const nowPlaying = {
  name: 'nowplaying',
  execute: async (interaction: CommandInteraction): Promise<void> => {
    await interaction.deferReply();
    const server = servers.get(interaction.guildId as string);
    if (!server) {
      await interaction.followUp(messages.joinVoiceChannel);
      return;
    }
    if (!server.playing) {
      await interaction.followUp(messages.notPlaying);
      return;
    }
    const playing = server.playing;
    const message = createNowPlayingMessage({
      title: playing.song.title,
      author: playing.song.author,
      thumbnail: playing.song.thumbnail,
      url: playing.song.url,
      length: playing.song.length,
      platform: playing.song.platform,
      requester: playing.requester,
    });
    await interaction.followUp({
      embeds: [message],
    });
  },
};
```

##### Chức năng `queue`

Tạo file `queueMessage.ts` trong `commands/messages`

```javascript:typescript
import messages from '@/constants/messages';
import { QueueItem } from '@/models/Server';
import { formatSeconds } from '@/utils/formatTime';
import { MessageEmbed } from 'discord.js';

const MAX_SONGS_PER_PAGE = 10;

const generatePageMessage = (items: QueueItem[], start: number) => {
  const embedMessage = new MessageEmbed({
    title: messages.yourQueue,
    fields: items.map((item, index) => ({
      name: `${start + 1 + index}. ${item.song.title} | ${item.song.author}`,
      value: `${formatSeconds(item.song.length)} | ${item.song.platform} | ${
        messages.addedToQueue
      } ${item.requester}`,
    })),
  });
  return embedMessage;
};

export const createQueueMessages = (queue: QueueItem[]): MessageEmbed[] => {
  if (queue.length < MAX_SONGS_PER_PAGE) {
    const embedMessage = generatePageMessage(queue, 0);
    return [embedMessage];
  } else {
    const embedMessages = [];
    for (let i = 0; i < queue.length; i += MAX_SONGS_PER_PAGE) {
      const items = generatePageMessage(
        queue.slice(i, i + MAX_SONGS_PER_PAGE),
        i,
      );
      embedMessages.push(items);
    }
    return embedMessages;
  }
};
```

Tạo file `queue.ts` trong `commands/collections`.

```javascript:typescript
import messages from '@/constants/messages';
import { servers } from '@/models/Server';
import { CommandInteraction, TextChannel } from 'discord.js';
import { pagination } from 'reconlx';
import { createQueueMessages } from '../messages/queueMessage';

export const queue = {
  name: 'queue',
  execute: async (interaction: CommandInteraction): Promise<void> => {
    await interaction.deferReply();
    const server = servers.get(interaction.guildId as string);
    if (!server) {
      await interaction.followUp(messages.joinVoiceChannel);
      return;
    }
    if (server.queue.length === 0) {
      await interaction.followUp(messages.nothing);
      return;
    }

    const embedMessages = createQueueMessages(server.queue);
    await interaction.editReply(messages.yourQueue);

    if (
      interaction &&
      interaction.channel &&
      interaction.channel instanceof TextChannel
    ) {
      await pagination({
        embeds: embedMessages,
        channel: interaction.channel as TextChannel,
        author: interaction.user,
        fastSkip: true,
      });
    }
  },
};
```

##### Chức năng `jump`

Tạo file `jump.ts` trong `commands/collections`.

```javascript:typescript
import messages from '@/constants/messages';
import { servers } from '@/models/Server';
import { CommandInteraction } from 'discord.js';

export const jump = {
  name: 'jump',
  execute: async (interaction: CommandInteraction): Promise<void> => {
    await interaction.deferReply();
    const server = servers.get(interaction.guildId as string);
    if (!server) {
      await interaction.followUp(messages.joinVoiceChannel);
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const input = interaction.options.get('position')!.value! as number;
    if (input < 1 || input > server.queue.length || !Number.isInteger(input)) {
      await interaction.followUp(messages.invalidPosition);
      return;
    }
    const target = await server.jump(input);
    await interaction.followUp(`${messages.jumpedTo} ${target.song.title}`);
  },
};
```

##### Chức năng `remove`

Tạo file `remove.ts` trong `commands/collections`.

```javascript:typescript
import messages from '@/constants/messages';
import { servers } from '@/models/Server';
import { CommandInteraction } from 'discord.js';

export const remove = {
  name: 'remove',
  execute: async (interaction: CommandInteraction): Promise<void> => {
    await interaction.deferReply();
    const server = servers.get(interaction.guildId as string);
    if (!server) {
      await interaction.followUp(messages.joinVoiceChannel);
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const input = interaction.options.get('position')!.value! as number;
    if (input < 1 || input > server.queue.length || !Number.isInteger(input)) {
      await interaction.followUp(messages.invalidPosition);
      return;
    }
    const target = server.remove(input);
    await interaction.followUp(`${messages.removed} ${target.song.title}`);
  },
};
```

##### Chức năng `ping`

Tạo file `ping.ts` trong `commands/collections`.

```javascript:typescript
import messages from '@/constants/messages';
import { Client, CommandInteraction } from 'discord.js';

export const ping = {
  name: 'ping',
  execute: async (
    client: Client,
    interaction: CommandInteraction,
  ): Promise<void> => {
    await interaction.deferReply();
    interaction.followUp(
      `${messages.ping} - Latency: ${Math.round(
        Date.now() - interaction.createdTimestamp,
      )}ms - API Latency: ${Math.round(client.ws.ping)}ms`,
    );
  },
};
```

##### Chức năng `help`

Tạo file `helpMessage.ts` trong `commands/messages`.

```javascript:typescript
import { schema } from '@/commands/schema';
import messages from '@/constants/messages';
import { BaseApplicationCommandOptionsData, MessageEmbed } from 'discord.js';

export const createHelpMessage = (): MessageEmbed => {
  const embedMessage = new MessageEmbed({
    title: messages.help,
    fields: (schema as BaseApplicationCommandOptionsData[]).map(
      (item, index) => ({
        name: `${index + 1}. ${item.name}`,
        value: `${item.description}`,
      }),
    ),
  });
  return embedMessage;
};
```

Tạo file `help.ts` trong `commands/collections`.

```javascript:typescript
import { CommandInteraction } from 'discord.js';
import { createHelpMessage } from '../messages/helpMessage';

export const help = {
  name: 'help',
  execute: async (interaction: CommandInteraction): Promise<void> => {
    await interaction.deferReply();
    await interaction.followUp({
      embeds: [createHelpMessage()],
    });
  },
};
```

Import tất cả các chức năng trong `commands/collections` vào file `commands/index.ts` và sửa lại như sau.

```javascript:typescript
import messages from '@/constants/messages';
import { Client } from 'discord.js';
import { deploy } from './collections/deploy';
import { help } from './collections/help';
import { jump } from './collections/jump';
import { leave } from './collections/leave';
import { nowPlaying } from './collections/nowplaying';
import { pause } from './collections/pause';
import { ping } from './collections/ping';
import { play } from './collections/play';
import { queue } from './collections/queue';
import { remove } from './collections/remove';
import { resume } from './collections/resume';
import { skip } from './collections/skip';
import { soundcloud } from './collections/soundcloud';

export const bootstrap = (client: Client): void => {
  deploy(client);

  client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand() || !interaction.guildId) return;
    try {
      switch (interaction.commandName) {
        case play.name:
          play.execute(interaction);
          break;
        case skip.name:
          skip.execute(interaction);
          break;
        case soundcloud.name:
          soundcloud.execute(interaction);
          break;
        case pause.name:
          pause.execute(interaction);
          break;
        case resume.name:
          resume.execute(interaction);
          break;
        case leave.name:
          leave.execute(interaction);
          break;
        case nowPlaying.name:
          nowPlaying.execute(interaction);
          break;
        case queue.name:
          queue.execute(interaction);
          break;
        case jump.name:
          jump.execute(interaction);
          break;
        case ping.name:
          ping.execute(client, interaction);
          break;
        case remove.name:
          remove.execute(interaction);
          break;
        case help.name:
          help.execute(interaction);
          break;
      }
    } catch (e) {
      interaction.reply(messages.error);
    }
  });
};
```

### Demo
<br>
<p align="center">
    <img src="https://res.cloudinary.com/dumfvnj9f/image/upload/v1631817107/viblo/test-all_jjrlze.gif" />
</p>
<br>

### Deploy
Ở đây mình sẽ deploy lên heroku. Để bot không bị sleep, mình cần dùng package `heroku-awake` để request mỗi 25 phút lên server.
Cài 2 packages `express` và `heroku-awake`

```bash
yarn add express heroku-awake
```

```bash
yarn add @types/express -D
```

Sửa lại file `src/index.ts` như sau:

```javascript:typescript
import { config } from 'dotenv';
config();

if (process.env.NODE_ENV === 'production') {
  require('module-alias/register');
}

import { Client, Intents } from 'discord.js';
import { bootstrap } from './commands';
import { scdl } from './services/soundcloud';
import express, { Request, Response } from 'express';
import herokuAwake from 'heroku-awake';

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_INTEGRATIONS,
  ],
});

client.on('ready', () => {
  console.log(`> Bot is on ready`);
});

client.login(process.env.TOKEN).then(async () => {
  await scdl.connect();
  bootstrap(client);
});

const app = express();

app.get('/', (_req: Request, res: Response) => {
  return res.send({
    message: 'Bot is running',
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`> Bot is on listening`);
  herokuAwake(process.env.APP_URL || 'http://localhost:3000');
});
```

Truy cập [Heroku](https://dashboard.heroku.com/) để tạo ứng dụng mới. 
<br>
<p align="center">
    <img src="https://images.viblo.asia/532ba4dc-32d4-48dc-b434-d339cc3f0f4d.png" />
</p>
<br>

Chuyển qua tab `Settings` chọn `Reveal Config Vars`. Sau đó set 2 biến. `TOKEN` và `APP_URL` tương ứng của bạn.

<br>
<p align="center">
    <img src="https://images.viblo.asia/fcff0b8d-7b99-4739-b2cd-2e94064e6866.png" />
</p>
<br>

Cài đặt `heroku-cli` nếu bạn chưa có tại [đây](https://devcenter.heroku.com/articles/heroku-cli)

Bật `terminal` trong project của bạn.

Chạy lệnh dưới đây để login nếu bạn chưa làm.

```objectivec
heroku login
```

Chạy lệnh sau (nhớ thay đúng tên ứng dụng của bạn nhé 😂).

```bash
git init \
heroku git:remote -a discordbot-ts \
git add . \
git commit -am "make it better" \
git push heroku master
```

- Vercel không host được bot do Vercel không hỗ trợ Websocket.
- Nếu các bạn muốn bot "nuột" hơn thì có thể host trên VPS (nếu có), hoặc các dịch vụ chuyên host bot (giá rất rẻ, chỉ từ $1/tháng). 😗

## Tham khảo
[Github repository](https://github.com/misa198/misabot-discord)
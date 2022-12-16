*Bài viết này đã outdated, nếu muốn tạo Discord music bot mới, vui lòng xem [bài viết này](https://viblo.asia/p/tao-discord-bot-phat-nhac-bang-typescript-va-discordjs-v13-XL6lA60J5ek)*
# Mở đầu
Chắc hẳn chúng ta đã nghe đến Discord. Đây là một nền tảng giao tiếp được thiết kế hướng tới game thủ, giúp ta có thể gửi tin nhắn, ảnh, file, hoặc trò chuyện qua kênh thoại.<br>
Ở trong bài viết này, mình sẽ hướng dẫn các bạn tạo một con bot có thể phát nhạc trong kênh thoại với các chức năng play, pause, resume, skip, stop, clear, nowplaying.

# Nội dung
## Tạo bot Discord
Đầu tiên, chúng ta hãy truy cập https://discord.com/developers/applications để tạo một ứng dụng cho Discord.<br>
![](https://images.viblo.asia/4b13e19d-f073-4acf-8fc4-7ec31e9ecd8a.png)
<br>
<br>
Sau khi tạo ứng dụng xong, vào Bot, click "Add Bot" để tạo bot
<br>
<br>
![](https://images.viblo.asia/0d74e4ab-ca81-44da-8e49-da3c2254cf79.png)
<br>
Click ```Copy``` để copy token của bot. Token này giúp bot đăng nhập với Discord.
<br>

## Tạo server bot Node.js
Mình sử dụng các packages sau:<br>
* ```discord.js```: Đây là package của Discord để bot của bạn có thể login và tương tác với người dùng được.<br>
* ```ytdl-core```: Dùng để get thông tin video và stream video trên Youtube.<br>
* ```ytpl```: Dùng để get thông tin và danh sách video của 1 playlist trên Youtube.<br>
* ```ytsr```: Dùng để tìm kiếm 1 video trên Youtube bằng từ khoá.<br>
* ```ffmpeg-static```: Hoạt động cùng với ytdl-core để stream audio.<br>
* ```dotenv```: Dùng để sử dụng với file .env.<br>
* ```nodemon```: Giúp chúng ta thuận tiện hơn trong quá trình dev.<br>

Cài đặt các packages cần thiết:
<br>
<br>
```yarn add discord.js ytdl-core ytpl ytsr ffmpeg-static dotenv```
<br>
hoặc
<br>
```npm i add discord.js ytdl-core ytpl ytsr ffmpeg-static dotenv --save```
<br>
<br>
```yarn add @types/node @types/ws ts-node nodemon typescript -D```
<br>
hoặc
<br>
```npm i @types/node @types/ws ts-node nodemon typescript  --save-dev```
<br>
<br>
Tại thời điểm viết bài, phiên bản LTS mới nhất của Node.js là 14.17.0. Nhưng phiên bản này có 1 vài trục trặc với việc pause/resume của ```ytdl-core``` nên mình sẽ sử dụng bản 14.15.4. Thêm dòng sau vào file ```pagekage.json```.<br>

```
"engines": {
    "node": "14.15.4"
  },
```
<br>
Tạo file tsconfig.json với nội dung sau:<br>

```
{
  "compilerOptions": {
    "module": "commonjs",
    "esModuleInterop": true,
    "target": "es6",
    "noImplicitAny": true,
    "moduleResolution": "node",
    "sourceMap": false,
    "outDir": "dist",
    "baseUrl": ".",
    "paths": {
      "*": [
        "node_modules/*"
      ]
    },
  },
  "include": [
    "src/**/*"
  ]
}
```

<br>

Tạo file ```nodemon.json``` với nội dung sau:
<br>

```
{
  "watch": ["src"],
  "ext": "ts,json",
  "ignore": ["src/**/*.spec.ts"],
  "exec": "ts-node ./src/index.ts"
}
```
<br>

Thêm đoạn sau vào ```package.json```.
<br>
```
"main": "dist/index.js",
  "scripts": {
    "dev": "nodemon",
    "build": "tsc",
    "start": "node dist/index.js",
  },
```
<br>

Tạo file ```.env``` ở root folder thêm đoạn sau vào file:
<br>
```
TOKEN = <Token mà bạn đã copy ở trên>
```

<br>
Tạo thư mục src và thêm file index.ts:
<br>

```
  import { config } from "dotenv";
  config();
  
  import { Client } from "discord.js";

  const client = new Client();
  const token = process.env.TOKEN;
  const prefix = "!";
  // Đây là tiền tố trước mỗi lệnh mà ta ra hiệu cho bot từ khung chat.
  // Lệnh có dạng như sau "!play Nhạc Đen Vâu", "!pause",...

  client.on("message", (message) => {
    const args = message.content.substring(prefix.length).split(" ");
    const content = message.content.substring(prefix.length + args[0].length);

    if (message.content[0] === "!") {
      switch (args[0]) {
           // Tại đây sẽ đặt các case mà bot cần thực hiện như play, pause, resume,....
      }
    }
  });

  client.on("ready", () => {
    console.log("🏃‍♀️ Misabot is online! 💨");
  });

  client.once("reconnecting", () => {
    console.log("🔗 Reconnecting!");
  });

  client.once("disconnect", () => {
    console.log("🛑 Disconnect!");
  });
  
    client.login(token);
```

<br>

Tạo folder ```constant``` trong ```src``` chứa file regex.ts. Trong file này có các regex mà ta dùng để check url video hoặc playlist:

<br>

```
export const youtubeVideoRegex = new RegExp(
  /(?:youtube\.com\/(?:[^\\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\\/\s]{11})/
);

export const youtubePlaylistRegex = new RegExp(
  /(?!.*\?.*\bv=)https:\/\/www\.youtube\.com\/.*\?.*\blist=.*/
);
```
<br>

Tạo folder ```data``` trong ```src``` có file ```server.ts``` như sau:<br>
<br>

```
import { StreamDispatcher } from "discord.js";

import { Resource } from "../services/youtube";

export interface Song {
  requester: string;
  resource: Resource;
}

interface Server {
  [key: string]: {
    playing?: {
      song: Song;
      startedAt: number;
    };
    queue: Song[];
    dispatcher?: StreamDispatcher;
  };
}

export const servers: Server = {};
// Mỗi máy chủ ta tạo trên Discord có 1 Object Server riêng có key là id của máy chủ đó. 
// Object này sẽ lưu danh sách các bài hát đang chờ được phát "queue".
// Bài hát đang phát "playing".
// Dispatcher quản lí việc stream từ server bot tới Discord.
```
<br>

Tạo foder services trong src có file youtube.ts. Đây là nơi ta tương tác với api Youtube:<br>

```
import ytsr from "ytsr";
import ytdl from "ytdl-core";
import ytpl from "ytpl";

import { youtubeVideoRegex } from "../constant/regex";

// Tìm video bằng từ khoá và trả về id video nếu tìm thấy hoặc trả về tin nhắn lỗi.
const searchVideo = (keyword: string) => {
  try {
    return ytsr(keyword, { pages: 1 })
      .then((result) => {
        const filteredRes = result.items.filter((e) => e.type === "video");
        if (filteredRes.length === 0) throw "🔎 Can't find video!";
        const item = filteredRes[0] as {
          id: string;
        };
        return item.id;
      })
      .catch((error) => {
        throw error;
      });
  } catch (e) {
    throw "❌ Invalid params";
  }
};

// Cấu trúc của 1 video mà ta sẽ lưu vào server
export interface Resource {
  title: string;
  length: number;
  author: string;
  thumbnail: string;
  url: string;
}

// Lấy thông tin của 1 video bằng nội dung truyền vào. URL hoặc từ khoá
export const getVideoDetails = async (content: string): Promise<Resource> => {
  const parsedContent = content.match(youtubeVideoRegex);
  let id = "";

  if (!parsedContent) {
    id = await searchVideo(content);
  } else {
    id = parsedContent[1];
  }
  const url = `https://www.youtube.com/watch?v=${id}`;

  return ytdl
    .getInfo(url)
    .then((result) => {
      return {
        title: result.videoDetails.title,
        length: parseInt(result.videoDetails.lengthSeconds, 10),
        author: result.videoDetails.author.name,
        thumbnail:
          result.videoDetails.thumbnails[
            result.videoDetails.thumbnails.length - 1
          ].url,
        url,
      };
    })
    .catch(() => {
      throw "❌ Error";
    });
};

interface Playlist {
  title: string;
  thumbnail: string;
  author: string;
  resources: Resource[];
}
// Lấy danh sách video và thông tin 1 playlist
export const getPlaylist = async (url: string): Promise<Playlist> => {
  try {
    const id = url.split("?")[1].split("=")[1];
    const playlist = await ytpl(id);

    const resources: Resource[] = [];
    playlist.items.forEach((item) => {
      resources.push({
        title: item.title,
        thumbnail: item.bestThumbnail.url,
        author: item.author.name,
        url: item.shortUrl,
        length: item.durationSec,
      });
    });

    return {
      title: playlist.title,
      thumbnail: playlist.bestThumbnail.url,
      author: playlist.author.name,
      resources,
    };
  } catch (e) {
    throw "❌ Invalid playlist!";
  }
};
```

<br>

Tạo folder ```utils``` trong ```src``` chứa ```file time.ts```:

<br>

```
// Fomat thời gian video từ giây sang dạng mm:ss
// Ví dụ. 70s -> 01:10
export const formatTimeRange = (timeRange: number): string => {
  const mins = Math.floor(timeRange / 60);
  const seconds = timeRange - hours * 60;

  return `${mins < 10 ? "0" + mins : mins}:${seconds < 10 ? "0" + seconds : seconds}`;
};
```

<br>

Tạo folder actions trong src . Tại đây ta sẽ tạo các actions để xử lý các tác vụ như play, pause,... Ta tạo các file với nội dung lần lượt như sau:<br>
* actions/play.ts<br>

```
import { Message, VoiceConnection, MessageEmbed } from "discord.js";
import ytdl from "ytdl-core";

import { servers } from "../data/server";
import { getVideoDetails, getPlaylist } from "../services/youtube";
import { formatTimeRange } from "../utils/time";
import { youtubePlaylistRegex } from "../constant/regex";

// Đảm nhiệm stream nhạc và chuyển bài khi kết thúc
const play = (connection: VoiceConnection, message: Message) => {
  const server = servers[message.guild.id];
  const song = server.queue[0];
  server.playing = {
    song,
    startedAt: new Date().getTime(),
  };

  server.dispatcher = connection.play(
    ytdl(song.resource.url, { filter: "audioonly" })
  );
  server.queue.shift();
  // Phát hiện việc bài hát kết thúc
  server.dispatcher.on("finish", () => {
    if (server.queue[0]) play(connection, message);
    else {
      server.playing = null;
      server.queue = [];
      connection.disconnect();
    }
  });
};

export default {
  name: "play",
  execute: (message: Message, content: string): void => {
    if (!content)
      message.channel.send(
        "❌ You need to provide an Youtube URL or name of video\n\n✅ Ex: !play Shape of You"
      );
    else if (!message.member.voice.channel)
      message.channel.send("❌ You must be in a voice channel!");
    else {
      if (!servers[message.guild.id])
        servers[message.guild.id] = {
          queue: [],
        };
      const server = servers[message.guild.id];

      const paths = content.match(youtubePlaylistRegex);
      if (paths) {
        getPlaylist(paths[0])
          .then((result) => {
            const resources = result.resources;
            resources.forEach((resource) => {
              server.queue.push({
                requester: message.member.displayName,
                resource: resource,
              });
            });

            const messageEmbed = new MessageEmbed()
              .setColor("#0099ff")
              .setTitle(result.title)
              .setAuthor(
                `Add playlist to order by ${message.member.displayName}`
              )
              .setThumbnail(result.thumbnail)
              .addFields(
                { name: "Author", value: result.author, inline: true },
                {
                  name: "Video count",
                  value: resources.length,
                  inline: true,
                }
              );

            message.channel.send(messageEmbed).then(() => {
              if (!message.guild.voice)
                message.member.voice.channel.join().then((connection) => {
                  play(connection, message);
                });
              else if (!message.guild.voice.connection) {
                message.member.voice.channel.join().then((connection) => {
                  play(connection, message);
                });
              }
            });
          })
          .catch((e) => {
            message.channel.send(JSON.stringify(e));
          });
      } else
        getVideoDetails(content)
          .then((result) => {
            server.queue.push({
              requester: message.member.displayName,
              resource: result,
            });
            const messageEmbed = new MessageEmbed()
              .setColor("#0099ff")
              .setTitle(result.title)
              .setAuthor(`Add to order by ${message.member.displayName}`)
              .setThumbnail(result.thumbnail)
              .addFields(
                { name: "Channel", value: result.author, inline: true },
                {
                  name: "Length",
                  value: formatTimeRange(result.length),
                  inline: true,
                }
              )
              .addField("Position in order", server.queue.length, true);

            message.channel.send(messageEmbed).then(() => {
              if (!message.guild.voice)
                message.member.voice.channel.join().then((connection) => {
                  play(connection, message);
                });
              else if (!message.guild.voice.connection) {
                message.member.voice.channel.join().then((connection) => {
                  play(connection, message);
                });
              }
            });
          })
          .catch((e) => {
            message.channel.send(JSON.stringify(e));
          });
    }
  },
};
```

<br>

* actions/skip.ts<br>

```
import { Message, MessageEmbed } from "discord.js";

import { formatTimeRange } from "../utils/time";
import { servers } from "../data/server";

export default {
  name: "skip",
  execute: (message: Message): void => {
    const server = servers[message.guild.id];
    if (server) {
      if (server.dispatcher) {
        if (server.queue.length === 0) {
          server.dispatcher.end();
          server.playing = null;
          message.channel.send("❌ Nothing to skip!");
        } else {
          const song = server.queue[0];
          const messageEmbed = new MessageEmbed()
            .setColor("#0099ff")
            .setTitle(song.resource.title)
            .setAuthor(`Skipped by ${message.member.displayName}`)
            .setThumbnail(song.resource.thumbnail)
            .addFields(
              { name: "Channel", value: song.resource.author, inline: true },
              {
                name: "Length",
                value: formatTimeRange(song.resource.length),
                inline: true,
              }
            )

          message.channel
            .send(messageEmbed)
            .then(() => server.dispatcher.end());
        }
      } else message.channel.send("❌ Nothing to skip!");
    } else {
      message.channel.send("❌ Nothing to skip!");
    }
  },
};

```

<br>

* actions/pause.ts<br>

```
import { Message } from "discord.js";

import { servers } from "../data/server";

export default {
  name: "pause",
  execute: (message: Message): void => {
    const server = servers[message.guild.id];
    if (server) {
      if (server.dispatcher && server.playing) {
        message.channel.send("⏸ Paused").then(() => server.dispatcher.pause());
      }
    } else message.channel.send("❌ Nothing to pause!");
  },
};

```

<br>
* actions/resume.ts<br>

```
import { Message } from "discord.js";

import { servers } from "../data/server";

export default {
  name: "resume",
  execute: (message: Message): void => {
    const server = servers[message.guild.id];
    if (server) {
      if (server.dispatcher && server.playing) {
        server.dispatcher.resume();
        message.channel.send("⏯ Resume");
      } else message.channel.send("❌ Nothing to resume!");
    } else message.channel.send("❌ Nothing to resume!");
  },
};

```
<br>

* actions/nowplaying.ts<br>

```
import { Message, MessageEmbed } from "discord.js";

import { formatTimeRange } from "../utils/time";
import { servers } from "../data/server";

export default {
  name: ["nowplaying"],
  execute: (message: Message): void => {
    const server = servers[message.guild.id];
    if (server) {
      if (!server.playing) {
        message.channel.send("❌ Nothing is played now!");
      } else {
        const song = server.playing.song;
        const messageEmbed = new MessageEmbed()
          .setColor("#0099ff")
          .setTitle(song.resource.title)
          .setAuthor(`Playing 🎵 `)
          .setThumbnail(song.resource.thumbnail)
          .addFields(
            { name: "Channel", value: song.resource.author, inline: true },
            {
              name: "Length",
              value: formatTimeRange(song.resource.length),
              inline: true,
            }
          )
        message.channel.send(messageEmbed);
      }
    } else {
      message.channel.send("❌ Nothing is played now!");
    }
  },
};

```
<br>
* actions/stop.ts<br>

```
// Dừng phát nhạc và rời khỏi kênh thoại
import { Message } from "discord.js";

import { servers } from "../data/server";

export default {
  name: "stop",
  execute: (message: Message): void => {
    const server = servers[message.guild.id];

    if (message.guild.voice) {
      if (server) {
        if (server.dispatcher) {
          for (let i = server.queue.length - 1; i >= 0; i--) {
            server.queue.splice(i, 1);
          }
          server.playing = null;
          server.dispatcher.end();
          message.channel.send("Ending and leave voice channel!");
        }
      } else message.channel.send("❌ Nothing to stop!");
      if (message.guild.voice.connection)
        message.guild.voice.connection.disconnect();
    } else message.channel.send("❌ Nothing to stop!");
  },
};

```
<br>
* actions/clear.ts<br>

```
// Xoá toàn bộ list video đang đợi phát
import { Message } from "discord.js";

import { servers } from "../data/server";

export default {
  name: "clear",
  execute: (message: Message): void => {
    const server = servers[message.guild.id];
    if (server) {
      server.queue = [];
      message.channel.send("🧹 Cleaned ordered list!");
    } else {
      message.channel.send("❌ Nothing to clear!");
    }
  },
};

```
<br>
Thêm các actions vừa tạo vào file index.ts<br>

```
  import { config } from "dotenv";
  config();
  
  import { Client } from "discord.js";
  import play from "./actions/play";
  import skip from "./actions/skip";
  import nowplaying from "./actions/nowplaying";
  import pause from "./actions/pause";
  import resume from "./actions/resume";
  import stop from "./actions/stop";
  import clear from "./actions/clear";

  const client = new Client();
  const token = process.env.TOKEN;
  const prefix = "!";
  // Đây là tiền tố trước mỗi lệnh mà ta ra hiệu cho bot từ khung chat.
  // Lệnh có dạng như sau "!play Nhạc Đen Vâu", "!pause",...

  client.on("message", (message) => {
    const args = message.content.substring(prefix.length).split(" ");
    const content = message.content.substring(prefix.length + args[0].length);

    if (message.content[0] === "!") {
      switch (args[0]) {
           // Tại đây sẽ đặt các case mà bot cần thực hiện như play, pause, resume,....
        case play.name:
           play.execute(message, content);
           break;
        case skip.name:
          skip.execute(message);
          break;
        case nowplaying.name.toString():
          nowplaying.execute(message);
          break;
        case pause.name:
          pause.execute(message);
          break;
        case resume.name:
          resume.execute(message);
          break;
        case stop.name:
          stop.execute(message);
          break;
        case clear.name:
          clear.execute(message);
          break;
      }
    }
  });

  client.on("ready", () => {
    console.log("🏃‍♀️ Misabot is online! 💨");
  });

  client.once("reconnecting", () => {
    console.log("🔗 Reconnecting!");
  });

  client.once("disconnect", () => {
    console.log("🛑 Disconnect!");
  });
  
    client.login(token);
```

<br>
Đến đây, bot của chúng ta đã có thể chạy rồi đó 😅. 
<br>
Chạy  yarn dev hoặc npm run dev để start dev server.
<br>

![](https://images.viblo.asia/cc05fa35-eac0-42a0-84aa-856b1106dfa7.png)

<br>

Truy cập lại vào app bạn tạo trên Discord tại  https://discord.com/developers/applications. Click ```OAuth2```.
<br>
Tick vào bot và họn các quyền như hình dưới.

![](https://images.viblo.asia/54c25cc2-9441-4260-a59e-e36cc0f29a11.png)

Click ```Copy``` để copy link mời  bot vào máy chủ. Mời bot và máy chủ và dùng thử thôi 😉.

![](https://images.viblo.asia/9315191f-ff33-4e74-b81b-c798f5666932.png)

## Deploy lên Heroku
Tạo 1 web đơn giản chứa đường dẫn mời bot đến máy chủ và gắn vào bot bằng express (optional). Cái này mình không hướng dẫ ở đây. Bạn nào thích thì có thể làm thêm.
Install 1 vài package sau.<br>
```yarn add express heroku-awake```
<br>
hoặc
<br>
```npm i express heroku-awake --save```
<br>

```heroku-awake``` giúp server không bị sleep.
<br>
<br>
```yarn add @types/express -D```
<br>
hoặc
<br>
```npm i @types/express --save-dev```
<br>
<br>
Sửa lại file index.ts như sau
<br>

```
  import express from "express";
  import herokuAwake from "heroku-awake";
  import { Client } from "discord.js";
  import play from "./actions/play";
  import skip from "./actions/skip";
  import nowplaying from "./actions/nowplaying";
  import pause from "./actions/pause";
  import resume from "./actions/resume";
  import stop from "./actions/stop";
  import clear from "./actions/clear";

  const port = process.env.PORT || 3000;
  const server = express();
  const url = ""; // Đường dẫn của app bạn trên Heroku

  const bot = (): void => {
  const client = new Client();
  const token = process.env.TOKEN;

  client.on("message", (message) => {
    const args = message.content.substring(prefix.length).split(" ");
    const content = message.content.substring(prefix.length + args[0].length);

    if (message.content[0] === "!") {
      switch (args[0]) {
        case play.name:
          play.execute(message, content);
          break;
        case skip.name:
          skip.execute(message);
          break;
        case nowplaying.name.toString():
          nowplaying.execute(message);
          break;
        case pause.name:
          pause.execute(message);
          break;
        case resume.name:
          resume.execute(message);
          break;
        case stop.name:
          stop.execute(message);
          break;
        case clear.name:
          clear.execute(message);
          break;
        // More short command
        case "np":
          nowplaying.execute(message);
          break;
        case "fs":
          skip.execute(message);
          break;
      }
    }
  });

  client.on("ready", () => {
    console.log("🏃‍♀️ Misabot is online! 💨");
  });

  client.once("reconnecting", () => {
    console.log("🔗 Reconnecting!");
  });

  client.once("disconnect", () => {
    console.log("🛑 Disconnect!");
  });
  
    client.login(token);
};

server.disable('x-powered-by');

server.listen(port, () => {
  bot();
  herokuAwake(url);
  console.log(`🚀 Server is running on port ${port} ✨`);
});
```

Truy cập https://devcenter.heroku.com/articles/heroku-cli  để cài đặt ```heroku-cli``` nếu bạn chưa có.

Truy cập tiếp https://dashboard.heroku.com/apps để tạo ứng dụng mới.

![](https://images.viblo.asia/718093f6-b42b-4e6a-a4a1-c521c9502b6f.png)

Click tab Settings và thêm biến môi trường của bạn vào đây

![](https://images.viblo.asia/4ccb9eb3-0ed8-4d25-b4f5-30b14d39ef98.png)

<br>
Chạy lần lượt các câu lệnh sau để deploy ứng dụng của bạn.
<br>

```
$ heroku login
$ cd my-project/
$ git init
$ heroku git:remote -a <tên ứng dụng của bạn>
$ git add .
$ git commit -am "make it better"
$ git push heroku master
```
# Tổng kết
Trên đây là cách tạo 1 bot Discord để phát nhạc trong Discord với các chức năng:<br>
* play: phát 1 bài nhạc theo tên hoặc url Youtube, thêm nhạc vào danh sách chờ bằng url playlist.<br>
* pause, resume: Dừng và tiếp tục.<br>
* clear: Xoá danh sách phát đang chờ.<br>
* stop: Dừng phát và rời khỏi kênh thoại.<br>
* skip: Bỏ qua bài hát hiện tại<br>
* nowplaying: Lấy thông tin bài hát đang phát.<br>

Trong code có gì sơ suất mong mọi người thông cảm.
# Tham khảo
[Github repository](https://github.com/Misabot/misabot-discord)
<br>
[Demo on Heroku](https://misabotapp.herokuapp.com/)
<br>
Note: Tài nguyên trên Heroku khá ít và server đặt tại châu Âu nên bot join nhiều server hoặc internet của các bạn kém thì bot khá lag.😅
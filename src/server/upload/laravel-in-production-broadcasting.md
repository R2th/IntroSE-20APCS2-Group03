# Laravel - Broadcasting
Mở đầu cho series Laravel In Production, trong bài viết này mình sẽ nói về Broadcasting.
Bài viết gồm 2 phần: giới thiệu cơ bản về broadcasting và việc sử dụng broadcasting trong thực tế (dự án của mình)

Trong quá trình làm việc với laravel nói chúng, hầu hết trong số chúng ta đều gặp các tác vụ liên quan tới việc cập nhật realtime như notification, tin nhắn,.... Túm lại là broadcast một sự kiện cùng dữ liệu cho client.

## 1. Broadcasting
Broadcast là gì?
> Broadcast là thuật ngữ được sử dụng trong mạng máy tính để mô tả cách thức truyền tin được gửi từ 1 điểm đến tất cả các điểm khác trong cùng một mạng. Trong trường hợp này, một gói broadcast chuyển đến tất cả những thiết bị tham gia trong một mạng cục bộ, mà không cần phải được quy định rõ ràng như một máy nhận.

Trong laravel, bằng việc kết hợp giữa broadcast event và queue, bạn có thể dễ dàng truyển tải các gói tin tới client-side.
Để làm được việc này bạn cần:
- Broadcaster: như redis hay pusher
- Receiver: laravel echo hay bất kì Receiver nào khác
- Socket.IO server: nếu bạn sử dụng redis như 1 broadcaster thì bạn cần thêm 1 socket server
- Queue worker: như supervisord

Về broadcaster, Pusher là lựa chọn ổn khi bạn chỉ cần test hoặc chạy với số lượng request không quá nhiều. Khi số lượng request nhiều hơn thì bạn cần phải trả phí đệ hệ thống hoạt động một cách ổn định. Với Redis, bạn cần phải setup redis server và cần thêm socket server để thực hiện broadcast. Hơi rắc rối chút nhưng nó sẽ tiết kiệm hơn, dễ quản lý và mở rộng hơn Pusher.

Trong bài viết mình sẽ sử dụng: `redis` kết hợp với `laravel-echo-server` và `laravel-echo`

### Defining Broadcast Events
Dưới đây là cấu trúc mặc định của 1 broadcast event:
```php
<?php

namespace App\Events;

use App\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Queue\SerializesModels;

class ServerCreated implements ShouldBroadcast
{
    use SerializesModels;

    const TYPE_ABC = 1;

    public $user;

    // Broadcast Queue
    public $broadcastQueue = 'your-queue-name';

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    // Broadcast channel
    public function broadcastOn()
    {
        return new PrivateChannel('user.' . $this->user->id);
    }

    // Broadcast name
    public function broadcastAs()
    {
        return 'user.created';
    }

    // Broadcast data
    public function broadcastWith()
    {
        return ['id' => $this->user->id];
    }

    // Broadcast conditions
    public function broadcastWhen()
    {
        return $this->user->type === self::TYPE_ABC;
    }
}
```

- `$broadcastQueue`: tên của queue sẽ broadcast, nếu không khai báo thì nó sẽ được broadcast vào queue mặc định của project
- `broadcastOn`: khai báo channel mà bạn sẽ broadcast
- `broadcastAs`: tên của broadcast event
- `broadcastWith`: khai báo dữ liệu sẽ được truyền xuống client, nếu không khai báo thì tất cả dữ liệu được truyền vào constructor sẽ được truyền xuống client
- `broadcastWhen`: điều kiện để thực hiện broadcast, mặc định `true`


*Note:* Nếu bạn muốn broadcast `ngay`, hãy sử dụng `ShouldBroadcastNow` thay vì sử dụng `ShouldBroadcast`.

### Authorizing Channels
Tiếp theo chúng ta cần phải xác định user nào thì được join vào channel nào.
```php
// routes/channels.php
Broadcast::channel('user.{user}', function ($currentUser, User $user) {
    return $currentUser->id === $user->id;
});
```

Cách trên khá ngắn gọn và chỉ có thể sử dụng khi điều kiện `join channel` đơn giản hay số lượng broadcast channel ít. Khi số lượng channel tăng lên, các điều kiện trở lên phúc tạp hơn thì chúng ta nên sử dụng `Channel Class` thay cho cách trên. Thay vì xử lý điều kiện trong route, chúng ta sử dụng riêng từng class cho mỗi channel.
```bash
php artisan make:channel UserChannel
```

```php
// app\Broadcasting\UserChannel.php
namespace App\Broadcasting;

use App\User;

class UserChannel
{
    public function __construct()
    {
        //
    }

    /**
     * Authenticate the user's access to the channel.
     *
     * @param  \App\User  $user
     * @return array|bool
     */
    public function join(User $currentUser, User $user)
    {
        return $currentUser->id === $user->id;
    }
}


// routes/channels.php
Broadcast::channel('user.{user}', UserChannel::class);
```

### Broadcasting Events
Có 3 cách để bạn broadcast một event
```php
// Broadcast cho tất cả người dùng
event(new UserCreated($user));
# or
broadcast(new UserCreated($user));

// Broadcast cho tất cả trừ user hiện tại (current user)
broadcast(new UserCreated($user))->toOthers();
```

### Listening For Event Broadcasts
Sau khi broadcast event, công việc trên server đã hết. Trên client, chúng ta sẽ `lắng nghe` và xử lý khi nhận được dữ liệu
```js
// resources/js/bootstrap.js
import Echo from "laravel-echo";

const socketUrl = process.env.SOCKET_URL;
let echoHost = window.location.hostname;

if (socketUrl != '') {
    echoHost = socketUrl;
}

window.Echo = new Echo({
    broadcaster: 'socket.io', // Đổi theo hệ thống bạn sử dụng gì, pusher hay socket.io
    host: echoHost
});
```
Mặc định chúng ta sẽ `listen` trên `host` hiện tại, tuy nhiên vì 1 số lý do mà `host` của `echo` và host của web không giống nhau, vậy nên mình sử dụng thêm biến ENV để khai báo host cho `echo` :)

Sau khi khai báo biến `global` Echo, các bạn có thể sử dụng nó ở bất cứ đâu trong project.
```js
// When new user created
window.Echo.channel(`private-user.${userId}}`)
    .listen('.user.created', ({message}) => {
        handleUserCreated(message);
    });
```

### Socket server
Cài đặt socket server (laravel-echo-server) khá đơn giản thông qua `npm`
```bash
npm i -g laravel-echo-server
```

Có 2 cách để chạy laravel-echo-server
- `laravel-echo-server start`: mặc định của package
- `npm echo-server.js`: sử dụng nodejs + pm2 / supervisord

Mình sẽ sử dụng cách 2 trong bài viết này, cách 1 được giới thiệu trực tiếp trên trang github của `laravel-echo-server` rồi, các bạn có thể tham khảo ở trên đó.
```js
require("dotenv").config({ path: '../.env' })

var Echo = require("laravel-echo-server")

/**
 * The Laravel Echo Server options.
 */

var options = {
    "appKey": process.env.ECHO_KEY,
    "authHost": process.env.ECHO_AUTH_HOST,
    "authEndpoint": process.env.ECHO_AUTH_ENDPOINT,
    "database": process.env.ECHO_DATABASE,
    "databaseConfig": {
        "redis": {
            "port": 6379,
            "host": process.env.ECHO_REDIS_HOST
        },
        "sqlite": {
            "databasePath": process.env.ECHO_SQLITE_PATH
        }
    },
    "devMode": process.env.ECHO_DEV_MODE,
    "host": process.env.ECHO_HOST,
    "protocol": process.env.ECHO_PROTOCOL,
    "port": process.env.ECHO_PORT,
    "referrers": [],
    "socketio": {},
    "sslCertPath": process.env.ECHO_SSL_CERT_PATH,
    "sslKeyPath": process.env.ECHO_SSL_KEY_PATH,
    "verifyAuthPath": true,
    "verifyAuthServer": true
}

/**
 * Run the Laravel Echo Server.
 */
Echo.run(options)
```

## 2. Broadcast in Production
Phần này mình sẽ chia sẻ 1 số vấn đề về broadcasting mà mình gặp phải trong quá trình làm việc

### 2.1 Change listening channel
Nếu các bạn để ý, khi bạn chuyển trang, echo sẽ `left channel` hiện tại và `preparing authentication` cho trang mới. Tuy nhiên, nếu bạn muốn đổi `channel` mà không muốn đối trang thì sao?
`laravel-echo` cung cấp sẵn cho bạn phương thức `leave` để bạn có thể `left channel`, ví dụ:
```js
listenForChannel(newChannel, oldChannel) {
    if (!newChannel) {
        return;
    }
    
    if (this.messageChannel) {
        window.Echo.leave(`private-${oldChannel}`);
    }

    this.messageChannel = window.Echo.channel(`private-${newChannel}`)
        .listen('.message.created', ({message, user}) => {
            this.onNewMessageIncoming(message, user);
        });
```

Ở đoạn code trên, khi mình thay đổi user để chat, mình sẽ left channel của user hiện tại và thực hiện connect tới channel của user mới.

### 2.2 Port forwarding
Đầu tiên, để đảm bảo tính bảo mật, việc mở cổng (public port) gần như không được phép trên môi trường production. Vậy chúng ta cần phải làm sao @@

Việc này khá đơn giản, bạn chỉ cần config lại nginx hay apache để forward các request socket tới socket server (chạy trên local). Giả sử các request socket của mình có endpoint là `/socket.io` và socket server chạy trên local với port là `6001` (port này không được public).

Thì config (bổ sung) cho `nginx` sẽ như sau
```markup
location /socket.io {
    proxy_pass http://127.0.0.1:6001;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}
```

*Note*: Nếu hệ thống sử dụng `basic authentication`, bạn cần set `auth_basic off` cho `location /socket.io`

### 2.3 Multiple server
Với các hệ thống lớn thì việc sử dụng nhiều server là việc đương nhiên rồi. Vậy chúng ta cần setup cho socket server như thế nào (??)

Ok, cách đầu tiên mà bạn nghĩ tới sẽ là gì? Mỗi một web server sẽ cài đặt 1 socket server riêng? Tuy nhiên khi có nhiều server thì gần như chắc chắn chúng sẽ được đặt sau 1 `load balancer`. Và việc setup mỗi node một server echo sẽ làm nó hoạt động không ổn định và hiệu suất cũng không thực sự cao. 

Ví dụ, có 3 node (server), sau khi vào website, bạn authen vào node 1, trong quá trình sử dụng `laravel-echo` (client) sẽ gọi tới `echo-server` để check kết nối hay bạn gửi dữ liệu (`whisper` chẳng hạn), request của bạn được chuyển sang node 2 / node 3 => bạn sẽ disconnect trên node 1 và phải authen lại trên các node này :)) việc connect và disconnect liên tục như vậy có thể làm cho `echo` hoạt động không chính xác và server phải xử lý thêm nhiều request không đáng có.

Vậy solution là xử lý tập trung, bạn forward các request socket tới 1 server và xử lý nó trên đó. Tương tự config trên 2.1, ở đây thay vì setting `poxy_pass` về `localhost`, bạn forward request tới `ip` của `echo-server`.
```markup
location /socket.io {
    proxy_pass http:/ECHO_SERVER_IP:ECHO_PORT;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}
```

Lưu ý, các server web và `echo server` nên được đặt trên cùng 1 `network`. Nếu không, bạn cần setting để ip của các webserver có thể truy cập vào `ECHO_PORT` của `echo-server` hoặc lại thực hiện forward thêm lần nữa trên `echo-server`


### 2.4 Handle `big` data
Trong dự án của mình có tính năng chat realtime, việc không có gì khi khách hàng có tính năng gửi hàng loạt tin nhắn. Điều đáng nói ở đây là trang gửi tin nhắn nó có cả danh sách user (kèm preview của tin nhắn cuối cùng) và danh sách này cũng được cập nhật realtime.

Bạn thử tưởng tượng, khi bạn nhấn gửi tin nhắn cho 200.000 user, mỗi user 2 tin nhắn dạng text, nếu bạn chỉ `listen event` và `cập nhật` danh sách user nhận được tin nhắn theo order thì `BOOM` browser cuả bạn bị crash ngay sau 10s. Vì sao? vì DOM phải cập nhật và render lại liên tục với số lượng lớn chứ sao nữa.

Vậy cách giải quyết ở đây là?
- Deal lại với khách hàng sẽ hiển thị `nearly realtime` khi gửi tin nhắn số lượng lớn :laughing: 
- Tối ưu lại các dữ liệu được truyền xuống client, sao cho nó nhỏ nhất có thể
- Xử lý lại việc `listen` tin nhắn và chỉ cập nhật lại danh sách sau 1 khoảng t.gian cố định hoặc số lượng tin nhắn đạt tới mức theo như config

```js
window.Echo.channel(`private-${user_id}}`)
    .listen('.message.created', ({message, user}) => {
        const socketMessageDelay = process.env.SOCKET_INCOMING_MESSAGE_DELAY || 10000;
        const socketMessageDelayCount = process.env.SOCKET_INCOMING_MESSAGE_DELAY_COUNT || 100;
        let messageDelayer = null;

        this.newMessages.unshift(message);
        if (this.newMessages.length >= socketMessageDelayCount) {
            this.updateMessages(this.newMessages);
            clearTimeout(this.messageDelayer);
            this.newMessages = [];
            this.messageDelayer = null;
            return;
        }

        if (this.messageDelayer === null) {
            this.messageDelayer = setTimeout(() => {
                this.updateMessages(this.newMessages);
                clearTimeout(this.messageDelayer);
                this.newMessages = [];
                this.messageDelayer = null;
            }, socketMessageDelay);
        }

        return;
    })
```

Ở đoạn code trên mình làm các việc sau:
- Mỗi khi có tin nhắn mới, thêm nó vào 1 mảng `newMessages`
- Nếu số lượng `newMessages` vượt quá config `socketMessageDelayCount`, mình sẽ cập nhật lại danh sách tin nhắn và reset lại các biến
- Nếu số lượng `newMessages` chưa vượt quá config, mình sẽ dùng `setTimeout` để nó sẽ cập nhật danh sách tin nhắn sau 1 khoảng thời gian `socketMessageDelay`


### Kết
Ở trên là một số trường hợp mình gặp phải khi xử lý broadcasting trong project của mình. Mong mọi người góp ý để mình bổ xung và hoàn thiện nó nhé :smiley:
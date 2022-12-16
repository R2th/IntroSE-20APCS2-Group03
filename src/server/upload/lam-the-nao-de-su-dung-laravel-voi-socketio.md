![](https://images.viblo.asia/21996800-42d3-4f46-9dfd-61d50ced35b5.jpeg)
Websockets là một công nghệ tuyệt vời. Chúng thực sự hữu ích nếu bạn muốn hiển thị các hoạt động theo thời gian thực từ người dùng.

Bây giờ, nếu bạn sợ từ " Websockets ", đừng thế. Tôi sẽ đưa ra các hướng dẫn về cách bạn có thể sử dụng nó

Tôi đã có thử thách này,  Tôi cần hiển thị một danh sách những người hiện đang xem một URL cụ thể trong Laravel . Vì vậy, tôi bắt đầu suy nghĩ. Một phần trong tôi muốn làm một cách nhanh chóng (may mắn đó không phải là mặt mạnh nhất của tôi), trong khi người khác muốn xây dựng "something cool", để có thể tái sử dụng và lâu dài.

**Tại sao không dùng dịch vụ Pusher?**

- Laravel đi kèm với Pusher được kích hoạt. Mặc dù Pusher có vẻ như là một giải pháp "Plug and play" nhanh chóng, nhưng nó đi kèm với những hạn chế như giá cả (https://pusher.com/pricing)

- Và hầu hết các hướng dẫn đều lừa bạn với tiêu đề thực hiện Websockets của họ khi thực tế họ chỉ muốn cung cấp cho bạn Pusher. (Và phần yêu thích của tôi là khi họ nói rằng bạn có thể dễ dàng chuyển sang socket.io)

**"Chúng tôi muốn có một số lượng các kết nối không giới hạn"**

**"Chúng tôi không muốn lo lắng về những hạn chế."**

Let's start
- Tôi sẽ sử dụng vagrant/homstead cho Laravel.

- Chúng ta cần phải nghiên cứu [Event Broadcasting](https://laravel.com/docs/5.6/broadcasting) trong Laravel.


Những điều cần lưu ý ở đây (vì vậy tôi không phải lặp lại mọi thứ):

- **ShouldBroadcast Interface** cho Events

- Thiết lập **Broadcast routes** và sử dụng **routes/channels.php** để xác thực người dùng

- **Public Channel** - Mọi người đều có thể listen

- **Private Channel** - Bạn cần ủy quyền cho người dùng trước khi họ có thể tham gia channel

- **Presence Channel** - Giống như Private Channel nhưng bạn có thể chuyển rất nhiều meta data bổ sung trên channel đó và lấy danh sách những người đã tham gia channel.broadcastOn() Event method

## 1. Create Your Event

Sử dụng CLI của laravel để tự động tạo 1 event MessagePushed
```
php artisan make:event MessagePushed
```

Bạn thậm chí có thể làm theo ví dụ cụ thể trong Event Broadcasting của Laravel document

## 2. Cài đặt Redis

Trước đây tôi thực sự đã thiết lập queues với Supervisor/Redis/Horizon. Horizon là tuyệt vời và bạn có thể tìm thấy thông tin về điều đó ở đây https://laravel.com/docs/5.6/horizon

Bạn cần phải có queues working để MessagePushed event có thể hoạt động được

Lưu ý : Thiết lập các config cho Redis trong file .env:

```
BROADCAST_DRIVER = redis
QUEUE_DRIVER = redis
REDIS_HOST = 127.0.0.1
REDIS_PASSWORD = null
REDIS_PORT = 6379
```

## 3. Cài đặt Laravel Echo Server

Laravel Echo Server là một thư viện giúp chúng ta cài đặt socket.io server. Chi tiết bạn có thể tìm thấy nó ở đây: https://github.com/tlaverdure/laravel-echo-server
Chạy command sau để cài laravel-echo-server

```npm install -g laravel-echo-server```

Và sau đó chạy init để tự động tạo file config 'laravel-echo-server.json'

```laravel-echo-server init```

Khi bạn đã tạo ra tệp laravel-echo-server.json của mình, nó sẽ trông như thế này.
```
{
    "authHost": "http://local-website.app",
    "authEndpoint": "/broadcasting/auth",
    "clients": [
        {
            "appId": "my-app-id",
            "key": "my-key-generated-with-init-command"
        }
    ],
    "database": "redis",
    "databaseConfig": {
        "redis": {},
        "sqlite": {
            "databasePath": "/database/laravel-echo-server.sqlite"
        },
        "port": "6379",
        "host": "127.0.0.1"
    },
    "devMode": false,
    "host": null,
    "port": "6001",
    "protocol": "http",
    "socketio": {},
    "sslCertPath": "",
    "sslKeyPath": "",
    "sslCertChainPath": "",
    "sslPassphrase": ""
}

```

Khởi động Laravel Echo Server ta cần chạy command

```laravel-echo-server start ```

Chúng ta cần config supervisor để server có thể tự động restart bằng cách tạo file config laravel-echo.conf trong thư mục /etc/supervisor/conf.d/ với nội dung
```
[program:laravel-echo]
directory=/var/www/my-website-folder
process_name=%(program_name)s_%(process_num)02d
command=laravel-echo-server start
autostart=true
autorestart=true
user=your-linux-user
numprocs=1
redirect_stderr=true
stdout_logfile=/var/www/my-website-folder/storage/logs/echo.log
```

Tiếp theo chúng ta cần chạy các lệnh sau để các config được áp dụng:

```
sudo supervisorctl stop all
 
sudo supervisorctl reread
sudo supervisorctl reload
```

Sau đó kiểm tra lại để chắc chắn Laravel Echo Server đã chạy

```sudo supervisorctl status```


## 4. Cài đặt Laravel Echo và Socket IO client

```
npm install --save laravel-echo
npm install --save socket.io-client
```

Và sau đó trong bootstrap.js (tôi đang sử dụng Vue js) đăng ký Echo của bạn

```
import Echo from "laravel-echo"
window.io = require('socket.io-client');
// Have this in case you stop running your laravel echo server
if (typeof io !== 'undefined') {
  window.Echo = new Echo({
    broadcaster: 'socket.io',
    host: window.location.hostname + ':6001',
  });
}
```

Bây giờ chúng ta kiểm tra lại việc listen event trong channels

Example: 
- Push một event trên Presence Channel
```
public function broadcastOn()
{
    return new PresenceChannel('survey.' . $this->survey->id);
}
```

- Sau khi push event nó sẽ đi qua channels.php và trong đó chúng tôi muốn tạo ủy quyền cho người dùng này (nhớ trả về một mảng cho Presence channel authorization)

```
Broadcast::channel('survey.{survey_id}', function ($user, $survey_id) {
    return [
        'id' => $user->id,
        'image' => $user->image(),
        'full_name' => $user->full_name
    ];
});
```

- Sau đó trong  VueJs component tôi xác định một phương thức sẽ được khởi tạo từ phương thức created() khi load:

```
listenForBroadcast(survey_id) {
    Echo.join('survey.' + survey_id)
    .here((users) => {
        this.users_viewing = users;
        this.$forceUpdate();
    })
    .joining((user) => {
        if (this.checkIfUserAlreadyViewingSurvey(user)) {
            this.users_viewing.push(user);
            this.$forceUpdate();
        }
    })
    .leaving((user) => {
        this.removeViewingUser(user);
        this.$forceUpdate();
    });
},
```
Hy vọng bạn có thể làm theo như tôi đã cố gắng để được chi tiết nhất có thể.

Bài viết được sưu tầm và dịch từ https://medium.com/@adnanxteam/how-to-use-laravel-with-socket-io-e7c7565cc19d
## Giới thiệu
Hiện nay trong các ứng dụng web, `WebSockets` được sử dụng để mang lại các cập nhật đến giao diện người dùng đáp ứng thời gian thực (realtime). Khi dữ liệu được cập nhật trên **server**,  một gói tin sẽ được gửi qua kết nối  `WebSockets` tới **client**. 

Xây dựng một ứng dụng như vậy rất dễ dàng với *Laravel*  bằng việc sử dụng `boardcast` những event thông qua `WebSockets`. `Broadcasting` của Laravel cho phép bạn chia sẻ event giữa server-side code với client-side Javascript code.

Trong bài viết này, tôi sẽ hướng dẫn các bạn cách cài đặt và sử dụng Broadcasting của Laravel thông qua việc sử dụng Laravel Echo.
## Chuẩn bị
- Laravel 5.3+
- Node 6.0+
- Redis 3.0+
## Cài đặt
### Server-side
Các config để sử dụng `broadcasting` với Laravel đều được lưu trong file `config/broadcasting.php`. Laravel hỗ các broadcast driver như: `Pusher`, `Redis` và `log` cho quá trình phát triển và debugging.
```
 'default' => env('BROADCAST_DRIVER', 'null'),

    /*
    |--------------------------------------------------------------------------
    | Broadcast Connections
    |--------------------------------------------------------------------------
    |
    | Here you may define all of the broadcast connections that will be used
    | to broadcast events to other systems or over websockets. Samples of
    | each available type of connection are provided inside this array.
    |
    */

    'connections' => [

        'pusher' => [
            'driver' => 'pusher',
            'key' => env('PUSHER_APP_KEY'),
            'secret' => env('PUSHER_APP_SECRET'),
            'app_id' => env('PUSHER_APP_ID'),
            'options' => [
                //
            ],
        ],

        'redis' => [
            'driver' => 'redis',
            'connection' => 'default',
        ],

        'log' => [
            'driver' => 'log',
        ],

        'null' => [
            'driver' => 'null',
        ],

    ],
```
Nếu bạn để giá trị ` 'default' => env('BROADCAST_DRIVER', 'null'),` là `null` => bạn sẽ vô hiệu hóa tính năng broadcast.

---
Trước khi broadcasting bất kỳ event nào, bạn phải đăng ký sử dụng `App\Providers\BroadcastServiceProvider` trong file `config/app.php`. Thông thường provider này sẽ bị comment, bạn chỉ cần tìm đến mảng `providers` trong file `config/app.php` xóa bỏ comment đi.
```
         /*
         * Application Service Providers...
         */
        ....
        App\Providers\BroadcastServiceProvider::class,
        ....
```
---
`Laravel Echo` sẽ cần phải truy cập vào session's CSRF nên bạn cần thêm vào `head` HTML element một thẻ `meta` chứa CSRF token:
```
<meta name="csrf-token" content="{{ csrf_token() }}">
```
---
**Cài đặt Broadcast driver**

Tôi sử dụng Redis broadcaster nên tôi sẽ cài thêm thư viện Predis:
```
composer require predis/predis
```
---
**Cấu hình cho Queue**

Trước khi broadcasting event, bạn cần cấu hình và chạy `queue:listen`. Tất cả event được broadcasting qua queue job sẽ giúp thời giản phản hồi của ứng dụng không bị chậm đi.

### Client-side

Laravel không implementation một `Socket.IO server` sẵn nên bạn cần sử dụng một `Socket.IO server` của một bên thứ 3. Laravel khuyến khích bạn sử dụng 	[Laravel Echo Server ](https://github.com/tlaverdure/laravel-echo-server).

---
Bạn cần cài đặt package này global
```
$   npm install -g laravel-echo-server
```

Sau đó chạy lệnh khởi tạo:
```
$   laravel-echo-server init
? Do you want to run this server in development mode? Yes
? Which port would you like to serve from? 6001
? Which database would you like to use to store presence channel members? redis
? Enter the host of your Laravel authentication server. http://localhost
? Will you be serving on http or https? http
? Do you want to generate a client ID/Key for HTTP API? Yes
? Do you want to setup cross domain access to the API? Yes
? Specify the URI that may access the API: http://localhost:80
? Enter the HTTP methods that are allowed for CORS: GET, POST
? Enter the HTTP headers that are allowed for CORS: Origin, Content-Type, X-Auth-Token, X-Requested-W
ith, Accept, Authorization, X-CSRF-TOKEN, X-Socket-Id

```
CLI sẽ đưa ra các lựa chọn cho bạn, sau khi hoàn thành, một file laravel-echo-server.json sẽ được tạo ra:
```
{
	"authHost": "localhost:8005",
	"authEndpoint": "/broadcasting/auth",
	"clients": [
		{
			"appId": "xxx",
			"key": "xxx"
		}
	],
	"database": "redis",
	"databaseConfig": {
		"redis": {
			"port": "6379",
			"host": "localhost"
		},
		"sqlite": {
			"databasePath": "/database/laravel-echo-server.sqlite"
		}
	},
	"devMode": true,
	"host": null,
	"port": "6001",
	"protocol": "http",
	"socketio": {},
	"sslCertPath": "",
	"sslKeyPath": "",
	"sslCertChainPath": "",
	"sslPassphrase": "",
	"apiOriginAllow": {
		"allowCors": false,
		"allowOrigin": "",
		"allowMethods": "",
		"allowHeaders": ""
	}
}

```
Bạn thực hiện chạy `laravel-echo-server start` để khởi động Laravel Echo Server
```
$ laravel-echo-server start

L A R A V E L  E C H O  S E R V E R

version 1.3.6

⚠ Starting server in DEV mode...

✔  Running at localhost on port 6001
✔  Channels are ready.
✔  Listening for http events...
✔  Listening for redis events...

Server ready!

```
Khi nhận được thông báo như trên, server đã được khởi động, cài đặt thành công.
### Tạo event khi có data thay đổi trên server
Chạy command để tạo event: `php artisan make:event Tên-Event`, bạn sẽ có một file với nội dung như sau
```
class ServerCreated implements ShouldBroadcast
{
    use SerializesModels;

    public $user;
    
    public $message;
    
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(User $user, $message)
    {
        $this->user = $user;
        $this->message = $message;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('user.'.$this->user->id);
    }
}
```

Function `broadcastOn()` sẽ tạo ra channel để client có thể lắng nghe ở đó. Có các tùy chọn `channel` khác nhau: 

- `Channel` đại điện cho kênh public, tất cả các user đều có thể subcribe.
- `PrivateChannel` , `PresenceChannel` đại diện có các kênh private, phải xác minh trước khi subcribe kênh.

Mặc định Laravel sẽ broadcast sử dụng tên của `class`, nhưng bạn có thể tự định nghĩa tên bằng hàm `broadcastAs`
```
public function broadcastAs()
{
    return 'server.created';
}
```
Hàm `broadcastWith` sẽ định nghĩa những dữ liệu nào sẽ được gửi kèm trong các tin
```
public function broadcastWith()
    {
        return [
            'message' => $this->message,
        ];
    }
```

Vậy là xong, bạn chỉ cần `fire event` này ở nơi mong muốn, khi event được phát ra, queue job sẽ tự động broadcast event qua driver broadcast.
#### Xác thực khi subcribe vào kênh Private

Trong file `routes/channels.php, bạn có thể định nghĩa các xác minh để truy cập kênh
```
Broadcast::channel('user.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});
```
### Lắng nghe sự kiện ở phía client.

Ở dưới client bạn cần cài thêm các package sau:
```
npm install --save laravel-echo
npm install --save socket.io-client
```

Bạn chỉ cần thêm đoạn này vào trang để lắng nghe từ event từ server-side
```
import Echo from 'laravel-echo'
window.io = require('socket.io-client');

window.Echo = new Echo({
    namespace: 'App\\Events\\ServerCreated',
    broadcaster: 'socket.io',
    host:window.location.hostname +':6001'
});
window.Echo.channel('private-user.1')
    .listen('.log.added', (e) => {
        console.log(e.log);
    });
```

Ở trên mình đang thực hiện subcribe vào channel Private `user.1`, đối với channel Presence bạn thêm tiền tố `presence-` trước tên channel đã tạo ở trên server để có thể subcribe vào kênh.

## Kết luận
Như vậy là mình đã giới thiệu về Broadcasting trong Laravel, và thực hiện một ví dụ về tính năng này. Bài viết còn nhiều thiếu sót, hy vọng nhận được góp ý từ mọi người. (bow)

## Tham khảo
- [https://medium.com/@adnanxteam/how-to-use-laravel-with-socket-io-e7c7565cc19d](https://medium.com/@adnanxteam/how-to-use-laravel-with-socket-io-e7c7565cc19d)
- [https://laravel.com/docs/5.5/broadcasting](https://laravel.com/docs/5.5/broadcasting)
-  [https://github.com/tlaverdure/laravel-echo-server](https://github.com/tlaverdure/laravel-echo-server)
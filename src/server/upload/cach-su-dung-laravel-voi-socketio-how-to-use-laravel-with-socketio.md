Một bài viết được sưu tầm và dịch từ: https://medium.freecodecamp.org/how-to-use-laravel-with-socket-io-e7c7565cc19d

**Websockets** thật sự rất hữu ích nếu bạn muốn xem các hoạt động tại realtime của user (hoặc có một số queue job).

Đừng nên ngại từ “*Websockets*”. Tôi sẽ đưa ra một số hướng dẫn về cách sử dụng nó và sẽ giải đáp thắc mắc của bạn khi cần.

Tôi đã gặp khó khăn khi tôi phải cần xem list những người đang xem 1 URL nhất định trên **Laravel**. Rồi tôi mới suy nghĩ: Một phần tôi muốn một hack nhanh (không phải là thế mạnh của tôi), một phần tôi lại muốn build cái gì thật ngầu, dùng được lâu và dùng lại được. 

# “Tại sao không dùng Pusher?”
Có một vấn đề, đó là trong Laravel đã có cả Pusher. Mặc dù *Pusher* là một giải pháp “Plug and Play” khá nhanh nhạy, bản thân nó cũng có khá nhiều giới hạn. Check https://pusher.com/pricing.

Và hầu hết các tutorial đều lừa bạn bằng thumbnail “Ứng dụng Websockets” nhưng thật ra cũng chỉ quăng cho bạn Pusher mà thôi. (Và phần mà tôi thấy buồn cười nhất là khi họ nói bạn có thể chuyển sang socket.io một cách dễ dàng).
# “Chúng ta cần có lượng connection vô giới hạn.”
*Đúng vậy, chúng ta hoàn toàn không muốn lo lắng về giới hạn.*

Bắt đầu từ việc dùng vagrant / homestead.

Để có cái này bạn cần phải đọc về **Event Broadcasting.**

Có những thứ cần lưu ý ở đây (để tôi không phải nhắc lại phía sau nữa):
1. Giao diện ShouldBroadcast cho các Event
2. Kích hoạt các Broadcast routes và sử dụng routes/channels.php cho những user xác thực.
3. Public Channel  — Ai cũng có thể nghe
4. Private Channel  — User phải được xét duyệt nếu muốn join vào group 
5. Presence  — Tương tự như Private nhưng bạn có thể xem khá nhiều meta data ngoài trên đó và có một list những người đã tham gia bằng channel.broadcastOn() Event method.
# Tạo Event

```php
php artisan make:event MessagePushed
```

Bạn có thể xem các ví dụ cụ thể trong tài liệu về Event Broadcasting. 

# Cài Redis

Trước đó tôi đã setup các queue bằng Supervisor/Redis/Horizon. Horizon là một tool tuyệt vời và bạn có thể xem thêm info của nó tại đây https://laravel.com/docs/5.6/horizon

Sau khi các queue đã hoạt động, MessagePushed event sẽ dùng đến chúng.

**Note**: Nhớ edit .env file để đảm bảo mọi thứ hoạt động trơn tru nhé:

```php
BROADCAST_DRIVER=redis
QUEUE_DRIVER=redis
(this is from the horizon setup actually, but we will need that for later)
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379
```



## Cài Laravel Echo Server

Đây là phần chúng ta cài install socket.io server được bundle trong laravel-echo-server. Xem thêm tại đây: https://github.com/tlaverdure/laravel-echo-server

**Note**: Check các yêu cầu trên đầu trước!

Chạy như bên dưới đây (như trong document)


```php
npm install -g laravel-echo-server
```

Rồi chạy init để tạo file laravel-echo-server.json file vào trong app root (cái này chúng ta sẽ phải configure).
```php
laravel-echo-server init
```

Sau khi đã tạo được file laravel-echo-server.json thì nó sẽ trông như sau:

```php
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

**Note**: Nếu bạn muốn push phần này vào public server, hãy đảm bảo có add **laravel-echo-server.json** vào **.gitignore** và tạo file này trên server nhé, nếu không bạn sẽ phải đổi authHost liên tục. 

## *Run Laravel Echo Server*

Bạn phải chạy phần này để khởi động websockets.

```php
laravel-echo-server start
```


(nằm trong root — chỗ đặt laravel-echo-server.json)

Sau đó nó sẽ khởi động thành công. (Sau đó chúng ta sẽ muốn add nó vào server để nó tự khởi động và restart nếu bị bể).

Để phần này trong **/etc/supervisor/conf.d/laravel-echo.conf** của bạn (tạo file này trong folder **conf.d**):

```php
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

Một khi bạn đã sắp xếp trong laravel root, bạn có thể chạy

```php
pwd
```

để lấy path của ‘directory’ ở trên và của prefix ‘stdout_logfile’.

User sẽ trở thành các linux user (vagrant hoặc ubuntu hoặc cái khác)

Lưu file và thoát ra.

(nếu bạn cần dùng vim laravel-echo.conf thì khi làm trong quá trình, nhấn I (như Istanbul) trên bàn phím để edit file bằng VIM rồi type ESC như sau :wq! để đóng và lưu file.

Sau đó chúng ta sẽ chạy các command:

```php
sudo supervisorctl stop all
sudo supervisorctl reread
sudo supervisorctl reload
```


Rồi check xem laravel echo có đang chạy không
```php
sudo supervisorctl status
```

## Cài Laravel Echo và Socket IO client

```php
npm install --save laravel-echo
npm install --save socket.io-client
```

Sau đó register Echo trong bootstrap.js (Bạn đang dùng Vue js) 

```php
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


Hãy check lại lần nữa cách nghe event của bạn trên một số channel nhất định.

Theo Laravel Broadcasting mà tôi đã đề cập trước đó, nếu bạn dùng **broadcastOn()** method để return một **PresenceChannel** mới (Tôi sẽ giải thích kĩ hơn các casr tôi đã làm. Tôi thấy rằng phần này phức tạp hơn việc dùng public channel, vì thế chúng ta có thể giảm xuống không thành vấn đề) rồi chúng ta sẽ nghe lại channel trên diện Javascript (frontend).

Dưới đây là một số ví dụ điển hình:

1. Tôi đã push một event vào presence channel (phần này đang làm với các khảo sát)
```php
public function broadcastOn()
{
return new PresenceChannel('survey.' . $this->survey->id);
}
```

2. Sau khi được push thì nó sẽ đi dọc channels.php và trong đó chúng ta sẽ tạo nên phần uỷ quyền cho user này (nhớ return array cho phần uỷ quyền presence channel chứ không phải một Boolean)
```php
Broadcast::channel('survey.{survey_id}', function ($user, $survey_id) {
return [
'id' => $user->id,
'image' => $user->image(),
'full_name' => $user->full_name
];
});
```
3. Trong component VueJs của tôi có load trên page, tôi define một method bắt nguồn từ created() method đang load:
```php
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

Tôi đã lấy một vài đoạn code ra khỏi ví dụ nhưng vẫn còn array ‘users_viewing’ để các user vẫn tham gia vào các channel được.  

Happy coding!

Bài viết được dịch từ: https://medium.freecodecamp.org/how-to-use-laravel-with-socket-io-e7c7565cc19d
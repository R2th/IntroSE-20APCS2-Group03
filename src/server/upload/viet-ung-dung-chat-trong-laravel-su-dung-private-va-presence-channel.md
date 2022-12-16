Chào mừng các bạn quay trở lại với series viết ứng dụng chat realtime sử dụng Laravel, VueJS, Redis, Socket.IO và Laravel Echo của mình. 👋👋

Ở bài [trước](https://viblo.asia/p/viet-ung-dung-chat-realtime-voi-laravel-vuejs-redis-va-socketio-laravel-echo-Qpmle9Q9lrd) mình đã hướng dẫn các bạn viết ứng dụng chát đơn giản, dùng `public` channel trong Laravel, nhược điểm của `public` channel là khi 1 user gửi tin nhắn thì toàn bộ tất cả các user khác đều có thể nhận được. Thực tế thì ta sẽ thường muốn 1 user gửi tin nhắn đến chỉ 1 hoặc 1 số user khác.

Và để làm điều đó thì bìa hôm nay mình sẽ hướng dẫn các bạn sử dụng `private` và `presence` channel trong laravel để xác thực user và gửi tin nhắn đến 1 số user nhất định, thay vì toàn bộ như trước kia.

Ở bài này ta sẽ xây dựng:
- Một chatroom có 2 phòng, user có thể gửi tin nhắn khi ở trong phòng
- User ở phòng nào sẽ chỉ nhận được tin nhắn ở phòng đó (phần private channel)
- Tiếp đó ta sẽ hiển thị thông tin chi tiết từng user có trong phòng (phần presence channel)
# Chuẩn bị
### Điều kiện tiên quyết :-D
> Nghe tiên quyết như học sinh cấp 3 :rofl::rofl:

Các bạn cần phải cài đặt `redis`. Gõ command `redis-cli` để check nhé. Nếu thấy báo lỗi không có thì search google cách cài với từng nền tảng Win, Mac, Linux nhé

Rất nhiều bạn thiếu bước này đó :-D

### Thiết lập project
Ở bài này để tiết kiệm thời gian, mình đã tạo sẵn một project mẫu cho các bạn rồi nhé.

Các bạn clone source code ở [repo này](https://github.com/maitrungduc1410/realtime-chatapp-laravelecho-socketio/tree/starter-tutorial) (nhánh **starter-tutorial** nhé các bạn)

Sau khi clone các bạn chạy lần lượt command sau để setup project:
```
git checkout starter-tutorial
composer install
npm install
cp .env.example .env
php artisan key:generate
```
Sau đó các bạn setup lại thông số database ở file `.env` cho phù hợp với máy của các bạn nhé.

Tiếp theo ta migrate và seed dữ liệu nhé:
```
php artisan migrate --seed
```
Cuối cùng chạy app để test thử coi xem sao nhé :-D, các bạn chạy các command sau:
```
php artisan serve
npm run watch
```
![Laravel](https://images.viblo.asia/73d42507-49ec-4258-8c7e-a80caab2b1eb.png)
Các bạn thử đăng kí tài khoản mới sau đó login nếu thấy màn hình như sau là oke rồi đó. Thử click vào 1 chatroom coi xem sao nhé ;).
### Tổng quan project
Mình sẽ giải thích một lượt về project để các bạn nếu muốn chỉnh sửa có thể làm dễ dàng nhé. 

Các mục cần quan tâm:
- File `routes/web.php` ở đây mình định nghĩa vài routes đơn giản. Ở cuối cùng của file này mình có bắt `route::any` nhằm fix lỗi của Vue-router trả về 404 nếu các bạn để `mode: 'history'` nhé.
- Mình chỉ có 2 model là User và Message. Mỗi message có **room** (message được gửi ở phòng nào, khoá ngoại tới bảng `chatrooms`), **sender** (ai là người gửi, khoá ngoại tới bảng `users`) và **content** (nội dung tin nhắn)
- Có 2 controller là MessageController (hiển thị và lưu message) và AppController (trả về view chứa frontend kèm theo data). Mục đích trả kèm theo data là mình muốn các thông tin như `user`, `chatroom` được trả về ngay khi user login thành công, trước khi gọi vào VueJS, để lát nữa mình không phải tốn request gọi lại nữa, vì đây là 2 thành phần không đổi trong suốt quá trình sử dụng.
- File `resources/views/app.blade.php` là file trả về frontend VueJS. các bạn có thể thấy mình có biến `window.__app__ = @json($data)`, đây là data được trả về kèm với view (xem AppController). biến `__app__` này lát nữa sẽ được dùng ở file `app.js` của VueJS nhé :-D
- Nếu bạn nào có thắc mắc ở file `app.blade.php` mình có để `{{ mix('js/manifest.js') }}` và `{{ mix('js/vendor.js') }}` và không hiểu đó là gì :-D. Các bạn xem file `webpack.mix.js` nhé. Mục đích của mình ở đây là tách code frontend thành các phần nhỏ hơn, sau này sẽ tiện cho user khi load từ browser và cache dễ hơn. Xem kĩ hơn ở [đây](https://laravel-mix.com/docs/5.0/extract) nhé

Nói chung project ở bước này khá đơn giản, chỉ là dạng CRUD, chưa có realtime. Các bạn có thể chọn 1 chatroom, nhập 1 dòng tin nhắn và bấm gửi, mở tab trình duyệt khác sẽ không thấy realtime mà phải load lại trình duyệt.

Bắt đầu vào phần realtime thôi nào :-D

# Realtime với Private Channel
Ở bài này ta dùng `redis` nên đầu tiên ta cần cài driver cho redis trong laravel nhé. Các bạn chạy command sau:
```
composer require predis/predis
```
Tiếp đó vào file `.env` sửa lai phần BROADCAST như sau:
```php
BROADCAST_DRIVER=redis
CACHE_DRIVER=redis
QUEUE_CONNECTION=redis
SESSION_DRIVER=redis
SESSION_LIFETIME=120
```
Tiếp đến mở file `config/database.php` tìm mục `redis` và sửa lại 1 chút ở `client` và `options` như sau:
```php
'client' => env('REDIS_CLIENT', 'predis'),

'options' => [
    'cluster' => env('REDIS_CLUSTER', 'redis'),
    // comment dòng bên dưới
    //'prefix' => env('REDIS_PREFIX', Str::slug(env('APP_NAME', 'laravel'), '_').'_database_'),
],
```
Tiếp đó mở file `config/app.php`, tìm mục `providers` bỏ comment dòng sau nhé:
```php
App\Providers\BroadcastServiceProvider::class
```
Xong cho phần backend Laravel. Tiếp đến ta cần cài 1 số thư viện cho frontend  nhé:
```bash
npm install --save laravel-echo
```
Sau đó các bạn mở file `resources/app.blade.php` thêm vào 1 dòng như sau:
```html
<script>window.__app__ = @json($data)</script>

--------Thêm vào dòng bên dưới
<script src="http://localhost:6001/socket.io/socket.io.js"></script>

<script src="{{ mix('js/manifest.js') }}"></script>
....
```
> Note quan trọng: lí do ta thêm vào đoạn `<script src="http://localhost:6001/socket.io/socket.io.js"></script>` đó là thay vì chạy `npm install socket.io-client` thì ta dùng luôn cái socket io client mà phía laravel echo server có sẵn, bởi vì hiện tại ở phiên bản mới của laravel echo server nó lại đang dùng phiên bản cũ của `socket.io-client` dẫn tới việc nếu các bạn chạy `npm install socket.io-client` sau đó dùng kiểu `window.io = require('socket.io-client')` thì sẽ ko thấy realtime bởi vì ta có 2 phiên bản khác nhau của `socket.io-client ` và chúng conflict lẫn nhau

Tiếp đó ta mở file `resources/js/bootstrap.js`, kéo xuống dưới sửa phần cấu hình Laravel Echo như sau:
```js
import Echo from 'laravel-echo'

window.Echo = new Echo({
  broadcaster: 'socket.io',
  host: `${window.location.protocol}//${window.location.hostname}:6001`
})
```
Tiếp theo ta cần cài đặt Laravel Echo Server nhé:
```
npm install -g laravel-echo-server
```
Sau đó ta setup `laravel echo server` luôn. Các bạn chạy command:
```
laravel-echo-server init
```
Khi được hỏi thì chọn các options như sau nhé (chú ý dòng  `Laravel authentication server` phải nhập vào `http://localhost:8000` nhé):
![Laravel Echo Server](https://images.viblo.asia/d5e28b10-7d75-454b-ade0-d91dfe406246.png)

Mọi thứ setup trông ổn rồi đó :-D (phù, dài quá setup chán chê mới xong :-D, cố lên sắp đến thiên thai rồi nha các bạn ;)).

Ý tưởng làm realtime ở bài này như sau: khi 1 user join vào 1 chatroom, gửi đi 1 tin nhắn, khi tin nhắn được lưu thành công sẽ thông báo (broadcast) với các user chỉ ở trong chatroom đó, ta dùng Event trong Laravel để broadcast nhé.

Ta tạo event `MessagePosted` (event này sẽ được gọi mỗi khi có tin nhắn được lưu thành công):
```
php artisan make:event MessagePosted
```
Sau đó ta mở file `app/Events/MessagePosted` và sửa lại như sau:
```php
<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

use App\Message; // import class Message

class MessagePosted implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $message;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Message $message)
    {
        $this->message = $message;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('room.'.$this->message->room);
    }
}
```
Giải thích chút nhé: ở event này ta nhận vào 1 tham số là `message` vừa được lưu, sau đó broadcast cho các users khác qua `Private channel` với tên channel là `room` của message.

Tiếp theo, vì là bây giờ ta dùng Private Channel, nên ta phải login trước thì lát nữa mới có thể lắng nghe sự  kiện nhé. Đồng thời, khi login xong user có tuỳ quyền chọn vào 1 trong các chatroom định sẵn do đó ở file `routes/channels.php` ta thêm vào như sau nhé:
```php
Broadcast::channel('room.{id}', function ($user, $id) {
    return true; // user có thể join vào bất kì chatroom nào
});
```

Setup phần broadcast ổn rồi đó. Giờ ta quay lại file `MessageController.php` ở hàm `store` (để lưu tin nhắn) ta sửa lại như sau:
```php
use App\Events\MessagePosted; // thêm dòng này ở đầu

...

public function store (Request $request) {
    $message = new Message();
    $message->room = $request->input('room', '');
    $message->sender = Auth::user()->id;
    $message->content = $request->input('content', '');

    $message->save();
    
    // Thêm dòng bên dưới
    // Gửi đến các user khác trong phòng TRỪ user tạo tin nhắn này
    broadcast(new MessagePosted($message->load('sender')))->toOthers();

    return response()->json(['message' => $message->load('sender')]);
}
```
Ổn rồi đó, giờ ta qua frontend để lắng nghe sự kiện bắt tin nhắn mới nhé ;)

Các bạn mở file `resources/js/pages/Room.vue` ở `created` các bạn sửa lại như sau:
```js
created () {
    this.getMessages()

    const index = this.$root.rooms.findIndex(item => item.id === parseInt(this.$route.params.roomId))
    if (index > -1) {
      this.currentRoom = this.$root.rooms[index]

        Echo.private(`room.${this.currentRoom.id}`)
        .listen('MessagePosted', (e) => {
          this.messages.push(e.message)
          
          this.scrollToBottom(document.getElementById('shared_room'), true)
        })
    }
},
```
Giải thích chút nhé:
- Ở `created` đầu tiên ta lấy danh sách tin nhắn ứng với room ID hiện tại, room ID được trichs từ URL hiên tại (dùng `this.$route.params.roomId`)
-  vẫn ở `created` ta check xem room ID có tồn tại trong danh sách room hay không (đề phòng user tự sửa room id và cho load lại trang)
-  nếu có thì ta mới tiến hành lắng nghe tin nhắn  dùng `Echo.private`, khi có tin nhắn mới thì ta đẩy vào mảng danh sách message

Tiêp theo đó vẫn ở `Room.vue` ta thêm vào:
```js
beforeDestroy () {
    // huỷ lắng nghe tin nhắn ở chatroom hiện tại
    // nếu như user chuyển qua route/chatroom khác
    Echo.leave(`room.${this.currentRoom.id}`)
},
```

Ô kê đến giờ test rồi. Các bạn tắt hết các cửa sổ terminal đang chạy, clear config bằng command `php artisan config:clear` và ta tiến hành khởi động lại bằng các command sau nhé, mỗi command chạy ở 1 terminal nhé:
```bash
php artisan serve
npm run watch
laravel-echo-server start
php artisan queue:work
```
Ta login lại, chọn một chatroom và check xem ở terminal nơi chạy `laravel-echo-server` in ra như sau là được nhé:

![laravel echo server](https://images.viblo.asia/08b7050c-877f-4fa1-b8aa-6fe0dbb7ccc5.png)

Sau đó ta lại mở 1 tab khác, login và join vào cùng room và gửi tin nhắn qua lại và xem thành quả nhé ;).

![](https://images.viblo.asia/9392d49a-9e6c-48e2-a087-dc045be829e7.png)

Note: mỗi khi gửi tin nhắn thì các bạn check lại 2 terminal chạy `laravel-echo-server` và `queue:work` hiển thị như sau là oke nhé:

![laravel echo server](https://images.viblo.asia/8a77e81d-60c1-4f05-a63d-2c9016a4d735.png)

![](https://images.viblo.asia/3ed99bb2-c8b8-41f1-a315-48c0cd772bb2.png)


Tiếp theo các bạn thử cho mỗi user join vào 1 phòng và lại thử nhắn tin tiếp, ta để ý là user ở phòng nào thì chỉ nhận được tin nhắn realtime từ phòng đó nhé :-D. Tuyệt vời <3


Giờ vấn đề tiếp theo là làm cách nào để lấy được thông tin chi tiết từng user trong phòng và hiển thị. Cùng đi tiếp tới phần sau nhé các bạn
# Lấy thông tin user dùng Presence Channel
> Presence channel cũng chính là Private channel nhưng ở đó ta lấy được thông tin cụ thể từng user

Thế có bạn sẽ hỏi: thế vậy tôi cần cái `Private channel` làm gì, dùng luôn `Presence channel` đi, thông tin user sau này cần thì dùng không thì thôi :-D

Đúng mình cũng có câu hỏi như vậy và hiện tại chưa tìm được 1 câu trả lời chính thống cụ thể nào. Nhưng mình đã sớm nhận ra là `Presence channel` khi broadcast sẽ chậm hơn `Private channel` 1 chút, cái "1 chút" này đủ dài để ta có thể cảm nhận được :D

Thôi tiếp tục phần này nào :-D. 

Ở file `routes/channels.php`, ta sửa lại như sau nhé:
```php
Broadcast::channel('room.{id}', function ($user, $id) {
    // // giờ đây ta trả về thông tin user chứ không trả về true/false nữa
    return $user;
});
```
Tiếp theo ta quay lại file `app/Events/MessagePosted.php` và sửa lại hàm `broadcastOn` như sau:
```php
public function broadcastOn()
{
    return new PresenceChannel('room.'.$this->message->room);
}
```

Sau đó ta quay lại file `Room.vue` ở `created` ta sửa lại như sau:
```js
created () {
    this.getMessages()

    const index = this.$root.rooms.findIndex(item => item.id === parseInt(this.$route.params.roomId))
    if (index > -1) {
      this.currentRoom = this.$root.rooms[index]

      // eslint-disable-next-line no-undef
      Echo.join(`room.${this.currentRoom.id}`)
        .here((users) => { // gọi ngay thời điểm ta join vào phòng, trả về tổng số user hiện tại có trong phòng (cả ta)
          this.usersOnline = users
        })
        .joining((user) => { // gọi khi có user mới join vào phòng
          this.usersOnline.push(user)
        })
        .leaving((user) => { // gọi khi có user rời phòng
          const index = this.usersOnline.findIndex(item => item.id === user.id)
          if (index > -1) {
            this.usersOnline.splice(index, 1)
          }
        })
        .listen('MessagePosted', (e) => {
          this.messages.push(e.message)
          this.scrollToBottom(document.getElementById('shared_room'), true)
        })
    }
  },
```

Tiếp đó vẫn ở `Room.vue` ta bỏ comment các đoạn sau: (phần này là code hiển thị danh sách user trong phòng)
```js
<template>
    ...
    <div class="col-md-4 chat">
      <ListUser
        :usersOnline="usersOnline"
      />
    </div>
</template>

import ListUser from '../components/ListUser'

...

components: {
    ListUser,
    SharedRoom
  },
```
Sau đó ta khởi động lại app 1 lần nữa, tắt toàn bộ các cửa sổ terminal, và chạy lại như sau:
```
php artisan serve
npm run watch
laravel-echo-server start
php artisan queue:work
```
Sau đó các bạn load lại trang, và BÙM, ta có kết quả như sau:

![](https://images.viblo.asia/b5e7a507-6514-4c62-965a-e506273ca959.png)

Ở terminal `laravel echo server` in ra như sau:

![laravel echo server](https://images.viblo.asia/93dd9242-c9ec-440b-bf6e-b61725143909.png)

Các bạn thử cho user thoát hoặc thêm user mới vào phòng để thấy thành quả nhé ;)

# Bài tập về nhà
> Nghe bài tập về nhà lại giống cấp 3 :joy::joy:

Giờ đây ta có thông tin của toàn bộ user trong phòng rồi. Các bạn thử tự mình làm thêm 1 chức năng nhắn tin riêng 1-1 với 1 user nào đó trong phòng. Ví dụ: bấm click chọn một user trong danh sách user thì xuất hiện của sổ chat riêng với user đó (giống Facebook chẳng hạn), dùng Private hoặc Presence Channel chẳng hạn, nhưng theo mình chat 2 người dùng Private channel là đủ, nhanh hơn Presence channel. 

Đồng thời ta thêm các sự kiện nhỏ nhỏ kiểu: "user này đang gõ", "đã xem lúc mấy giờ", báo tin nhắn đến. Để làm được những điều này các bạn cần đọc thêm chút phần sự kiện `whisper` ở trang chủ Laravel [đây nhé](https://laravel.com/docs/5.7/broadcasting#client-events)

# Demo
Các bạn có thể xem demo của mình [ở đây nhé](https://realtime-chat.jamesisme.com)

# Nếu bạn gặp lỗi
Trong khi code nếu có khi nào bạn gặp lỗi thì xem lại [bài đầu tiên trong series này của mình phần debug](https://viblo.asia/p/viet-ung-dung-chat-realtime-voi-laravel-vuejs-redis-va-socketio-laravel-echo-Qpmle9Q9lrd#_vii-debug-khi-gap-loi-6) mình đã ghi rấttttttt là tâm huyết rồi các bạn à 😘😘😘

# Kết bài
Qua bài này hi vọng các bạn đã hiểu hơn được cách sử dụng Private và Presence Channel trong laravel để xử lý realtime data. Thường ở các dự án thật thì mình dùng 2 loại channel này chứ không dùng Public channel như bài [trước](https://viblo.asia/p/viet-ung-dung-chat-realtime-voi-laravel-vuejs-redis-va-socketio-laravel-echo-Qpmle9Q9lrd) , nhưng vì public channel khá dễ cấu hình, không cần xác thực nên mình giới thiệu với các bạn trước để các bạn làm quen với cách làm realtime trong Laravel.

Có rất nhiều bạn đã hỏi mình về các sử dụng Private/Presence channel, và các lỗi mà các bạn gặp phải, mong rằng qua bài này các bạn hiểu thêm về cách sử dụng chúng ;)

Source code khi làm đến phần cuối cùng của bài này [ở đây](https://github.com/maitrungduc1410/realtime-chatapp-laravelecho-socketio/tree/complete-tutorial) nhé các bạn (nhánh **complete-tutorial**)

Trong bài nếu có gì thắc mắc các bạn cứ để lại commen cho mình nhé. Hẹn gặp các bạn ở các bài sau ^^
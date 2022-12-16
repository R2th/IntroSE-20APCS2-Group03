Hello các bạn lại là mình đây :sunglasses::sunglasses:

Dạo này dịch bệnh ở VN căng thẳng quá chờ mãi không biết bao giờ con mới được về với đất mẹ :cry::cry::cry::cry: Nhớ giữ gìn sức khoẻ nhé các bạn để có sức còn code :D

Ở các bài trước trong series viết ứng dụng chat này mình dùng session để xác thực account của user cùng với đó là xác thực cho phía laravel echo. Thế nhưng ở các dự án thật thì việc xác thực qua JWT Token cũng rất phổ biến. Có khá nhiều bạn đã hỏi mình về vấn đề này.

Hôm nay tranh thủ rảnh mình viết luôn bài này để từ nay về sau các bạn có cái để xem trực tiếp và làm theo luôn chứ không cần phải lọ mọ search google nữa :kissing_heart:

> Bài sẽ khá là ngắn chứ không dài dòng văn tự như các bài khác nên các bạn yên tâm nhé :laughing::laughing::laughing:
# Setup
Đầu tiên các bạn giúp mình clone source code cho bài này [ở đây](https://gitlab.com/maitrungduc1410/chat-app-laravel-passport) nhé.

Sau khi clone xong các bạn chạy lần lượt các command sau để cài các thư viện và 1 số setup liên quan nhé:
```
composer install
npm install
cp .env.example .env
```
Các bạn update thông tin kết nối database trong `.env` cho khớp với môi trường của các bạn nhé, sau đó lại tiếp tục chạy các command sau:
```
php artisan migrate
php artisan passport:keys
php artisan passport:install
php artisan key:generate
```
Cuối cùng ta thử chạy app lên nhé:
```
php artisan serve

# mở 1 terminal khác chạy:
npm run watch
```
Cuối cùng các bạn mở trình duyệt ở địa chỉ `http://localhost:8000/chat`, click Register để đăng kí tài khoản mới, sau khi đăng kí thành công các bạn sẽ được đưa vào màn hình chính như sau:

![](https://images.viblo.asia/4757a30f-b0a5-48e8-8f60-1b3a49dd24c3.jpg)

Các bạn thử gõ vài tin nhắn và gửi xem mọi thứ có oke hay không nhé, thử F5 lại trình duyệt để đảm bảo tin nhắn cũ được lưu trong database nhé.

Tổng quan project:
- Ở project này mình dùng Laravel Passport cho authentication (login, register, gửi/load message). Mình dùng JWT Token để xác thực cho tất cả các APIs
- Các routes cho Laravel mình khai báo ở `routes/api.php`, phía frontend dùng Vue Router
- Tất cả các bước setup cho Laravel Passport mình đều follow theo [docs của Laravel](https://laravel.com/docs/master/passport), không có gì kì diệu ở đây :D 

Âu cây ta bước vào phần chính của ngày hôm nay thôi nào :rocket::rocket::rocket:
# Realtime
Điều kiện bắt buộc cho bài này đó là các bạn phải có Redis chạy trên máy nhé, trên windows cài Redis sẽ hơi chuối hơn 1 chút, nên mình khuyến khích các bạn dùng Docker để chạy Redis (1 nốt nhạc là lên ;))

Đầu tiên ta cài `predis` cho phía Laravel nhé:
```
composer require predis/predis
```

Sau đó ở `.env` các bạn update lại phần cấu hình broadcast cho Laravel như sau:
```
...

BROADCAST_DRIVER=redis
CACHE_DRIVER=redis
FILESYSTEM_DRIVER=local
QUEUE_CONNECTION=redis
SESSION_DRIVER=redis
SESSION_LIFETIME=120

...
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
Tiếp theo ta setup Laravel Echo Server nhé. Nếu máy các bạn chưa cài Laravel Echo Server thì các bạn chạy `npm install -g laravel-echo-server` trước đã nhé

Các bạn cho mình command sau:
```
laravel-echo-server init
```
Các bạn lần lượt chọn các option như sau nhé:

![](https://images.viblo.asia/2a1deb52-19a7-4ffd-af33-8a3bc5d19264.png)

Tiếp theo ta mở file `laravel-echo-server.json` và update trường `authEndpoint` thêm vào tiền tố `/api` (vì bài này ta dùng toàn bộ là route `/api` mà):
```json
"authEndpoint": "/api/broadcasting/auth",
```
Sau đó ta cần cài Laravel Echo cho phần frontend (VueJS) nhé:
```
npm i laravel-echo
```
Các bạn update lại file `resources/views/layouts/app.blade.php` thêm vào đoạn `header` ngay sau `js/app.js` cho mình như sau nhé:
```html
<script src="{{ asset('js/app.js') }}" defer></script>

<!-- thêm vào dòng bên dưới -->
<script src="http://localhost:6001/socket.io/socket.io.js"></script>
```
Âu cây ta chạy Laravel Echo Server lên nhé:
```
laravel-echo-server start
```
> Nhớ đảm bảo là laravel echo server chạy ngon nhé các bạn :)

Tiếp theo ta mở file `resources/js/app.js` ta update lại 1 chút như sau nhé:
```js
import router from './router/routes'
import Echo from 'laravel-echo' // <<<------- Thêm vào dòng này
...

methods: {
        async getCurrentUser() {
            try {
                .....
            
                window.Echo = new Echo({
                    broadcaster: 'socket.io',
                    host: `${window.location.protocol}//${window.location.hostname}:6001`,
                    auth: {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem('token')
                        }
                    }
                })
            } catch (error) {
                console.log(error)
            }
        }
        
 }
```
Như các bạn thấy sự khác biệt của bài này so với các bài trước đó là ta chỉ khởi tạo connect tới Laravel echo server sau khi ta lấy được thông tin của user login hiện tại, mục đích để đảm bảo là user đã được xác thực, và đoạn quan trọng là ta truyền token vào trường `auth` để xác thực với phía Laravel echo server:
```js
auth: {
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
    }
}
```
Sau đó ta quay lại trình duyệt bấm F5 để đảm bảo mọi thứ vẫn oke, kiểm tra Network để đảm bảo không có gì có lỗi:

![](https://images.viblo.asia/053ce463-5bcd-41e4-a5e9-927b8fbd8a93.png)

Tiếp theo ta mở file `resources/js/components/Chat.vue` ở `created` ta thêm vào như sau:
```js
Echo.private(`chatroom`).listen("MessagePosted", (e) => {
      console.log(e.message);
});
```
Như ở trên các bạn cũng thấy đó là ta sẽ cho user join vào private channel tên là `chatroom` và lắng nghe event `MessagePosted` nếu thấy có tin nhắn mới thì in ra ở console.

Các bạn lưu lại và ta quay lại trình duyệt bấm F5 và để ý terminal nơi đang chạy Laravel Echo Server ta sẽ thấy lỗi in ra như sau:

![](https://images.viblo.asia/acc2a37d-3e1c-4ace-a4f9-4ec66ed706d5.png)

Lỗi in ra ở đây là vì khi ta join vào channel `chatroom` thì Laravel Echo Server nó cần phải xác thực với phía Laravel, và vì ta đang đặt `authEndpoint` (trong laravel-echo-server.json) là `/api/broadcasting/auth`, mà cái route đó ta lại chưa hề khai báo nó ở đâu cả nên nó báo lỗi không tìm thấy.

Giờ ta mở file `routes/api.php` và khai báo cho route đó nhé:
```php
...

Route::middleware('auth:api')->post('/broadcasting/auth', function (Request $request) {
    return true;
});
```
Ổn rồi đó giờ ta quay lại trình duyệt bấm F5 1 lần nữa và quan sát ở terminal nơi đang chạy Laravel Echo Server sẽ thấy như sau nhé:

![](https://images.viblo.asia/f6b24315-38d4-4529-b635-13289f42dfc7.png)

Vậy là ta đã hoàn thành việc xác thực với Laravel Echo Server bằng JWT Token rồi đó, mọi thứ còn lại thì y như những bài trước.

Đầu tiên ta tạo event `MessagePosted` (event này sẽ được gọi mỗi khi có tin nhắn được lưu thành công):

```
php artisan make:event MessagePosted
```
Sau đó ta mở file `app/Events/MessagePosted.php` và update 1 số phần như sau:
```php
...

use App\Models\Message; // thêm vào dòng này

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
        return new PrivateChannel('chatroom');
    }
}
```

Cuối cùng ta mở file `routes/api.php` phần lưu tin nhắn ta thêm vào 1 dòng như sau:
```php
Route::middleware('auth:api')->post('/messages', function (Request $request) {
    $user = Auth::user();

    $message = new App\Models\Message();
    $message->message = request()->get('message', '');
    $message->user_id = $user->id;
    $message->save();

    // Thêm dòng bên dưới
    // Gửi đến các user khác trong phòng TRỪ user tạo tin nhắn này
    broadcast(new App\Events\MessagePosted($message->load('sender')))->toOthers();
    return ['message' => $message->load('user')];
});
```
Sau đó ta quay lại file Chat.vue và update `created` và thêm vào method `scrollToBottom` như sau:
```js
  created() {
    this.loadMessage();

    Echo.private(`chatroom`).listen("MessagePosted", (e) => {
      this.list_messages.push(e.message)
      this.$nextTick(() => {
        this.scrollToBottom();
      });
    });
  },
  methods: {
  ...
    scrollToBottom() {
      const container = document.querySelector(".messages");
      if (container) {
        $(container).animate(
          { scrollTop: container.scrollHeight },
          { duration: "medium", easing: "swing" }
        );
      }
    },
  }
```
Tiếp theo các bạn nhớ chạy queue:work nhé:
```
php artisan queue:work
```

Ổn rồi đó giờ ta quay lại trình duyệt mở 2 tab, login vào 2 tài khoản khác nhau (mở tab ẩn danh nhé), chat thử nếu thấy realtime là ô xờ kê rồi đó:

![](https://images.viblo.asia/4a5b54bb-af51-489f-88dc-acfeaaedbaeb.png)
# Xác thực cho từng channel
Nếu các bạn để ý thì bài này ta không cần dùng tới file `routes/channels.php`, hiện tại thì ta đang `return true;` tức là cho user join vào bất kì private channel nào, thế nhưng thực tế thường ta sẽ có nhiều channel và với 1 user ta chỉ muốn cho họ join vào 1 vài channel nào đó thôi.

Từ phía Laravel Echo Server thì mỗi lần xác thực nó sẽ gửi kèm theo `channel_name` và ta có thể dựa vào đó để xử lý tuỳ ý:
```php
use Illuminate\Support\Facades\Log;

...

Route::middleware('auth:api')->post('/broadcasting/auth', function (Request $request) {
    $channel_name = $request->channel_name;
    Log::info($channel_name);
    Log::info(auth()->user());
    
    // Xử lý channel, throw lỗi nếu không muốn cho user join vào channel
    
    return true;
});
```

# Nếu bạn gặp lỗi
Trong khi code nếu có khi nào bạn gặp lỗi thì xem lại [bài đầu tiên trong series này của mình phần debug](https://viblo.asia/p/viet-ung-dung-chat-realtime-voi-laravel-vuejs-redis-va-socketio-laravel-echo-Qpmle9Q9lrd#_vii-debug-khi-gap-loi-6) mình đã ghi rấttttttt là tâm huyết rồi các bạn à 😘😘😘

# Kết bài
Lâu lắm mới có 1 bài "tàu nhanh" như thế này :sunglasses::sunglasses::sunglasses:. 

Qua bài này các bạn thấy rằng việc dùng JWT Token để xác thực với Laravel Echo Server cũng không khó khăn lắm phải không nào? Nhưng vì mình thấy tài liệu và các bài tutorial trên mạng chủ yếu dùng session (như mình làm ở các bài trước), nên khi vào dự án thực tế mà dùng JWT thì bối rối không biết làm như thế nào, thì mong rằng qua bài này các bạn đã hiểu hơn về cách sử dụng nó.

Chúc các bạn thành công và hẹn gặp lại các bạn ở những bài sau
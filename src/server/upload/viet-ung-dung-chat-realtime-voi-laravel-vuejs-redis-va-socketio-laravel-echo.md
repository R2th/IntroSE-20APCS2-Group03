Xin chào tất cả các bạn, đây là một trong những bài post đầu tiên của mình. Sau bao năm toàn đi đọc các blog tích luỹ được chút kiến thức của các cao nhân trên mạng. Đến ngày hôm nay mới quyết định tập toẹ viết blog. Mục đích vừa muốn chia sẻ kiến thức của mình với mọi người, vừa muốn tăng khả năng viết lách của bản thân. Có gì sai sót anh em comment nhiệt tình nhé.

Hôm nay mình hướng dẫn các bạn xây dựng ứng dụng đơn giản demo chat reatime với Laravel, Vue, Redis và Socket.IO
- - -
*Sau khi có góp ý của 1 số bạn thì mình đã check lại và sửa lại các thiếu sót và đã test lại đầy đủ, nếu vẫn còn bug các bạn cứ comment nhiệt tình cho mình nhé :)*
- - -
# I. Setup
<Ở thời điểm hiện tại mình đã update bài này chạy với Laravel 8.12, Vue 2.6>

Đầu tiên mình muốn giải thích tại sao mình dùng Redis.

Mình đã từng xem rất nhiều tuts về app real time dùng Laravel, và hầu hết chúng sử dụng Pusher(một bên thứ 3 giúp ta xử lý các tác vụ thời gian thực), mình đánh giá Pusher khá là ổn nhưng có nhược điểm là bị giới hạn về số kết nối và số lượng tin nhắn truyển tải, nên cần phải trả tiền theo nhu cầu sử dụng. Vì thế nên mình quyết định chọn Redis trong bài này, thực ra ở các dự án thật mình từng làm đều sử dụng Redis (hỗ trợ caching trên RAM giúp truy vấn nhanh hơn, và quan trọng nữa là nó free).

Đồng thời nếu sau này ta dùng Laravel Horizon, hay các loại queue jobs (để gửi mail chẳng hạn), thì hầu hết ta lại sử dụng Redis

Nói thế cũng nhiều rồi, sau đây mình bắt tay vào setup project thôi:

> Trước nhất và quan trọng nhất các bạn check xem đã cài `redis` chưa nhé. Gõ command `redis-cli` để check nhé (Ubuntu/Mac cài redis khá đơn giản, Win thì hơi vất hơn ;))

Đầu tiên chúng ta sẽ khởi tạo project Laravel, đặt tên là chat-app.Mở PowerShell (Windows) hoặc terminal(MAC, Linux) và chạy câu lệnh sau:
```bash
laravel new chat-app
```
Chắc sẽ có bạn hỏi sao có thể dùng được câu lệnh trên, tưởng phải thế này chứ nhỉ:
```bash
composer create-project --prefer-dist laravel/laravel chat-app
```
Thì các bạn có thể xem hướng dẫn ở đây nhé: [https://laravel.com/docs/8.x#the-laravel-installer](https://laravel.com/docs/8.x#the-laravel-installer)

Sau khi cài đặt xong các bạn `cd` vào thư mục project vừa tạo nhé, tiếp theo chúng ta cài driver để kết nối Redis bằng câu lệnh:
```bash
composer require predis/predis
```
Tiếp theo chúng ta setup VueJS đồng thời tạo sẵn chức năng login, tạo tài khoản,... nhé:
```bash
composer require laravel/ui --dev
php artisan ui vue --auth
npm install
```
Laravel sẽ tự tích hợp VueJS vào project của chúng ta. Cùng xem kết quả nhé:

![](https://images.viblo.asia/7135b2c1-f222-402d-881c-eb5ff53f10f6.png)


Nó sẽ tạo sẵn ra cho chúng ta các thành phần cần thiết của Vue. Sau đây sẽ bắt tay vào tạo phần giao diện nhé.

Đầu tiên chúng ta tạo file `/views/chat.blade.php` chứa layout cơ bản của ứng dụng.

Các bạn xem code trên gist ở [đây](https://gist.github.com/maitrungduc1410/74aadf09c61f5a4d9fb7e743f8dbd533)

Trong đoạn code trên mình có tạo sẵn một cặp thẻ `“chat-layout” `, đây là component VueJS mà chúng ta sẽ nói ở phần sau nhé.

Sau đó tạo một route để truy cập vào view này, các bạn thêm vào `routes/web.php` như sau nhé:
```php
Route::get('/', function () {
    return view('chat');
});

Auth::routes();
```
# II. VueJS
Ứng dụng sẽ có 2 Vue components là ChatLayout.vue và ChatItem.vue

Trước tiên chúng ta vào `resource/js/app.js` và khai báo như sau:
```js
Vue.component('chat-layout', require('./components/ChatLayout.vue').default)

const app = new Vue({
    el: '#app'
})
```
Tạo 2 file mới trong thư mục `components` là `ChatLayout.vue`và `ChatItem.vue` với nội dung như sau:

Vì nội dung hơi dài 1 xíu nên mình đã đưa lên gist để các bạn tiện xem hơn nhé:
[Link Gist](https://gist.github.com/maitrungduc1410/74aadf09c61f5a4d9fb7e743f8dbd533)

Oke thế là xong giao diện đơn giản, ta tiến hành khởi động project và check thử coi thế nào nhé:

```
php artisan serve

npm run watch  <chạy ở của sổ terminal khác>
```

![](https://images.viblo.asia/2ddbde6d-3b0b-4482-bead-074147d327aa.png)

Hiện đã có sẵn chút dữ liệu do mình tạo cho các bạn nhìn trực quan, lát mình sẽ xoá đi nhé.
# III. Laravel Backend
Quay trở lại với server.

Đầu tiên chúng ta tạo model Message với câu lệnh:
```
php artisan make:model Message -m
```
option -m để tạo luôn migration cho nó nhé.

Các bạn vào `database/migrations/` Tìm đến file migration vừa tạo, và sửa lại hàm `up()` như sau:
```php
public function up()
{
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->text('message');
            $table->integer('user_id')->unsigned();
            $table->timestamps();
        });
}
```
sửa lại file `app/Models/Message.php` như sau:
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $fillable = ['message', 'user_id'];

    public function user() {
        return $this->belongsTo(User::class);
    }
}
```
Giải thích: vì mỗi tin nhắn sẽ phụ thuộc vào 1 user nên ở `Message` ta có quan hệ `belongsTo` và mỗi User có thể có nhiều tin nhắn nên ở User ta có quan hệ `hasMany`.

Sau đó setup lại file `.env` theo thông số database của các bạn(DB_DATABASE, DB_DATABASE, DB_USERNAME, DB_PASSWORD), đồng thời thiết lập các thông số của phần broadcast như sau luôn nhé:

```js
BROADCAST_DRIVER=redis
CACHE_DRIVER=redis
QUEUE_CONNECTION=redis
SESSION_DRIVER=redis
SESSION_LIFETIME=120
```
Thiết lập xong nhớ chạy lại server bằng câu lệnh: 
```
php artisan serve
```

Tau đó các bạn chạy câu lệnh sau để khởi tạo database: 
```
php artisan migrate
```

Nếu các bạn gặp lỗi `Specified key was too long; max key length is ...` Thì fix như sau nhé:

Mở file `app/providers/AppServiceProvider.php` và sửa lại như sau:
```php
<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Schema::defaultStringLength(191);
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
```
Sau đó chạy lại `php artisan migrate:refresh` là được nhé.

Tiếp theo chúng ta sẽ tạo một route để mỗi khi một tin nhắn do người dùng gửi tới sẽ được lưu vào database.

Ta tạo các route mới như sau (đồng thời sửa lại route đã tạo để yêu cầu đăng nhập nếu muốn vào phòng chat nhé):
```php
Auth::routes();

Route::get('/chat', function() {
    return view('chat');
})–>middleware('auth');

Route::get('/getUserLogin', function() {
	return Auth::user();
})–>middleware('auth');

Route::get('/messages', function() {
    return App\Models\Message::with('user')–>get();
})–>middleware('auth');

Route::post('/messages', function() {
   $user = Auth::user();

  $message = new App\Models\Message();
  $message->message = request()->get('message', '');
  $message->user_id = $user->id;
  $message->save();

  return ['message' => $message->load('user')];
})->middleware('auth');
```
Để app đơn giản mình sẽ không tạo controller mà thao tác trực tiếp trong route nhé.
*giải thích:

* route GET `/chat` để trả về view.
* route Get `/getUserLogin` mục đích trả về user hiện tại đang login
* route GET `/messages` mục đích lấy các messages trong database ra, đi kèm là thông tin user người gửi message đó.
* route POST `/messages` đơn giản là lưu tin nhắn do user gửi đi vào database.
Tạo thêm một route để Vue component có thể gọi và lấy dữ liệu chat ban đầu (lịch sử chat) lúc mới load trang.Quay trở lại Vue component `ChatLayout.vue` để thiết lập sự kiện gửi tin nhắn.

> Note: Nếu các bạn copy đoạn code PHP bên trên của mình và lúc chạy báo lỗi `syntax error, unexpected 'Route' (T_STRING)`, thì các bạn phải gõ tay lại nhé vì không hiểu sao code PHP copy từ Viblo về có kí tự đặc biệt hay sao đó :D

Quay lại file `ChatLayout.vue` ở ô input nhập tin nhắn các bạn sửa lại như sau:
```html
<div class="message-box">
    <input type="text" v-model="message" @keyup.enter="sendMessage" class="message-input" placeholder="Type message..."/>
    <button type="button" class="message-submit" @click="sendMessage">Send</button>
</div>
```
Ở đây khi người dùng bấm enter hoặc click vào button thì phương thức `sendMessage` sẽ được gọi. Chúng ta sẽ tạo phương thức `sendMessage` nhé, đồng thời chúng ta tạo luôn một phương thức để load các Message trong database mỗi lần truy cập nhé:
```html
<script>
import ChatItem from './ChatItem.vue'
export default {
    components: {
        ChatItem
    },
    data() {
        return {
            message: '',
            list_messages: []
        }
    },
    created () {
        this.loadMessage()
    },
    methods: {
        async loadMessage() {
            try {
                const response = await axios.get('/messages')
                this.list_messages = response.data
            } catch (error) {
                console.log(error)
            }
        },
        async sendMessage() {
            try {
                const response = await axios.post('/messages', {
                    message: this.message
                })
                this.list_messages.push(response.data.message)
                this.message = ''
            } catch (error) {
                console.log(error)
            }
        }
    }
} 
</script>
```
Giải thích chút: ở trên trong data mình tạo 2 thuộc tính 
* `message`: là đoạn message hiện thời mà user đang nhập trong input, 
* `list_messages`: là danh sách các tin nhắn lấy ra trong database mỗi khi lần đầu trang web được load lên. 
* 2 hàm trong methods mọi người đọc qua một sẽ hiểu, cũng không khó lắm, chú ý ở hàm `sendMessage()` sau khi gửi tin nhắn thành công thì mình sẽ push ngay nó vào `list_messages` để hiển thị.
* Đồng thời các bạn để ý mình dùng biến `this.$root.currentUserLogin`, mục đích lấy về user hiện tại đang login

Ta cùng thiết lập biến này ở `app.js` nhé.

`app.js`:
```javascript
const app = new Vue({
    el: '#app',
    data: {
        currentUserLogin: {}
    },
    created() {
        this.getCurrentUserLogin()
    },
    methods: {
        async getCurrentUserLogin() {
            try {
                const response = await axios.get('/getUserLogin')
                this.currentUserLogin = response.data
            } catch (error) {
                console.log(error)
            }
        }
    }
});
```
Ở đây các bạn có thể thấy chúng ta lấy message được truyền từ component `ChatLayout.vue` và hiển thị ra, đồng thời mình bind thẻ `span` chứa tên người gửi, nếu trùng với người đang login thì sẽ bôi `màu tím`

Ấy quên, phần truyền data từ `ChatLayout.vue` vào `ChatItem.vue` nữa, chúng ta quay lại file `ChatLayout.vue` và sửa một chút ở phần template nhé:
```html
<div class="messages-content">
    <ChatItem v-for="(message, index) in list_messages" :key="index" :message="message"></ChatItem>
</div>
```
Chú ý: vì chúng ta dùng `v-for` trực tiếp cho component nên bắt buộc chúng ta phải bind key cho chúng nhé. Key thế nào tuỳ các bạn nhưng đảm bảo là khác nhau với mỗi component `ChatItem` được render. Đồng thời ở trên mình có truyền vào component `ChatItem` props `message` để hiện thị.

Tiếp theo các bạn sửa lại 1 chút ở phần template của `ChatItem.vue` như sau để hiện thị đúng thông tin nhé:
```html
<template>
	<div class="message" :class="{'is-current-user': $root.currentUserLogin.id === message.user.id}">
		<div class="message-item user-name">
			{{ message.user.name}}
		</div>
		<div class="message-item timestamp">
			| {{ message.created_at.split(' ')[1] }}: 
		</div>
		<div class="message-item text-message">
			{{ message.message }}
		</div>
	</div>
</template>

<script>
	export default {
        props: {
          message: {
            type: Object,
            default: {}
          }
        }
    }
</script>
```

Ok thế là phần gửi tin nhắn và hiển thị cũng khá ổn rồi đó nhỉ, cùng test thôi nào nhé. Các bạn nhớ chạy lại:
```
php artisan serve

npm run watch
```
Sau đó ta mở `http://localhost:8000/chat` và xem nhé.

Bùm :collision::collision:, lỗi:

![](https://images.viblo.asia/221b2993-15c4-4ffa-8d8d-cebf229e444b.png)

Lỗi báo không tìm thấy class `Redis`, lí do là vì file `.env` khi nãy ta đã sửa `SESSION_DRIVER=redis` (lưu trạng thái user đăng nhập vào Redis, ban đầu nó là `file` - lưu trực tiếp vào memory). Các bạn mở file `config/app.php` kéo xuống tìm `alias` và bỏ comment khai báo class `Redis` đi là được nhé:
```php

'aliases' => [
    ...
    'Redis' => Illuminate\Support\Facades\Redis::class,
]
```

Chạy lên tiếp tục ta lại gặp lỗi, trời ơi lỗi gì lắm vậy trời :triumph::triumph:

![](https://images.viblo.asia/3b2cc820-42aa-472c-98bb-bc76ba4125c9.png)

Lỗi này Laravel báo ta thiếu PHP redis extension, mặc định Laravel dùng Redis thông qua extension `phpredis` cài trực tiếp vào hệ điều hành (cái này sẽ phức tạp), trong khi bài này ta dùng package `predis` của composer. Do vậy các bạn cần mở file `config/database.php` tìm tới `redis` đoạn `REDIS_CLIENT` sửa lại thành `predis` cho mình nhé:
```php
'redis' => [

        'client' => env('REDIS_CLIENT', 'predis'),
        
        ...
```
Ổn rổi đó giờ ta quay lại trình duyệt F5 là được nhé:

![](https://images.viblo.asia/0c3769c6-9090-41ed-a86e-a2849dc83c88.png)

Yeah hết lỗi rồi :D

Các bạn tạo 2 tài khoản, mở 2 tab và đăng nhập 2 tài khoản vào đó sau đó test chat thử nhé. (nhớ là sau khi login các bạn vào `http://localhost:8000/chat` nhé)

Các bạn có thể thấy là khi có user A gửi tin nhắn thì chỉ A mới thấy tin nhắn mình vừa gửi xuất hiện trên màn hình, còn B thì không, nhưng khi B F5 lại trình duyệt thì mới xuất hiện tin nhắn của A.

![](https://images.viblo.asia/5707f8b1-292b-4c33-912a-d4f527d225fa.png)


Đó là lúc chúng ta xử lý phần realtime cho ứng dụng này để khi A gửi tin B có thể nhìn thấy tin nhắn của A ngay lập tức mà không phải tải lại trang.
# IV. REAL TIME
Note quan trọng trước khi làm tiếp: mình nhắc lại để các bạn chú ý là ở bài này ta dùng Redis nên các bạn cần check lại xem các bạn đã cài redis chưa nhé. Ở terminal gõ `redis-cli` để check nhé ;)

Để xứ lý realtime chúng ta sử dụng `socket.io` và `laravel echo` nhé, cùng với đó chúng ta phải setup thêm `laravel echo server`

Cài đặt bằng cách chạy câu lệnh:
```
npm install --save laravel-echo
npm install -g laravel-echo-server
```

Chú ý: sau bước trên mà có bạn nào bị lỗi `Cannot find module 'node_modules/is-buffer/index.js' ` thì chạy lại `npm install` là được nhé.

Sau khi cài đặt xong ta vào file `resources/assets/js/bootstrap.js`, kéo xuống cuối bỏ comment và sửa lại như sau:
```javascript
import Echo from "laravel-echo"

window.Echo = new Echo({
    broadcaster: 'socket.io',
    host: window.location.hostname + ':6001'
});
```
Tiếp theo các bạn quay trở lại file `chat.blade.php` ta import thư viện `socket-io client` thông qua laravel echo server, bước này mà quên là không realtime đâu nha:
```html
....
    <div id="app">
		<chat-layout></chat-layout>
	</div>
	<script src="http://localhost:6001/socket.io/socket.io.js"></script>
    <script src="/js/app.js"></script>
.......
```
Tiếp theo chúng ta setup `laravel-echo-server` nhé. Ta chạy command:
```
laravel-echo-server init
```
Cứ yes và nhớ chọn `redis` nhé mọi người, xem hình của mình bên dưới:

![](https://images.viblo.asia/cff14e34-6a90-4a23-b92e-936bffd2b63a.png)

> Trong hình các bạn thấy rằng mình có chọn tạo clientID/Key và setup cả CORS cho Laravel Echo mục đích dành cho phần Bonus cuối bài nhé ;)

Tiếp theo ta thêm cuối vào file `.env` như sau:
```
LARAVEL_ECHO_SERVER_REDIS_HOST=127.0.0.1
LARAVEL_ECHO_SERVER_REDIS_PORT=6379
```
Phân tích một chút nhé. mỗi khi có một tin nhắn được gửi lên server, server sẽ fire một event gọi là `MessagePosted` sau đó sẽ broadcast event này đi cho các client khác đang kết nối tới, ở bên Vue chúng ta sẽ lắng nghe event này và lấy dữ liệu hiển thị.

Trước tiên ta cần kích hoạt `BroadcastServiceProvider`, các bạn mở file `config/app.php` kéo xuống phần `providers` bỏ comment dòng:
```php
    App\Providers\BroadcastServiceProvider::class,
```

Sau đó chúng ta sẽ cùng tạo một event là `MessagePosted`:
```
php artisan make:event MessagePosted
```
Chúng ta sửa lại file `App/Events/MessagePosted.php` như sau nhé:
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
use App\Models\Message;
use App\Models\User;

class MessagePosted implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public $message;
    public $user;

    public function __construct(Message $message, User $user)
    {
        $this->message = $message;
        $this->user = $user;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return ['chatroom'];
        // hoặc: return new Channel('chatroom');
    }
}
```
Ở đây chúng ta tạo ra một `public channel` tên là `chatroom`, event trả về thông tin gồm `message` và thông tin user gửi message đó.

Sửa lại một chút ở file `routes/web.php` để fire event cho các  mỗi lần có message gửi lên server nhé. Ta sửa Route `POST /messages` lại như sau:
```php
Route::post('/messages', function() {
    $user = Auth::user();

    $message = new App\Models\Message();
    $message->message = request()->get('message', '');
    $message->user_id = $user->id;
    $message->save();

    broadcast(new App\Events\MessagePosted($message, $user))->toOthers();
    return ['message' => $message->load('user')];
})->middleware('auth');
```
Ở đây mỗi khi có một user gửi message lên server, server sẽ fire event `MessagePosted` và sẽ broadcast cho các client khác, ta dùng phương thức `toOthers()` mục đích chỉ broadcast cho các client khác cập nhật còn chính user gửi thì không cần.

Giờ ta quay qua Vue component để lắng nghe event nhé (sắp xong rồi đó :)).

Ở `ChatLayout.vue` chúng ta sửa lại phương thức `created` như sau:
```javascript
created() {
    this.loadMessage()
    Echo.channel('chatroom')
    .listen('MessagePosted', (data) => {
        let message = data.message
        message.user = data.user
        this.list_messages.push(message)
    })
},
```
Ở đây khi các client khác lắng nghe thấy sự kiện `MessagePosted` được gọi, chúng sẽ lấy dữ liệu gửi về từ server và push vào mảng danh sách message.

Cuối cùng để mọi thứ có thể chạy được ta cần khởi động `laravel echo server`

ta chạy command sau: 
```
laravel-echo-server start
php artisan queue:work # chạy ở terminal khác
```
> Giải thích command `php artisan queue:work`: ở bài này chúng ta dùng `redis` như 1 queue (hàng đợi), khi user gửi tin nhắn mới, tin nhắn sẽ được đẩy vào queue, và command này có nhiệm vụ lấy các tin nhắn ở trong queue và gửi đi cho các users khác

OK ổn rồi đó, đến giờ test rồi nào :-D. Mở 2 tab trình duyệt, 1 chính 1 ẩn danh, hoặc nếu không muốn mở ẩn danh thì các bạn mở 1 loại trình duyệt khác cũng được.
![](https://images.viblo.asia/4fb70126-49d9-4011-9cf9-bd4702861c77.png)

…


VÂNGGGG, sau khi test vẫn không thấy có realtime gì hết, WTF??? Làm nãy giờ mờ cả mắt không ra cái gì @@. Tại saoooo??


Thử mở lại terminal nơi chạy `laravel-echo-server` thì thấy:

![laravel_echo_server](https://images.viblo.asia/942c0033-4336-4817-a50b-90923cd4298b.png)

Đã có event rồi mà nhỉ. Ôi DỪNG!!! tại sao tên channel lại là `laravel_database_chatroom`, cái này ở đâu ra vậy????? (khổ bài post này của mình từ thời 5.6 nên nhiều bạn đọc hay bị lỗi do phiên bản thay đổi, mình cứ phải sửa hoài cho kịp anh Taylor Otwell update Laravel :-D)

Sau 1 lúc tìm kiếm google thì mình đã hiểu được. Ở laravel bản mới (5.8), ở file `config/database.php` phần `redis` được thiết lập mặc định sẵn như sau:
```php
'redis' => [

        ......

        'options' => [
            ...
            'prefix' => Str::slug(env('APP_NAME', 'laravel'), '_').'_database_',
        ],
```
mọi kết nối tới redis đã được thêm tiền tố (prefix) như sau: tên app của bạn ở trong file `.env` nếu ko có lấy mặc định là `laravel` thêm `_database_`

OK đã hiểu, giờ ta chỉ cần quay lại file `ChatLayout.vue`, sửa lại chút ở `created`:
```js
created () {
  this.loadMessage()

  Echo.channel('laravel_database_chatroom')
  .listen('MessagePosted', (data) => {
      let message = data.message
      message.user = data.user
      this.list_messages.push(message)
  })
},
```

quay lại tab Chrome chính và xem kết quả, BOOM, tin nhắn đã tự load lên mà không phải tải lại trang hay làm gì cả, các bạn tự sướng thêm để thấy thêm được nhiều kết quả.

Dữ liệu được truyền qua websocket nên nếu bạn nào muốn xem cội nguồn của việc truyền gửi dữ liệu thì có thể bật tab chrome->network->WS, nếu không thấy có gì thì load lại trang nhé, các bạn sẽ thấy thông tin về websocket và các dữ liệu được truyền qua như thế nào.

![](https://images.viblo.asia/0e23d1d2-94a6-4a6e-94d4-4ee1e08e4705.png)

Phía terminal của laravel-echo-server nếu ổn phải nom như sau nhé (chú ý dòng `joined channel...`, phải có đoạn đó thì là user mới thực sự đã join vào channel và bắt đầu lắng nghe realtime nhé):

![](https://images.viblo.asia/9fd22c1d-6d78-4b4e-85f7-cc6a660c1007.png)
# V. Bonus
Tiếp theo tới phần này chúng ta sẽ hiển thị số users đang online nhé. Phần này chỉ hiển thị được số users, bao nhiêu users chứ không thể lấy được chi tiết từng user (user tên gì, email nào) vì bài này chúng ta dùng public channel, nếu muốn lấy thông tin chi tiết user ta cần dùng Presence Channel (các bạn xem các bài sau của mình nhé). Ok bắt đầu thôi nào :-D

Đầu tiên ta sửa lại file `resources/js/app.js` một chút ở `data` như sau:
```js
import laravelEchoServer from '../../laravel-echo-server.json'

data: {
        currentUserLogin: {},
        echoCredentials: {
            appId: laravelEchoServer.clients[0].appId, //  appId in laravel-echo-server.json
			key: laravelEchoServer.clients[0].key // key in laravel-echo-server.json
        }
    }

```

Tiếp theo ta quay lại file `ChatLayout.vue`, thêm vào 1 method như sau:
```js
getUsersOnline() {
    axios.get(`${window.location.protocol}//${window.location.hostname}:6001/apps/${this.$root.echoCredentials.appId}/channels/laravel_database_chatroom?auth_key=${this.$root.echoCredentials.key}`)
    .then(response => {
        this.usersOnline = response.data.subscription_count
    })
    .catch(e => console.log(e))
}
```

Vẫn ở `ChatLayout.vue`, ta thêm vào data 1 thuộc tính `usersOnline` để chỉ số users đang online như sau:
```js
data() {
    return {
        message: '',
        list_messages: [],
        csrfToken: '', // thêm csrftoken để lát ta sẽ dùng nó để logout
        usersOnline: 0
    }
},
```

Tiếp đó ở `mounted` ta thêm vào:
```js
// lấy giá trị csrfToken
this.csrfToken = document.head.querySelector('meta[name="csrf-token"]').content

setInterval(() => {
    this.getUsersOnline() // lấy số users online mỗi 3 giây (tuỳ chỉnh theo ý muốn)
}, 3000)
```
Sau đó thêm vào đầu `template` đoạn code sau để hiển thị nhé:
```html
<div class="users-online">
      <button type="button" class="btn btn-primary">
        Users online: <span class="badge badge-light">{{ usersOnline }}</span>
      </button>
    </div>
    <div class="btn-logout">
      <a
        class="btn btn-danger"
        href="/logout"
        onclick="event.preventDefault();document.getElementById('logout-form').submit();">
          Logout
      </a>
      <form id="logout-form" action="/logout" method="POST" style="display: none;">
        <input type="hidden" name="_token" :value="csrfToken">
      </form>
    </div>
```

Css mông má tí cho đẹp chứ nhỉ, thêm vào cuối thẻ `style` đoạn code sau nhé:
```css
.users-online {
    position: absolute;
    top: 20px;
    left: 50px;
    z-index: 3;
}
.btn-logout {
    position: absolute;
    top: 20px;
    right: 50px;
    z-index: 3;
}
```

Vậy là ổn rồi đó, quay lại trình duyệt check thôi nào:
![user_online](https://images.viblo.asia/cc1d3c0f-0abb-4c07-8922-4a2aaf0a9a8b.png)

Thử mở thêm tab mới login với account khác vào xem nhé các bạn ;)

Ở trang github của `laravel echo server` còn cung cấp thêm 1 số API khác để chúng ta lấy thêm thông tin ngoài số user đang online nữa nhé. Các bạn check ở [đây](https://github.com/tlaverdure/laravel-echo-server#http-api) nhé
# VI. DEMO

Các bạn có thể xem demo ở [đây nhé](https://public-chat.jamesisme.com/). Xem xong nhớ đọc phần kết luận bên dưới nhé các bạn ;)
# VII. Debug khi gặp lỗi
Mình để ý thấy có rất nhiều bạn gặp lỗi khi setup, và các bạn không biết nên check ở đâu tuỳ trường hợp, vậy nên mình viết thêm phần này để các bạn có thể xem và tự debug nhé.

Flow của app chúng ta như sau:
1. Sau khi Login -> User chuyển tới route /chat
2. User connect tới laravel-echo-server và join vào channel `laravel_database_chatroom`
3. Nếu mọi thứ oke thì ở terminal của laravel-echo-server phải thấy in ra `... joined channel...`
4. User nhập và bấm gửi tin nhắn -> gọi tới `routes/web.php`, api `/messages` (method POST) -> gọi `broadcast` event `MessagePosted`
5. Gọi vào `app\Events\MessagePosted.php`, chạy lần lượt qua `__construct` và `broadcastOn` ở đó
6. Tới đây message sẽ được đẩy vào Redis -> terminal phía `queue:work` thấy in ra log báo nhận được tin nhắn và tiến hành xử lý
7. Terminal phía laravel-echo-server báo nhận được message, event, channel và tiến hành broadcast ngược lại cho trình duyệt của những người khác

Nếu app của bạn chưa realtime, không chạy  như các bạn mong muốn, có bất kì lỗi gì, thì bạn cần check lại **lần lượt** tất cả các bước bên trên và đảm bảo là code đều chạy tới từng phần, bạn có thể để `Log:info` để log ra bất kì đoạn nào bạn thấy nghi ngờ, để đảm bảo chắc chắn là code có chạy vào đó nhé ;)
# VIII. Xin các bạn hãy nhớ lấy lời mình. Mình xin các bạn...
*20/12/2021*

Kể từ ngày viết bài này tới nay đã có rất nhiều bạn hỏi mình nhiều câu hỏi ối dồi ôi 🤣🤣, nên qua đây mình "dặn" các bạn luôn và chúng ta nhớ thật kĩ nhé ;):
- Chạy app lên thấy báo lỗi không connect được tới Redis `Redis 127.0.0.1:6379 connection refuse....`, trong khi rõ ràng đã làm theo bài cài `predis` các kiểu rồi. **Đáp**: các bạn ơiiiiiii, `predis` hay `phpredis` hay cái redis mà các bạn cài từ `composer instal redis....` thì nó là driver để connect tới Redis thôi - 1 thứ công cụ để từ code php các bạn có thể connect vào Redis chứ chúng không phải Redis. Các bạn cần phải chạy Redis trên máy của các bạn thì mới được. Việc chạy Redis trên Windows khá cực, giải pháp mình khuyên các bạn là dùng Docker nhé, 1 phát lên ngay không cần setup gì nhiều.
- Đọc blog đọc tới đọc hoài đọc lên đọc xuống mà lúc chạy lên mở Chrome Inspect xem Websocket thì thấy trống trơn không có gì, feeling bất lực 😢😢. **Đáp**: nếu mở sẵn Inspect và F5 lên xuống mà thấy cửa sổ Websocket ko có gì, thì khả năng rất cao là phần setup Laravel Echo ở frontend của các bạn có vấn đề. Check lại file `bootstrap.js` xem phần khởi tạo Laravel Echo đã đúng như trong bài và quan trọng nữa đó là các bạn **không nên** tự cài `laravel echo` (npm install laravel-echo) vì khả năng rất cao nó không tương thích với Laravel Echo Server của các bạn, mà các bạn nên dùng chung phiên bản mà Laravel Echo Server của các bạn đang dùng, ở file blade thêm vào như sau:
```html
<script src="http://localhost:6001/socket.io/socket.io.js"></script>
```
- "khi deploy production em cũng chạy `php artisan serve` được không anh?" 🙂. **Đáp**: không mọi ngừoi ơi, docs của Laravel đã nói rất là rõ rồi, `php artisan serve` nó chỉ giúp ta chạy 1 server để dev ở local thôi, nó không tối ưu và không nên chạy ở production. Khi deploy các bạn nên dùng apache hoặc nginx. Lời khuyên của mình là nên chọn nginx nhé.
- Local dùng XAMPP, deploy cũng dùng XAMPP, xong lên server các bạn hỏi là "ủa sao không thấy có UI" :). Các bạn đừng làm mình buồn nữa mà. **Đáp**: XAMPP cũng chỉ dành cho local thôi, đã deploy thì apache/nginx giúp mình nhé. Với cả lên server đừng đòi hỏi GUI bạn à, làm qua terminal thì lấy đâu ra :)
- "Mình bị lỗi không connect được tới database, máy chưa cài composer, chạy docker để làm gì nhỉ, windows không cài được redis,...." 🙂🙂🙂🙂🙂 đây thật sự là những câu "ối dồi ôi" nhất, muốn trầm cảm. **Đáp** những cái đó trên google có 1 tỉ lẻ 1 kết quả và nó không liên quan lắm tới bài này, các bạn nên chủ động trong việc tìm kiếm hơn chút chứ :)

> Một chút tâm sự khác: mình không hiểu sao nhưng các bạn mới học web, đặc biệt là các bạn PHP cứ không biết nghe ai bảo và đi setup virtual host và nó sinh ra rất nhiều vấn đề râu ria tốn ti tỉ thời gian. Lời khuyên là các bạn cứ dev localhost như bình thường, bao giờ muốn test domain thật thì các bạn dùng Ngrok hoặc LocalTunnel nhé, free, có HTTPS, rất nhanh và đặc biệt không lỗi linh tinh. 
Xong có bạn quen local dùng Virtual Host xong deploy production cũng lọ mọ hỏi mình setup virtual host ra sao (đã ra production thì làm gì còn "virtual" nữa các bạn ơi, nó phải "real" chứ 😊). Các anh leader nếu có đọc được thì em cũng gọi là xin các anh xem xét chút trước khi định form cả team dùng virtual host ạ  😊
# IX. The End

Đến đây mình đã kết thúc bài post này rồi, mong rằng qua bài này các bạn sẽ có thể hiểu được cách xây dựng ứng dụng realtime với `Laravel Echo` và `Socket.IO` như thế nào từ đó áp dụng vào các dự án thật.

Toàn bộ code có thể được xem ở đây nhé mọi người: [Source code](https://github.com/maitrungduc1410/public-channel-realtime-chat/tree/tutorial) (nhánh `tutorial` nhé)

Ở trong bài này mình dùng `public channel` trong Laravel. Khi dùng public channel: 1 user gửi tin nhắn sẽ được broadcast cho toàn bộ các user khác, và các user khác không cần xác thực (login), vẫn có thể nhận được. Có thể bạn sẽ thắc mắc: "Ô hay thế đoạn login ban đầu có rồi mà", thực ra bài này mình để login vào mục đích để lưu lại tin nhắn của từng user về sau hiển thị lại nếu user logout :-D.

Do đó khi làm thực tế thì thường ta sẽ cần xác thực user trước xem đã login, có quyền được nhận tin nhắn realtime từ user khác hay không,... và khi đó ta cần sử dụng tới `Private/Presence channel` trong Laravel. Các bạn theo dõi ở [bài tiếp](https://viblo.asia/p/xu-ly-private-channel-trong-ung-dung-chat-realtime-su-dung-laravel-vuejs-redis-socketio-laravel-echo-OeVKBRLrKkW) của mình nhé

Bài post của mình có thể có những thiếu sót, các bạn có thắc mắc thì cứ comment nhiệt tình nhé.

Cảm ơn các bạn đã theo dõi!
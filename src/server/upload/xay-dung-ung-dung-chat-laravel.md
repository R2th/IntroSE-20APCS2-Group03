*Bài viết này sẽ giúp các bạn xây dựng một ứng dụng chat Laravel với **Pusher**, với framework Javascript là **Vue.js***

Trước khi bắt đầu thực hiện, hãy xem qua ứng dụng này hoạt động như thế nào?
![](https://images.viblo.asia/0be4a971-bfd0-4f0d-a262-675e1c19430a.gif)
# Cài đặt Laravel
Chúng ta bắt đầu với việc tạo một project laravel với tên laravel-chat.
> composer create-project --prefer-dist laravel/laravel laravel-chat

Trước khi chúng ta bắt đầu sử dụng Laravel event broadcasting, trước tiên chúng ta cần phải đăng ký App \ Providers \ BroadcastServiceProvider. Trong thư mục config của project laravel vừa tạo, mở file app.php, tại phần của providers bỏ comment dòng sau:
```
// App\Providers\BroadcastServiceProvider::class,
```
Chúng ta cần phải nói với Laravel rằng chúng ta đang sử dụng trình điều khiển Pusher trong tệp .env:
```
// .env
BROADCAST_DRIVER=pusher
```
Mặc dù laravel có hỗ trợ cho Pusher, tuy nhiên chúng ta vẫn cần cài đặt Pusher PHP SDK. Có thể làm điều này với composer:
> composer require pusher/pusher-php-server
> 
Sau khi cài đặt xong, chúng ta cần cấu hình các thông tin ứng dụng Pusher ở trong file config / Broadcast.php. Để có thể sử dụng Pusher, cần có tài khoản Pusher.
# Cài đặt Pusher
Nếu bạn chưa có tài khoản, hãy tạo một tài khoản Pusher miễn phí tại [https://pusher.com/signup ](https://pusher.com/signup)rồi đăng nhập vào trang dashboard của bạn. Tại đây vào mục Channels apps, chọn create Channels app để tạo một ứng dụng mới.

Bây giờ, hãy điền thông tin cho ứng dụng Pusher. Mở tệp config / broadcast.php, bạn sẽ thấy Laravel đang lấy một số thông tin xác thực Pusher từ tệp .env:

```
'pusher' => [
     'driver' => 'pusher',
     'key' => env('PUSHER_APP_KEY'),
     'secret' => env('PUSHER_APP_SECRET'),
     'app_id' => env('PUSHER_APP_ID'),
     'options' => [
         'cluster' => env('PUSHER_APP_CLUSTER'),
         'encrypted' => true,
    ],
],
```
Chỉnh sửa lại tệp .env chứa thông tin đăng nhập ứng dụng Pusher với những thông tin tương ứng ở trong phần App keys của ứng dụng pusher đã tạo

![](https://images.viblo.asia/68b49c2f-3f17-4518-ae3f-18cab4b91523.png)

```
PUSHER_APP_ID=xxxxxx
PUSHER_APP_KEY=xxxxxxxxxxxxxxxxxxxx
PUSHER_APP_SECRET=xxxxxxxxxxxxxxxxxxxx
PUSHER_CLUSTER=xx
```
Bây giờ chúng ta đã thiết lập xong phần back-end của dự án, hãy chuyển sang thiết lập phần front-end.

Laravel cung cấp một số framework và thư viện front-end bao gồm Bootstrap, VueJs và Axios, những thứ chúng ta sẽ dùng trong project này.

Chúng ta cũng sử dụng laravel mix để giúp biên dịch Css và JavaScript.

Nhưng trước hết chúng ta cần cài đặt các dependencies này thông qua npm
> npm install

Để đăng ký và lắng nghe các sự kiện, Laravel cung cấp Laravel Echo, một thư viện JavaScript giúp dễ dàng hơn để đăng ký channels và lắng nghe các sự kiện được phát đi bởi laravel. Cần cài đặt nó cùng với thư viện JavaScript Pusher:
> npm install --save laravel-echo pusher-js
> 
Sau khi cài đặt, chúng ta cần phải thông báo cho Laravel Echo để sử dụng Pusher. Ở dưới cùng của file resources/assets/js/bootstrap.js, Laravel đã tích hợp Echo mặc dù nó đã được comment. Chỉ cần bỏ comment phần Echo Laravel và cập nhật các chi tiết như dưới đây:
```
import Echo from 'laravel-echo'

window.Pusher = require('pusher-js');

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: 'xxxxxxxxxxxxxxxxxxxx', // Pusher app key của bạn
    cluster: 'ap1',
    encrypted: true
});

```
Lưu ý thay thế chuỗi xx..x bằng Pusher app key của bạn. Cũng sử dụng cùng một cụm mà bạn đã chỉ định trước đó trong config / Broadcast.php.

Bây giờ chúng ta đã hoàn thành việc thiết lập Laravel và Pusher và các dependencies, đã đến lúc bắt đầu xây dựng ứng dụng chat của mình.

# Xác thực người dùng
Ứng dụng trò chuyện này sẽ yêu cầu người dùng đăng nhập trước khi họ có thể bắt đầu trò chuyện. Vì vậy, chúng ta cần một hệ thống xác thực, với Laravel ta chỉ cần chạy câu lệnh terminal đơn giản:
> php artisan make:auth
> 
Việc này sẽ tạo các route, view và controller cần thiết cho một hệ thống xác thực.

Trước khi chúng ta tiếp tục tạo người dùng, chúng ta cần chạy users migration cùng với một cài đặt mới của Laravel. Trước khi làm được điều này, cần thiết lập cơ sở dữ liệu. Mở file .env và nhập các thông tin chi tiết về cơ sở dữ liệu:
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE= //tên cơ sở dữ liệu
DB_USERNAME= //username của bạn
DB_PASSWORD= //mật khẩu của bạn
```
Cập nhật với các chi tiết cơ sở dữ liệu của riêng bạn. Bây giờ,  có thể chạy migration:
> php artisan migrate
> 
Có một lỗi trong Laravel 5.4 nếu bạn đang chạy một phiên bản MySQL cũ hơn 5.7.7 hoặc MariaDB cũ hơn 10.2.2. Điều này có thể được sửa bằng cách thay thế boot () của app / Providers / AppServiceProvider.php bằng: 
```
// app/Providers/AppServiceProvider.php

// remember to use
Illuminate\Support\Facades\Schema;

/**
 * Bootstrap any application services.
 *
 * @return void
 */
public function boot()
{
  Schema::defaultStringLength(191);
}
```

# Model Message và Migration
Tạo một model message cùng với tệp migration bằng cách chạy lệnh:
> php artisan make:model Message -m

Mở message model trong thư mục app và thêm vào đoạn code dưới đây:
```
// app/Message.php

/**
 * Fields that are mass assignable
 *
 * @var array
 */
protected $fillable = ['message'];
```
Trong thư mục database / migrations, mở bảng migration messages được tạo ra khi chạy câu lệnh trên và sửa phương thức up như sau:
```
Schema::create('messages', function (Blueprint $table) {
  $table->increments('id');
  $table->integer('user_id')->unsigned();
  $table->text('message');
  $table->timestamps();
});
```
Bảng message sẽ có năm cột: một cột tự động tăng id, user_id, message, created_at và updated_at. Cột user_id sẽ chứa id của người dùng đã gửi tin nhắn và cột tin nhắn sẽ chứa tin nhắn được gửi đi. Chạy migration:
> php artisan migrate
> 
# Quan hệ giữa User và Message
Chúng ta cần thiết lập quan hệ giữa một user và một message. Một người dùng có thể gửi rất nhiều tin nhắn trong khi một tin nhắn cụ thể được gửi đi bởi một người dùng.Như vậy quan hệ giữa bảng user và bảng message là quan hệ một nhiều. Để định nghĩa quan hệ trên, thêm đoạn code sau dưới model User:
```
// app/User.php

/**
 * A user can have many messages
 *
 * @return \Illuminate\Database\Eloquent\Relations\HasMany
 */
public function messages()
{
  return $this->hasMany(Message::class);
}
```
Tiếp theo, chúng ta cần xác định mối quan hệ nghịch đảo bằng cách thêm đoạn code sau dưới model Message:
```
// app/Message.php

/**
 * A message belong to a user
 *
 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
 */
public function user()
{
  return $this->belongsTo(User::class);
}
```
# Định nghĩa routes
Hãy tạo các routes mà ứng dụng chat cần đến. Mở tệp routes / web.php và thay thế bằng đoạn code dưới đây để định nghĩa ba routes cơ bản:
```
// routes/web.php

Auth::routes();

Route::get('/', 'ChatsController@index');
Route::get('messages', 'ChatsController@fetchMessages');
Route::post('messages', 'ChatsController@sendMessage');
```
Trang chủ sẽ hiển thị tin nhắn và ô input để nhập tin nhắn mới. Route GET messages sẽ tải tất cả các tin nhắn và route POST messages sẽ dùng cho việc gửi tin nhắn mới. 
**CHÚ Ý:** Vì chúng ta đã xóa route /home nên cần phải chỉnh sửa lại đường dẫn tới trang chủ trong hai file app/Http/Controllers/Auth/LoginController.php và app/Http/Controllers/Auth/RegisterController.php thành:
```
protected $redirectTo = '/';
```
# ChatsController
Bây giờ hãy tạo một controller để xử lý logic của ứng dụng chat. Tạo một ChatsController với lệnh dưới đây:
> php artisan make:controller ChatsController
> 
Mở file app/Http/Controllers/ChatsController.php vừa tạo và thêm vào đoạn code dứới đây:
```
// app/Http/Controllers/ChatsController.php

use App\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

public function __construct()
{
  $this->middleware('auth');
}

/**
 * Show chats
 *
 * @return \Illuminate\Http\Response
 */
public function index()
{
  return view('chat');
}

/**
 * Fetch all messages
 *
 * @return Message
 */
public function fetchMessages()
{
  return Message::with('user')->get();
}

/**
 * Persist message to database
 *
 * @param  Request $request
 * @return Response
 */
public function sendMessage(Request $request)
{
  $user = Auth::user();

  $message = $user->messages()->create([
    'message' => $request->input('message')
  ]);

  return ['status' => 'Message Sent!'];
}

```
Sử dụng auth middleware trong phương thức khởi tạo của ChatController thể hiện rằng tất cả các phương thức với controller sẽ chỉ có thể được truy cập bởi người dùng có quyền. Tiếp đến hàm index() sẽ trả về một giao diện mà chúng ta sẽ tạo ngay sau đây. fetchMessage() sẽ trả về một JSON của tất cả các tin nhắn theo người dùng. Cuối cùng, sendMessage () sẽ lưu tin nhắn vào cơ sở dữ liệu và trả về một trạng thái của tin nhắn.
# Tạo giao diện của ứng dụng chat
Đối với giao diện của ứng dụng chat. Chúng ta sử dụng [Bootsnipp chat snippet ](https://bootsnipp.com/snippets/featured/collapsible-chat-widget) với một số ít sửa đổi.

Tạo một file resources/views/chat.blade.php mới và dán đoạn code này vào:
```
<!-- resources/views/chat.blade.php -->

@extends('layouts.app')

@section('content')

<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">Chats</div>

                <div class="panel-body">
                    <chat-messages :messages="messages"></chat-messages>
                </div>
                <div class="panel-footer">
                    <chat-form
                        v-on:messagesent="addMessage"
                        :user="{{ Auth::user() }}"
                    ></chat-form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
```
Lưu ý rằng có một số thẻ tùy chỉnh đối với giao diện chat, đây là những thành phần Vue được tìm hiểu ở phần sau. Thành phần chat-messages sẽ hiển thị tin nhắn chat và chat-from cung cấp một ô input cùng một nút để gửi tin nhắn đi.

Trước khi đi tạo phần Vue, hãy thêm styles cho giao diện chat. Mở file resources/views/layouts/app.blade.php(được tạo khi chạy câu lệnh make:auth) và thêm đoạn code dưới đây sau link styles:
```
<!-- resources/views/layouts/app.blade.php -->

<style>
  .chat {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .chat li {
    margin-bottom: 10px;
    padding-bottom: 5px;
    border-bottom: 1px dotted #B3A9A9;
  }

  .chat li .chat-body p {
    margin: 0;
    color: #777777;
  }

  .panel-body {
    overflow-y: scroll;
    height: 350px;
  }

  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    background-color: #F5F5F5;
  }

  ::-webkit-scrollbar {
    width: 12px;
    background-color: #F5F5F5;
  }

  ::-webkit-scrollbar-thumb {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #555;
  }
</style>
```
Nhìn vào file resources/assets/js/bootstrap.js bạn sẽ thấy Laravel đã thiết lập sẵn một số front-end dependencies (jQuery, Bootstrap, Lodash, Vue, Axios, Echo). Chúng ta có thể bắt đầu sử dụng Vue mà không cần cài đặt thêm.

Tạo một file mới ChatMessages.vue trong resources/assets/js/components và dán vào đoạn code dưới đây:
```
// resources/assets/js/components/ChatMessages.vue

<template>
    <ul class="chat">
        <li class="left clearfix" v-for="message in messages">
            <div class="chat-body clearfix">
                <div class="header">
                    <strong class="primary-font">
                        {{ message.user.name }}
                    </strong>
                </div>
                <p>
                    {{ message.message }}
                </p>
            </div>
        </li>
    </ul>
</template>

<script>
  export default {
    props: ['messages']
  };
</script>
```
Thành phần này nhận một mảng các tin nhắn như props, lặp , hiển thị tên của người dùng đã gửi tin nhắn và nội dung tin nhắn.

Tiếp theo tạo một file ChatForm.vue trong thư mục resources/assets/js/components và dán vào đoạn code dưới đây.
```
// resources/assets/js/components/ChatForm.vue

<template>
    <div class="input-group">
        <input id="btn-input" type="text" name="message" class="form-control input-sm" placeholder="Type your message here..." v-model="newMessage" @keyup.enter="sendMessage">

        <span class="input-group-btn">
            <button class="btn btn-primary btn-sm" id="btn-chat" @click="sendMessage">
                Send
            </button>
        </span>
    </div>
</template>

<script>
    export default {
        props: ['user'],

        data() {
            return {
                newMessage: ''
            }
        },

        methods: {
            sendMessage() {
                this.$emit('messagesent', {
                    user: this.user,
                    message: this.newMessage
                });

                this.newMessage = ''
            }
        }    
    }
</script>
```
ChatForm hiển thị một ô inpul và một nút gửi. Nó chấp nhận người dùng đã xác thực như props. Nó chứa dữ liệu newMessage đã được nhập trong ô input. Khi click vào nhút gửi hoặc nhấn phím enter, nó gọi đến phương thức sendMessage(). sendMessage () chỉ đơn giản là kích hoạt một sự kiện messagesent chạy dọc theo tin nhắn đã được gửi bởi user đến root vue instance (nơi xử lý việc gửi tin đi thực sự) và cuối cùng clear ô input đó.

Tiếp theo, chúng ta cần đăng ký các thành phần trong root vue instance. Mở file resources/assets/js/app.js và thay vào đoạn code dưới đây:
```
// resources/assets/js/app.js

require('./bootstrap');

Vue.component('chat-messages', require('./components/ChatMessages.vue'));
Vue.component('chat-form', require('./components/ChatForm.vue'));

const app = new Vue({
    el: '#app',

    data: {
        messages: []
    },

    created() {
        this.fetchMessages();
    },

    methods: {
        fetchMessages() {
            axios.get('/messages').then(response => {
                this.messages = response.data;
            });
        },

        addMessage(message) {
            this.messages.push(message);

            axios.post('/messages', message).then(response => {
              console.log(response.data);
            });
        }
    }
});
```
Một vue instance đã được khởi tạo, sử dụng Axios, chúng ta tạo một GET request đến route messages, tìm nạp tất cả tin nhắn và đưa vào trong một mảng, chúng sẽ được hiển thị trên giao diện chat. addMessage () nhận được tin nhắn từ ChatForm, đẩy chúng vào mảng tin nhắn và thực hiện một POST request tới messages route cùng với tin nhắn.

# Phát đi sự kiện gửi tin nhắn.
Để thêm tương tác thời gian thực vào trong ứng dụng chat, ta cần phát đi một số loại sự kiện dựa trên một số hành động. Trong trường hợp này chúng ta sẽ kích họat MessageSent trong khi người dùng gửi đi tin nhắn. Đầu tiên cần tạo sự kiện MessageSent
> php artisan make:event MessageSent
> 
Nó tạo ra một classs MessageSent trong thư mục app/Events. Class này phải implement interface ShouldBroadcast:
```
// app/Events/MessageSent.php

use App\User;
use App\Message;
use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class MessageSent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * User that sent the message
     *
     * @var User
     */
    public $user;

    /**
     * Message details
     *
     * @var Message
     */
    public $message;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(User $user, Message $message)
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
        return new PrivateChannel('chat');
    }
}
```
Chúng ta định nghĩa hai thuộc tính public sẽ được chuyển đến kênh mà chúng ta phát tới.

**Lưu ý**:  Thuộc tính bắt buộc phải ở chế độ public thì mới có thể chuyển đến kênh.

Cần phải tạo một kênh chat ở chế độ private, chỉ người dùng được xác thực mới có thể kết nối đến. Khi sử dụng PrivateChannel class ta sẽ không phải thêm tiền tố private trước tên kênh. Laravel sẽ tự động hiểu được điều này.

Tiếp đến là cập nhật phương thức sendMessage() của ChatsController để phát sự kiện MessageSent
```
// app/Http/Controllers/ChatsController.php

//remember to use
use App\Events\MessageSent;

/**
 * Persist message to database
 *
 * @param  Request $request
 * @return Response
 */
public function sendMessage(Request $request)
{
  $user = Auth::user();

  $message = $user->messages()->create([
    'message' => $request->input('message')
  ]);

  broadcast(new MessageSent($user, $message))->toOthers();

  return ['status' => 'Message Sent!'];
}

```
Cần chỉnh sửa file routes/channels.php như dưới đây để chắc chắn rằng chỉ nguời dùng được xác thực mới có thể lắng nghe kênh chat ở chế độ private:
```
// routes/channels.php

Broadcast::channel('chat', function ($user) {
  return Auth::check();
});
```
Chuyển sang phương thức channel(), truyền vào tên của kênh cùng hàm callback(). Nó sẽ trả và giá trị true hoặc false tùy vào việc người dùng có được xác thực hay không.

Bây giờ, khi một tin nhắn được gửi đi, sự kiện MessageSent sẽ được phát tới Pusher. Chúng ta sử dụng phương thức toOthers () cho phép loại trừ người dùng hiện tại khỏi người nhận của chương trình phát sóng.
# Lắng nghe sự kiện gửi tin nhắn
Một sự kiện MessageSent được gửi đi, cần lắng nghe sự kiện đó để có thể cập nhật được những tin nhắn mới nhất. Có thể làm vậy bằng cách thêm đoạn code dưới đây vào hàm create() của file resources/assets/js/app.js, ngay sau this.fetchMessages()
```
// resources/assets/js/app.js

Echo.private('chat')
  .listen('MessageSent', (e) => {
    this.messages.push({
      message: e.message.message,
      user: e.user
    });
  });
```
Đăng ký kênh chat bằng phương thức private() của Echo vì đây là một kênh private. Mỗi lần đăng ký, lắng nghe sự kiện MessageSent và từ đó có thể cập nhật những tin nhắn mới nhất. 

Trước khi chạy thử ứng dụng này cần biên dịch các tệp JavaScript sử dụng Laravel Mix:
> npm run dev
> 
Bây giờ có thể chạy ứng dụng với câu lệnh:
> php artisan serve
> 
Ứng dụng của chúng ta đã hoàn thiện và bạn có thể gửi và nhận tin nhắn thời gian thực!

Bạn có thể có source code của ứng dụng ở link sau: [https://github.com/ammezie/laravel-chat](https://github.com/ammezie/laravel-chat)
> Tài liệu tham khảo: [https://pusher.com/tutorials/chat-laravel/](https://pusher.com/tutorials/chat-laravel/)
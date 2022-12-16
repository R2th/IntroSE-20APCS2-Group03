# Lời mở đầu
* Với Laravel chúng ta có thể dễ dàng xây dựng những ứng dụng realtime một cách dễ dàng bằng việc sử dụng **event broadcasting** cho phép chúng ta phát và nghe event giữa server-side và phía Javascript client-side.
* Bên cạnh đó, Laravel cũng hỗ trợ  **Pusher**, một platform đơn giản và đáng tin cậy cho việc xây dựng một ứng dụng realtime linh hoạt dễ mở rộng, được đông đảo cộng đồng Laravel sử dụng.
* Trong bài viết này, mình sẽ trình bày các bước chi tiết để xây dựng lên một ứng dụng chat với Laravel và Pusher. Phía Front end mình sử dụng framwork JavaScript là Vue.js
* Trước khi bắt đầu chúng ta hãy xem qua ứng dụng mà chúng ta sẽ xây dựng:

    ![](https://images.viblo.asia/4c59326a-b906-4ab8-81c6-ea4e4a01c723.gif)

# Bắt đầu
## Setting Up Laravel
* Tạo một project Laravel với tên là `laravel-chat` bằng composer:
    ```
    composer create-project --prefer-dist laravel/laravel laravel-chat
    ```
* Muốn sử dụng **laravel event broadcasting**,  trước tiên chúng ta phải đăng kí `App\Providers\BroadcastServiceProvider`. Mở file `config/app.php` và bỏ comment dòng sau trong `providers`
    ```php
    // App\Providers\BroadcastServiceProvider
    ```
* Tiếp theo chúng ta phải nói cho Laravel biết rằng chúng ta sử dụng Pusher driver. Trong file `.env`:
    ```php
    // .env

    BROADCAST_DRIVER=pusher
    ```
* Mặc dù Laravel đã hỗ trợ Pusher tuy nhiên chúng ta vẫn phải cài đặt **Pusher PHP SDK**. Chúng ta sẽ cài đặt thông qua composer:
    ```
    composer require pusher/pusher-php-server
    ```
## Setting Up Pusher
**1.  Phía backend**
* Sau khi install hoàn tất, chúng ta cần config những thông tin xác thực cho ứng dụng Pusher ở trong file config/broadcasting.php.
* Để có được những thông tin xác thực cho ứng dụng Pusher, chúng ta phải có tài khoản Pusher.
* Chúng ta tạo một tài khoản Pusher free tại đây [https://pusher.com/signup](https://pusher.com/signup), sau khi login chúng ta tạo một ứng dụng với Pusher, sau khi tạo thành công chúng ta sẽ có thông tin xác thực cho ứng dụng của bạn (vào tab Overview, kéo xuống phần key)
* Lấy những thông tin xác thực cho ứng dụng và điền vào file .env
```php
// .env

PUSHER_APP_ID=xxxxxx
PUSHER_APP_KEY=xxxxxxxxxxxxxxxxxxxx
PUSHER_APP_SECRET=xxxxxxxxxxxxxxxxxxxx
PUSHER_CLUSTER=xx
```
* Ở file `config/broadcasting.php`, Laravel sẽ lấy những thông tin xác thực trên từ file .env:
```php
// Don't add your credentials here!
// config/broadcasting.php

'pusher' => [
  'driver' => 'pusher',
  'key' => env('PUSHER_APP_KEY'),
  'secret' => env('PUSHER_APP_SECRET'),
  'app_id' => env('PUSHER_APP_ID'),
  'options' => [],
],
```
Chúng ta sẽ thêm một chút vào đoạn code trên:
```php
'pusher' => [
      'driver' => 'pusher',
      'key' => env('PUSHER_APP_KEY'),
      'secret' => env('PUSHER_APP_SECRET'),
      'app_id' => env('PUSHER_APP_ID'),
      'options' => [
          'cluster' => env('PUSHER_CLUSTER'),
          'encrypted' => true,
      ],
  ],
```
**2. Phía Frondend**
* Trước tiên chúng ta tải về các dependencies thông qua npm
    ```
    npm install
    ```
* Để lắng nghe events, Laravel cung cấp cho chúng ta **Laravel Echo**, là một thư viện Javascript giúp dễ dàng đăng kí channels và lắng nghe những event được broadcast bởi Laravel. Chúng ta cần tải về nó cùng với thư viện **Pusher JavaScript**
    ```
    npm install --save laravel-echo pusher-js
    ```
* Sau khi đã install, chúng ta cần nói cho Laravel Echo rằng chúng ta sử dụng Pusher.
Mở file `resources/assets/js/bootstrap.js`, ta sẽ thấy Laravel đã tích hợp Echo. Chúng ta bỏ comment phần Laravel Echo và thêm vào một số thông tin của Pusher:
    ```js
    // resources/assets/js/bootstrap.js

    import Echo from "laravel-echo"

    window.Echo = new Echo({
        broadcaster: 'pusher',
        key: 'xxxxxxxxxxxxxxxxxxxx',
        cluster: 'eu',
        encrypted: true
    });
    ```
    Key ở đây là Pusher app key còn cluster bạn sử dụng cluster đã khai báo phía trên trong file `config/broadcasting.php`.
* Đến đây chúng ta đã xong xuôi phần setting Laravel và Pusher. Hãy bắt đầu xây dựng ứng dụng chat realtime nào.
## Authenticating Users
* Ứng dụng của chúng ta sẽ yêu cầu người dùng đăng nhập trước khi bắt đầu chat. Do đó ta cần authentication. Với Laravel chỉ cần chạy câu lệnh đơn giản này để tạo ra những routes, view, controllers cần thiết cho việc authen.
    ```php
    php artisan make:auth
    ```
* Mở file .env và kết nối database:
    ```
    // .env

    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=laravel-chat
    DB_USERNAME=root
    DB_PASSWORD=root
    ```
* Chạy migration
    ```php
    php artisan migrate
    ```
## Message Model and Migration
* Tạo model `Message` cùng với file migration:
    ```php
    php artisan make:model Message -m
    ```
* Trong file model Message.php:
    ```php
    // app/Message.php

    /**
     * Fields that are mass assignable
     *
     * @var array
     */
    protected $fillable = ['message'];
    ```
* Trong file migration (nằm trong thư mục database/migrations) cho bảng message, trong phương thức `up`:
 
    ```php
    Schema::create('messages', function (Blueprint $table) {
      $table->increments('id');
      $table->integer('user_id')->unsigned();
      $table->text('message');
      $table->timestamps();
    });
    ```
Bảng message sẽ có 5 cột: id, user_id lưu Id của user gửi message, cột message lưu nội dung message, created_at và updated_at.
* Chạy migration để tạo bảng
    ```php
    php artisan migrate
    ```
## User To Message Relationship
* Một user có thể gửi nhiều message và một message chỉ được gửi bởi một user.
Mối quan hệ giữa user và message là mối quan hệ một - nhiều.
* Trong model User:
    ```php
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
* Trong model Message:
    ```php
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

## Defining App Routes
* Mở file `route/web.php` và định nghĩa những route như sau:
    ```php
    // routes/web.php

    Auth::routes();

    Route::get('/', 'ChatsController@index');
    Route::get('messages', 'ChatsController@fetchMessages');
    Route::post('messages', 'ChatsController@sendMessage');
    ```
* Route GET messages sẽ lấy ra tất cả các message chat và route POST messages sẽ sử dụng để gửi một message mới.
## ChatsController
* Bây giờ chúng ta sẽ tạo các controller để xử lý logic cho ứng dụng của chúng ta. Tạo một `ChatsController` với câu lệnh:
    ```php
    php artisan make:controller ChatsController
    ```
* Mở file `app/Http/Controllers/ChatsController.php` vừa mới tạo ra, và viết đoạn code sau:
    ```php
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
* Trong hàm `contruct()` sử dụng middleware `auth` để chỉ định rằng tất cả các phương thức trong controller chỉ được access bởi user đã đăng nhập.
* Phương thức `fetchMessages()` trả về một JSON tất cả các mesage cùng user sở hữu message đó.
* Phương thức `sendMessage()` sẽ lưu message vào database và trả về trạng thái gửi message.
## Creating The Chat App View
* Về phía view cho ứng dụng, chúng ta sẽ sử dụng [Bootsnipp chat snippet](https://bootsnipp.com/snippets/9njj) với một vài tùy chỉnh.
* Tạo một file `resources/views/chat.blade.php` với nội dung:
    ```php
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
* ở đây chúng ta include 2 Vue component: `chat-message`  sẽ dùng để hiển thị tất cả message  và `chat-form` sẽ cung cấp một trường input và một button để gửi message.
* Tạo component `ChatMessages.vue` trong thư mục `resources/assets/js/components` với nội dung:
    ```js
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
    Component này nhận vào một `props` là array messages.
* Tiếp theo chúng ta tạo một component `ChatForm.vue`, cũng trong thư mục `resources/assets/js/components`:
    ```js
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

    ChatForm component nhận vào props là user đã đc authen.
    Khi nút send được click, component này sẽ emit một sự kiện `sendMessgage` tới root Vue instance.
* Tiếp theo chúng ta cần khai báo các component con này ở root Vue instance. Mở file `resources/assets/js/app.js` và viết đoạn code sau:
    ```js
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
* Khi Vue instance `created`, chúng ta dùng **axios** tạo một request GET tới `route messages` để lấy ra tất cả các messages rồi gán nó vào mảng messages hiển thị trên view.
* Method `addMessage` nhận vào message mà đc emit từ `ChatForm` component, thưc hiện `push` message đó vào mảng `messages` và thực hiện một request POST tới route mesages.
## Broadcasting Message Sent Event
* Để realtime cho ứng dụng, chúng ta cần broadcast (phát sóng) những event (sự kiện). Ở đây chúng ta phát ra sự kiện `MessageSent` khi một người dùng gửi một Message.
* Trước tiên ta tạo event MessageSent (trong thư mục app/Events)
    ```php
    php artisan make:event MessageSent
    ```
* Class MessageSent phải `implement` interface `ShouldBroadCast`:
    ```php
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
* Ở đây chúng ta định nghĩa 2 property **pubic** là `$user` và `$message`, chính là dữ liệu chúng ta sẽ truyền tới `chanel` mà chúng ta phát sóng tới.

*Note: Những property này phải để là  public*

* Ta chú ý vào hàm `broadcastOn()` khai báo trong event. Bởi vì ứng dụng của chúng ta là một authenticated-only app, chúng ta sẽ tạo một **private channel** với tên là `Chat` mà chỉ những user đã đăng nhập mới có thể kết nối đến.
* Cuối cùng, ta phải có chỗ thực hiện hành động phát sóng sự kiện, đó là ở trong hàm `sendMessage()` của controller `ChatsController`:
    ```php
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
* Cũng bởi vì ta tạo một private channel, chỉ những user đăng nhập mới có thể lắng nghe channel `Chat`. Do đó chúng ta cần một cách để authorize rằng chỉ những user  hiện tại đang đăng nhập mới có thể lắng nghe kênh. Ta thực hiện ở trong file `routes/channels.php`
    ```php
    // routes/channels.php

    Broadcast::channel('chat', function ($user) {
      return Auth::check();
    });
    ```
* Chúng ta truyền vào hàm channel() tên của kênh và một hàm callback mà trả về true hay false dựa trên trạng thái đăng nhập hiện tại của user.
* Như vậy bây giờ khi message được gửi đi, Sự kiện `MessageSent` sẽ được phát sóng (broadcast) tới `Pusher`. Chúng ta sử dụng `toOthers()` để cho phép loại trừ người dùng hiện tại ra khỏi danh sách người nhận phát sóng.
## Listening For Message Sent Event
* Một khi sự kiện MessageSent được phát sóng, chúng ta cần lắng nghe sự kiện này để chúng ta cập nhật mảng messages với message mới vừa đc gửi.
*  Trong file `resources/assets/js/app.js` chúng ta thêm vào hàm `created()` ngay sau `this.fetchMessages()` đoạn code sau:
    ```js
    // resources/assets/js/app.js

    Echo.private('chat')
      .listen('MessageSent', (e) => {
        this.messages.push({
          message: e.message.message,
          user: e.user
        });
      });
    ```
* Vì channel ở đây là `private channel`, chúng ta `subscribe` (đăng kí) kênh `Chat` sử dụng phương thức `private()` của `Echo`. Khi đã subscribe kênh, chúng ta sẽ lắng nghe đc sự `MessageSent` và mỗi lần có message mới sẽ thực hiện push nó vào mảng `messages`.
* Compile các file JavaScript sử dụng Laravel Mix:
    ```js
    npm run dev
    ```
* Start ứng dụng:
    ```php
    php artisan serve
    ```
* Đến đây ứng dụng của chúng ta đã hoàn tất và giờ đây chúng ta có thể gửi và nhận message với thời gian thực.
# Kết luận
Bạn có thể thấy việc xây dựng một ứng dụng realtime với Laravel và Pusher đơn giản như thế nào. Qua bài viết này mình mong các bạn biết được được luồng của việc xây dựng ứng dụng trên, từ việc phát event phía server, phát sóng bằng Pusher đến bên client lắng nghe event với Echo ...Và với Pusher bạn có thể xây dựng bất kì ứng dụng tương tác thời gian thực nào. Vậy thì còn ngại ngần gì mà không tạo một tài khoản [Pusher](https://dashboard.pusher.com/accounts/sign_up) free và tạo nên một ứng dụng tuyệt vời của bạn nào.
Tài liệu tham khảo:
* https://laravel.com/docs/5.8/broadcasting 
* https://pusher.com/tutorials/chat-laravel#setting-up-pusher
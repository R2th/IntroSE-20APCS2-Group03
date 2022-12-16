Có khi nào bạn nghĩ đến việc tự xây dựng cho mình một ứng dụng có khả năng nhắn tin như Facebook Messenger, Zalo...Đối với bản thân mình suy nghĩ này xuất phát từ những ngày mình biết đến Laravel có một phần rất hay là Broadcasting. Với việc sử dụng những tính năng của Laravel như là Event, Broadcatsting mình đã có thể dễ dàng tạo nên ứng dụng nhắn tin đơn giản.
# 1. Broadcast là gì?
Đối với mình là một sinh viên chuyên ngành Điện tử - Viễn thông đá chéo sân sang Công nghệ thông tin thì một số định nghĩa như broadcast, multicast, unicast... trong truyền nhận dữ liệu là cũng không phải quá xa lạ. Trong bài viết này, mình sẽ nói về broadcast để tạo nên ứng dụng như mình nói ở trên.<br>
Với từ khóa đơn giản **"Broadcast là gì?"**, mình có thể tìm ra một định nghĩa tương đối chi tiết và dễ hiểu ngay trang đầu kết quả tìm kiếm. Hãy đọc định nghĩa sau của Wikipedia để xem bạn hiểu gì về broadcast nhé.


> Broadcast là thuật ngữ được sử dụng trong mạng máy tính để mô tả cách thức truyền tin được gửi từ 1 điểm đến tất cả các điểm khác trong cùng một mạng. Trong trường hợp này, một gói broadcast chuyển đến tất cả những thiết bị tham gia trong một mạng cục bộ, mà không cần phải được quy định rõ ràng như một máy nhận.
# 2. Trong Laravel thì Broadcast sẽ như thế nào?
Đối với các hệ thống ứng dụng web hiện đại như bây giờ để cập nhật, tương tác một cách trực tiếp với thời gian thực là một yêu cầu tất yếu. Chúng ta không thể cứ mỗi lần nhận được một tin nhắn mới từ người khác mà hệ thống là tự động tải lại trang. Việc tải lại như vậy sẽ gây khó chịu rất lớn đối với phía người dùng. Hiện nay để thực hiện các ứng dụng thời gian thực, người ta thường sử dung WebSocket. Thông qua việc sử dụng WebSocket thì một khi dữ liệu được cập nhật trên máy chủ các thông điệp này sẽ được gửi qua kết nối WebSocket để hiển thị ở máy khách.

Đối với Laravel, bạn có thể dễ dàng xây dựng một ứng dụng có khả năng quảng bá qua kết nối WebSocket. Việc quảng bá các sự kiện trong Laravel cho phép bạn chia sẻ các tên sự kiện giống nhưu giữa máy chủ và ứng dụng JavaScript ở phía máy khách. Để có thể hiểu rõ về sự kiện quảng bá, bạn nên đọc tài liệu liên quan đến Laravel events và listeners.
# 3. Tiến hành xây dựng ứng dụng
Laravel cung cấp một số driver broadcast như: Pusher, Redis. Trong nội dung của bài viết, mình sẻ sử dụng Pusher. Để hiểu thêm về Pusher, bạn có thể truy cập [tại đây](https://pusher.com/).
## Tạo key ứng dụng trên Pusher
Việc tạo tài khoản cũng như tạo một ứng dụng trên Pusher mình sẽ không cần thiết đưa ra chi tiết ở đây. Bạn hãy tự tạo một ứng dụng của riêng mình nhé.

Sau khi đã tạo được một ứng dụng trên Pusher rồi, ban hãy quan tâm đến phần App Keys nhé, đây chính là chìa khóa quan trọng cho ứng dụng của bạn đấy. Một phần mình quan tâm nữa là Debug Console, phần này sẽ vô cùng hữu ích trong việc kiểm tra ứng dụng của bạn đang chạy thế nào đấy, chi tiết thì mình sẽ thể hiện ở phần sau của bài viết này.
## Cấu hình trong Laravel
Để sử dụng broadcast, bạn cần truy cập đến `config/app.php` và bỏ ghi chú của dòng sau đây:

`App\Providers\BroadcastServiceProvider::class,`

Các cấu hình liên quan đến broadcast được lưu trữ trong `config/broadcasting.php`.

Trong ứng dụng này thì Laravel Echo sẽ cần để truy cập đến mã CSRF hiện tại của phiên làm việc, vì vậy, bạn hãy nhớ thêm thẻ `meta` với nội dung như sau: `<meta name="csrf-token" content="{{ csrf_token() }}">`.

**Lưu ý:** Nếu trình duyệt của bạn đang sử dụng các extension chặn quảng cáo thì nên tắt nó đi. Vì nó sẽ chặn luôn việc truy nhập ứng dụng đấy (khocmotdongsong).
## Cài đặt
Bạn có thể sử dụng composer để cài đặt Pusher PHP SDK  cho ứng dụng của mình.

`composer require pusher/pusher-php-server`

Sau khi đã tạo ứng dụng trên Pusher cũng như cài đặt SDK thì bạn cần tiến hành cấu hình cài đặt trong Laravel như sau:

* Trong `.env`, bạn hãy khai báo các key được tạo ra trên Pusher và khai báo driver là pusher như sau:
```
BROADCAST_DRIVER=pusher
PUSHER_APP_ID=yourappid
PUSHER_APP_KEY=yourappkey
PUSHER_APP_SECRET=yourappsecret
PUSHER_APP_CLUSTER=yourcluster
```
* Còn đây là cấu hình trong `config/broadcasting.php`:
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
## Giao diện
Với đoạn code sau bạn có được một giao diện đơn giản là hiển thị nội dung chat và form cho khả năng nhập nội dung chat.
```
@extends('layouts.app')

@section('content')
    <div class="panel panel-primary" id="chat-box">
        @foreach ($messages as $message)
            <div class="panel-heading">
                <i class="fa fa-user" aria-hidden="true"></i> 
                {{ $message->user_id }}
            </div>
            <div class="box-chat">
                <div class="user">
                    <span class="message">{{ $message->message }}</span>
                    <br>
                    <span class="author-message"><b>Role</b></span>
                </div>
            </div>
        @endforeach
        <div class="panel-footer clearfix">
            {!! Form::open(['route' => 'message.store', 'method' => 'POST', 'id' => 'form-message']) !!}
            <div class="form-group">
                <div class="input-group">
                    {!! Form::text(
                        'message',
                        null,
                        [
                            'class' => 'form-control',
                            'id' => 'message-content',
                            'placeholder' => 'Type your message',
                            'required' => 'required',
                        ]
                    ) !!}

                    {!! Form::hidden('userId', Auth::id()) !!}
                    <div class="input-group-addon">
                        {!! Form::button('Send', ['id' => 'btn-send']) !!}
                    </div>
                </div>
            </div>
            {!! Form::close() !!}
        </div>
    </div>
@endsection

@section('script')
    {!! Html::script('assets/pusher-js/dist/web/pusher.min.js') !!}
    {!! Html::script('js/app.js') !!}
    {!! Html::script('js/chat.js') !!}

    <script type="text/javascript">
        var chat = new chat();
        chat.init();
    </script>
@endsection
```
## Gửi tin nhắn
Khai báo kênh broadcast trong file routes/channels.php

```
Broadcast::channel('message', function () {
    return true;
});
```

Ở phần sử dụng với Broadcast, ta không quan tâm phần listener mà chỉ cần tạo event, còn xử lý sẽ do Pusher phụ trách. Ta tạo một sự kiện gửi tin nhắn như sau:
```
<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use App\Models\Message;
use App\Models\User;

class MessageSentEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $user, $message;

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
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('message');
    }
}
```
Trong sự kiện cần chú ý thực hiện inplements interface `ShouldBroadcast` để có thể thực hiện phương thức `broadcastOn()`. Phương thức `broadcastOn()` chịu trách nhiệm định nghĩa tên của kênh mà bạn muốn gửi nhận tin nhắn.
File `chat.js` xử lý gửi tin nhắn:
```
var chat = function () {
    this.init = function() {
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
          });

        this.addEvent();
    }

    this.addEvent = function() {
        var current = this;
        $('body').on('submit', '#form-message', function (event) {
            event.preventDefault();
            var message = $('body #message-content').val();

            current.addMessage(message);
        });
    }

    this.addMessage = function(message) {
        $.ajax({
            url: '/message',
            type: 'POST',
            data: {
                message: message
            },
            dataType: 'JSON',
            success: function(result) {
                if (result.status == 1) {
                    $('#chat-box').load(document.URL + ' #chat-box');
                }
            },
            error: function(result)
            {
                console.log(result);
            }
        });
    }
}
```
Trong phần controller xử lý gửi tin nhắn như sau:

```
public function store(Request $request)
    {
        $user = Auth::user();

        $message = Message::create([
            'user_id' => Auth::id(),
            'message' => $request->message,
        ]);
        event(new MessageSentEvent($user, $message));
        
        return response()->json([
            'status' => 1,
        ]);
    }
```
Bây giờ, bạn có thể muốn kiểm tra tin nhắn của bạn đã được gửi chưa, ta chưa cần quan tâm ngay đến phần nhận tin nhắn. Bạn có thể vào phần `Debug Console` trên ứng dụng Pusher mà bạn đang sử dụng và thử thực hiện gửi một tin nhắn để xem có kết quả như này không:
![](https://images.viblo.asia/82c2bfe4-c75a-4cdc-b3b9-1ea4d756d5ae.png)
Kết quả như ảnh trên là đã thành công, các thông tin từ biến `$user` cũng như `$message` đã được hiển thị đầy đủ rồi.
## Nhận tin nhắn
Cài đặt `laravel-echo` sử dụng `npm`:

`npm install --save laravel-echo pusher-js`

Bỏ comment đoạn code sau và sử dụng các key của Pusher trong file `bootstrap.js`:
```
import Echo from 'laravel-echo'

window.Pusher = require('pusher-js');

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: 'yourkey',
    cluster: 'yourcluster',
    encrypted: true
});
```
Trong file `app.js` thực hiện đoạn code như sau để có thể nhận tin nhắn:
```
const app = new Vue({
    el: '#app',
    created() {
        Echo.private('message')
            .listen('MessageSentEvent', (e) => {
                console.log(e);
                app.$forceUpdate();
            });
    }
});
```
Trên đây là đoạn code Vuejs chịu trách nhiệm lắng nghe sự kiện từ kênh tên message mà đã được định nghĩa ở lớp `MessageSentEvent` ở trên.
# 4. Kết luận
Trên đây là nội dung mình đã xây dựng ứng dụng chat online đơn giản sử dụng Broadcast với Pusher là Laravel Echo. Đây là mình đang làm với route định sẵn sẽ chỉ là một kênh không phân ra nhiều kênh người dùng. Nếu muốn sử dụng cho nhiều kênh mọi người có thể đọc thêm tài liệu ở phần Broadcast của Laravel trên [website](https://laravel.com/docs/5.6/broadcasting).
# Tài liệu tham khảo
1. [https://laravel.com/docs/5.6/broadcasting](https://laravel.com/docs/5.6/broadcasting)
2. [https://pusher.com/](https://pusher.com/)
Tiếp nối [Phần 1](https://viblo.asia/p/realtime-chat-application-using-laravel-vuejs-p1-naQZR1yPKvx#_laravel-echo-1) [& 2](https://viblo.asia/p/realtime-chat-application-using-laravel-vuejs-p2-djeZ1VkglWz). Phần này mình sẽ hướng dẫn các bạn cách setup `Broadcast` trong laravel để có thể chat real-time giữa 2 user với nhau

Các bạn đọc [phần này](https://viblo.asia/p/realtime-chat-application-using-laravel-vuejs-p1-naQZR1yPKvx#_laravel-echo-1) để có thể lấy được các key cần thiết cấu hình cho pusher nhé
# Setup pusher & broadcast

Trong file .env bạn thêm 2 key này (nếu chưa có) để dùng trong js
```
MIX_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
MIX_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"
```

Tiếp đó ta vào file `js/bootstrap.js` config `Echo` & `Pusher`. Phần này tùy theo từng version của Laravel mà có thể đã có sẵn hoặc không. Tốt nhất bạn cứ nên kiểm tra lại cho chắc chắn
```javascript
import Echo from 'laravel-echo'

window.Pusher = require('pusher-js');
window.Echo = new Echo({
    broadcaster: 'pusher',
    key: process.env.MIX_PUSHER_APP_KEY,
    cluster: process.env.MIX_PUSHER_APP_CLUSTER,
    encrypted: true
});
```

Ở đây ta sẽ khai báo 2 biến global `Pusher` từ lib `pusher-js` & `Echo` từ lib `laravel-echo`

Tiếp theo ta sẽ tạo 1 Event để bắt sự kiện chat
`php artisan make:event ChatRoomBroadCast`

Lệnh này sẽ tạo cho ta 1 file `ChatRoomBroadCast.php` ở trong folder app\Events. File này chính là ta đã sử dụng ở [Phần 2](https://viblo.asia/p/realtime-chat-application-using-laravel-vuejs-p2-djeZ1VkglWz#_create-form-chat-2)

Ngoài cách gọi trực tiếp ở trong function `sendChat` như trong Phần 2. Ta còn 1 cách khác
```php
class ChatRoom extends Model
{
    protected $dispatchesEvents = [
        'created' => ChatRoomBroadCast::class,
    ];
}
```
Mỗi lần `ChatRoom` được tạo mới, sẽ có 1 sự kiện được bắn đến `ChatRoomBroadCast`. Bạn có thể chọn 1 trong 2 cách tùy theo từng specs

Dù có làm theo cách nào thì bạn vẫn phải vào file `ChatRoomBroadCast` để config
```php
class ChatRoomBroadCast implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    public $chatRoom;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(ChatRoom $chatRoom)
    {
        $this->chatRoom = $chatRoom;
    }
    
    public function broadcastOn()
    {
        return new PrivateChannel('chat-room.' . $this->chatRoom->user_id . '.' . $this->chatRoom->friend_id);
    }
}
```

Trong file này ta sẽ phải implement từ `ShouldBroadcast`. Đây là 1 interface & ta sẽ phải define function `broadcastOn` - hàm này sẽ thông với các `channel` giúp cho 2 user có thể chat real-time mà k cần load lại trang

> `broadcastOn`: Hàm này ta sẽ trả về 1 `PrivateChannel` với id được cấu tạo từ id của 2 user đang chat với nhau
> 


Tiếp theo ta sẽ phải `Authorizing Channels`. Việc này được thực hiện ở file `routes\channels.php`
```php
Broadcast::channel('chat-room.{user_id}.{friend_id}', function ($user, $userId, $friendId) {
    return $user->id == $friendId;
});
```

Ta sẽ kiểm tra xem `$friendId` có trùng với user đang login hay không. Nếu bỏ qua bước này thì đoạn chat giữa 2 user hoàn toàn có thể bị người khác đọc trộm hoặc đánh cắp thông tin

# Receive data from server
Vậy là ta đã setup xong việc nhận & gửi dữ liệu giữa 2 user bên phía Backend. Giờ việc của ta tiếp theo sẽ phải bắt được những dữ liệu đó ở phía client để hiển thị lên cho user. Ta mở file `assets/js/app.js`

```javascript
created() {
    if (friendId != undefined) {
        .....
        .....
        Echo.private('chat-room.' + friendId + '.' + userId)
            .listen('ChatRoomBroadCast', (e) => {
                this.chats.push(e.chatRoom);
                this.scrollToBottom();
            });
    }
},
methods: {
    scrollToBottom: function() {
        setTimeout(function () {
            $("html, body").animate({ scrollTop: $('.direct-chat-primary').height() }, 100);
        }, 0);
    },
}
```

Ta sẽ thêm đoạn code trên vào function `created`. Ở đoạn code này ta sẽ dùng `Echo` để hứng dữ liệu từ server gửi về

Ở đây có 2 điểm cần chú í
1. Kênh ở đây phải là private & tên channel cũng phải có định dạng `'chat-room.' + friendId + '.' + userId`. Tương ứng với kiểu channel `private` & tên channel mà lúc nãy ta đã config trên server
2. Phần `listen` ở đây phải là `ChatRoomBroadCast` cũng phải tương ứng với Event mà ta vừa khởi tạo trên server

Sau khi nhận được dữ liệu từ server trả về, ta sẽ đẩy vào mảng `chats` & Vue sẽ thực hiện phần còn lại cho chúng ta. Ở đoạn cuối mình có thêm 1 function `scrollToBottom`, mình muốn khi nhận được 1 đoạn chat mới thì khung chat của ta sẽ tự động được đẩy xuống cuối cùng - giống như Messager trên Facebook vậy

# Add sound when receive a new 
Bạn có để í là Messager của FB khi nhận được 1 message mới sẽ có 1 âm thanh phát ra không. Mình thấy khá thú vị & sẽ làm luôn trong phần này
Đầu tiên ta phải download file sound đó về. Bạn vào trang [https://www.facebook.com/messages](https://www.facebook.com/messages) & bật F12 rồi check network xem có gì hay ho không. Và đây là kết quả
![](https://images.viblo.asia/00dd29f4-e63f-44cc-a0f1-cce789acfdb7.png)
Bạn tải file này về & lưu vào folder `public\sounds`

```php
// File show.blade.php
<audio id="ChatAudio">
    <source src="{{asset('sounds/chat.mp3')}}">
</audio>

// File app.js
...
this.chats.push(e.chatRoom);
document.getElementById('ChatAudio').play();
this.scrollToBottom();
...
```

Vậy là mình hoàn thành xong series Chat Application Real Time. Cám ơn các bạn đã theo dõi. Rất mong nhận được comment & góp í của các bạn
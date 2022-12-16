# 1. Giới thiệu
Xin chào các bạn, như tiêu đề thì hôm nay mình sẽ hướng dẫn các bạn viết một ứng dụng chat realtime đơn giản với laravel. Thế nào là đơn giản? Sở dĩ mình nói như vậy vì đây sẽ chỉ là chat giữa client - admin và ngược lại, chứ không phân chia ra từng kênh chat riêng cho mỗi người (các bạn đừng kì vọng nó sẽ hoạt động như facebook messenger :smile:)

Để làm được ứng dụng chat này, các bạn sẽ phhải biết cách cài đặt và chạy laravel, cái đó mình sẽ không hướng dẫn ở đây, nếu bạn nào chưa biết thì chắc nên học laravel trước, đây là [docs](https://laravel.com/docs/5.8/installation) cho bạn nào muốn tìm hiểu.

Giờ thì mình sẽ giới thiệu qua một vài khái niệm trước nhé:

* **Realtime**: Hiểu đơn giản thì realtime là việc phản hồi, tương tác một cách tức thì mà người dùng không phải refresh lại trang. Ví dụ như: thông báo facebook, facebook messenger, ...
* **Pusher**:  Là dịch vụ trung gian giúp chúng ta xử lý realtime
* **Redis**: Redis là hệ thống lưu trữ key-value với rất nhiều tính năng và được sử dụng rộng rãi.

Bài viết này tương đối dài nên mong các bạn kiên nhẫn đọc, bỏ qua 1 bước sẽ có thể gây lỗi không chạy được ứng dụng :(

# 2. Xây dựng
## Tạo tài khoản pusher:
Để tạo tài khoản, các bạn truy cập vào trang chủ của pusher: https://pusher.com/ và tạo cho mình một tài khoản. Sau đó, ấn vào **Create new app**, sau khi click vào **Create new app**, các bạn sẽ thấy một popup như này
![](https://images.viblo.asia/3aa27f95-1e4b-4c08-8a22-8e8a72bc1d1d.png)

Những thông tin bạn cần quan tâm
* 1: Tên app của bạn
* 2 : Địa điểm đặt server sẽ xử lý nhưng request gửi lên app của bạn

Và đây là kết quả: 
![](https://images.viblo.asia/893a1f40-5eb9-4fb9-8ee2-2aa06062ddd7.png)

Hãy chuyển qua tab **App Keys**, bạn nhìn thấy các thông số **app_id**, **key**, ... chứ, đó sẽ là những thứ bạn cần để  có thể kết nối được với app của bạn.

## Chỉnh sửa .env và config laravel
Giờ hãy vào project laravel của bạn và thay đổi 1 số thông số sau trong file `.env`, đây chính là những thông số trong phần **App Keys** mà mình đã nói ở trên

```
BROADCAST_DRIVER=pusher

PUSHER_APP_ID= Your_app_id
PUSHER_APP_KEY= Your_key
PUSHER_APP_SECRET= Your_secret
PUSHER_APP_CLUSTER= Your_cluster
```

Cài đặt thư viện:
```
composer require pusher/pusher-php-server
```

Trong file `config\app.php`, bỏ comment `App\Providers\BroadcastServiceProvider::class,` trong `providers`

## Xây dựng ứng dụng
### Phân chia client - admin
Vì đây là ứng dụng chat giữa client - admin nên mình sẽ cần có phân quyền, ở đây mình sẽ chỉ phân đơn giản là người chưa đăng nhập sẽ là client và đăng nhập rồi sẽ là admin. Để nhanh chóng mình sẽ sử dụng luôn `Auth` của laravel

Đầu tiên chúng ta cần chạy migrate để tạo bảng `users` trong database, mặc định trong thư mục `database\migrations` đã có file `create_users_table.php` nên mình sẽ sử dụng luôn và chỉ cần chạy lệnh:
```
php artisan migrate
```

Tiếp tới mình sẽ chạy lệnh:
```
php artisan make:auth
```
 
 Lệnh này sẽ giúp bạn tạo ra routes, controllers, view để xử lý việc đăng ký, đăng nhập, ... Thật kì diệu phải không :smile:.
 Giờ thì hãy gõ lệnh `php artisan serve` để chạy project của bạn. Truy cập đường dẫn http://127.0.0.1:8000/register để đăng ký tài khoản.
 
 ### Tạo view chat
 Bước làm giao diện thì mình sẽ đi lấy 1 template trên mạng để tiết kiệm thời gian :smile:, còn nếu bạn muốn tự làm cho bản thân một giao diện riêng biệt thì hoàn toàn có thể tự xây dựng. Đây sẽ là template mình sẽ sử dụng:  https://bootsnipp.com/snippets/35mvD. Mình sẽ `Ctrl C` + `Ctrl V` và chỉ chỉnh sửa một chút cho gọn gàng thôi. Và đây là kết quả:
 ![](https://images.viblo.asia/8cfb95b6-e516-462c-8217-20b7bedd3103.png)
 
Giao diện chat ở cả 2 phía sẽ giống nhau nhé các bạn.

Trước hết chúng ta sẽ tạo ra  2 Controller (1 ở phía admin, 1 ở phía client), các bạn chạy lệnh :
```
php artisan make:controlller Client/ChatController
php artisan make:controller Admin/ChatController
```

Trong `resources/views` hãy tạo 2 folder là `admin` và `client`, mỗi folder đều chưa file `chat.blade.php`, sau đó copy đoạn code ở template vào trong 2 file này

Trong `routes/web.php`, các bạn thêm 1 vài dòng sau:
```php
Route::prefix('chat')->name('client.chat.')->group(function () {
    Route::get('', 'Client\ChatController@index')->name('index');
});

Route::middleware('auth')->prefix('admin/chat')->name('admin.chat.')->group(function () {
    Route::get('', 'Admin\ChatController@index')->name('index');
});
```

Giờ hãy truy cập đường dẫn: http://127.0.0.1:8000/chat và http://127.0.0.1:8000/admin/chat. Vậy là đã xong phần giao diện, giờ sẽ tới bước xử lý dữ liệu

### Xử lý dữ liệu
#### Gửi
Giờ chúng ta cần tạo ra các sự kiện (event) để lắng nghe được những hoạt động khi mà tin nhắn được gửi đi. Và mình sẽ cần 2 event để làm việc này, 1 cho client và 1 cho admin. Các bạn hãy chạy 2 lệnh sau:
```
php artisan make:event Client/Chat
Php artisan make:event Admin/Chat
```

Giờ mình sẽ xử lý việc gửi tin nhắn bên phía client trước.
Ở trong file `Client\ChatController`, bạn hãy tạo thêm một method là `submit` và khai báo bên `web.php` nữa nhé, lúc đó thì group routes phía client của mình sẽ như thế này
```php
Route::prefix('chat')->name('client.chat.')->group(function () {
    Route::get('', 'Client\ChatController@index')->name('index');
    Route::post('/submit', 'Client\ChatController@submit')->name('submit');
});
```

Giờ quay sang phía view (`resources/views/client/chat.blade.php`), vì mình muốn trang của mình không bị load lại mỗi khi mình submit tin nhắn nên mình sẽ xử dụng ajax.
Ở phần `<head>` bạn thêm thẻ : `<meta name="csrf-token" content="{{ csrf_token() }}"/>` để có thể xác thực được request gửi lên bằng ajax. Bạn sẽ phải sử dụng jquery để có thể sử dụng ajax, vì vậy ở trước thẻ đóng body, hãy thêm `<script src='https://code.jquery.com/jquery-2.2.4.min.js'></script>`. Còn đây sẽ là đoạn xử lý ajax của mình: 
```php
 $('.submit').click(function (e) {
        e.preventDefault();
        var formComment = new FormData();
        var message = $('#message').val();
        formComment.append('message', message);
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            contentType: false,
            processData: false,
            url: '{{ route('client.chat.submit') }}',
            type: 'POST',
            dataType: 'json',
            data: formComment,
            success: function (response) {
                $('<li class="sent"><img src="http://emilcarlsson.se/assets/mikeross.png" alt="" /><p>' + response.message + '</p></li>').appendTo($('.messages ul'));
                $('.message-input input').val(null);
            }, error: function () {
                alert("Có lỗi xảy ra");
            },
        });
    });
```

Chậm lại và giải thích 1 chút nhỉ. Trước tiên mình xin nói là mình sẽ vi phạm 1 chút về code convention (như là việc mình viết `script` trong file blade). Giờ sẽ giải thích về đoạn code ở trên, đầu tiên khi có sự kiện click được tác động nên class là submit (class submit ở đây là class của button trong form), mình sẽ chặn việc submit form (`e.preventDefault()`). Tiếp tới mình sẽ khởi tạo FormData, để hiểu thêm về FormData thì các bạn có thể đọc bài viết [này](https://viblo.asia/p/tim-hieu-ve-formdata-Az45bABwlxY).  `$.ajaxSetup` để setup các thiết lập cho ajax request, ở đây là mình thiết lập csrf token cho nó. Tiếp tới `$.ajax`:

*  `contentType`: Kiểu nội dung của dữ liệu được gửi lên server. Như mình đọc được trên stackoverflow thì : *When one sets the contentType option to false, it forces jQuery not to add a Content-Type header, otherwise, the boundary string will be missing from it. Also, when submitting files via multipart/form-data, one must leave the processData flag set to false, otherwise, jQuery will try to convert your FormData into a string, which will fail.*
*  `processData`: Set giá trị này là false nếu bạn không muốn dữ liệu được truyền vào thiết lập data sẽ được xử lý và biến thành một query kiểu chuỗi.
* `url`: Url mà bạn sẽ sử dụng để xử lý request.
* `type`: Kiểu request muốn thực hiện (GET hoặc POST)
* `dataType`: Kiểu của dữ liệu mong muốn được trả về từ server.
* `data`:  Dữ liệu được gửi lên server.
*  `success`: Hàm được gọi khi request thành công.
*  `error`: Hàm được gọi khi request có lỗi.

Vậy thứ mình xử lý trong hàm `success` là gì. Chỉ đơn giản là hiển thị tin nhắn lên box chat và làm trống input để người dùng hiểu được là tin nhắn của họ đã được gửi, đơn giản phải không nào :smile:. Còn khi có lỗi xảy ra thì sẽ hiển thị 1 alert, hơi xấu xí nhưng hiện tại như vậy cũng là đủ rồi :v.

Tiếp tới là chúng ta sẽ xử lý trong `Client/ChatController.php`. Như các bạn đã thấy thì mình sử dụng `route('client.chat.submit')` để xử lý request gửi lên. Vậy là trong ChatController mình sẽ cần bổ sung method `submit` như đã khai báo trong `web.php`. Copy đoạn code sau vào trong method đó nhé: 
```php
use App\Events\Client\Chat;

public function submit(Request $request)
{
    $data = [
        'message' => $request->message,
    ];
    event(new Chat($data['message']));

    return response()->json(['message' => $data['message']], 200);
}
```

Hmmmmm, sao lại ngắn vậy nhỉ :confused:, nhưng với ứng dụng đơn giản này thì chúng ta cũng chỉ cần bấy nhiều đó thôi. Chút nữa mình sẽ bổ sung thêm 1 chút code nữa để nhìn cho hoành tráng chút :smile:. 

Giờ tới file `Events/Client/Chat.php`,
Đầu tiên bạn cần implements `ShouldBroadCast` (phần này trong [docs](https://laravel.com/docs/5.8/broadcasting) của laravel cũng đã đề cập tới). Sau đó bạn copy đoạn code này vào trong class `Chat`: 
```php
   use Dispatchable, InteractsWithSockets, SerializesModels;

   public $message;

   public function __construct($message)
    {
        $this->message = $message;
    }
    
    public function broadcastOn()
    {
        return ['chat-with-admin'];
    }
```

Biến message ở đây chính là nội dung của tin nhắn, còn trong method `broardcastOn()` return tên của kênh mà bạn sử dụng.

Đến đây thì chúng ta nên dừng lại và test qua một chút nhỉ. Giờ ở phía client bạn hãy thử gửi 1 tin nhắn đi. Sau đó bạn hãy vào Dashboard của app trong pusher để xem phần `Total messages sent today` có thay đổi gì không, nếu có tức là request của bạn đã được gửi thành công lên server pusher rồi đấy :smile:
![](https://images.viblo.asia/18c9ec45-863d-40f4-9a7d-62b1b9c219ca.png)

#### Nhận
Dữ liệu được gửi thành công rồi, giờ ta còn bước nhận nữa. Client gửi lên thì nhận sẽ là Admin, vậy giờ chúng ta sẽ quay về file blade của admin `admin/chat.blade.php`. Để nhận được dữ liệu thì chúng ta sẽ phải dùng thư viện của pusher, do đó bạn phải thêm vào `<script src="//js.pusher.com/3.1/pusher.min.js"></script>` và đương nhiên vẫn phải có jquery nhé. Sau đó hãy copy đoạn `cript` này bên dưới:
```php
    var pusher = new Pusher('your_app_key', {
        cluster: "your_app_cluster"
    });

    var channel = pusher.subscribe('chat-with-admin');

    channel.bind('App\\Events\\Client\\Chat', function (data) {
        $(".messages").animate({scrollTop: $(document).height()}, "fast");
        $('<li class="replies"><img src="http://emilcarlsson.se/assets/mikeross.png" alt="" /><p>' + data.message + '</p></li>').appendTo($('.messages ul'));
    });
```

Đầu tiên mình tạo 1 đối tượng `pusher` với app_id và app_cluster. Sau đó sẽ khởi tạo biến `channel` là biến mà sẽ lắng nghe kênh của mình (ở đây là kênh **chat with admin**). Tiếp tới chính là những hành động khi mà có request mới được gửi lên channel, ở đây là mình sẽ tự động scroll tới cuối box chat và hiển thị tin nhắn mới).

Vậy là chúng ta đã đi được 1 nửa quoãng đường rồi. Cùng xem thử thành quả nhé:

![](https://images.viblo.asia/addfefbf-84d0-4dc6-8225-04186281f939.gif)

Vậy là đã thành công rồi. Giờ thì các bạn hãy thực hành 1 chút bằng việc gửi tin nhắn từ admin tới client nhé, cách làm cũng tương tự mình vừa làm thôi :smile:

### Lưu lại lịch sử chat
Tin nhắn đã được gửi và nhận thành công nhưng khi refresh lại thì mọi thứ lại trở về con số 0, mạnh hơn cả cú búng tay của Thanos. Đơn giản là minh chưa hề lưu lại những tin nhắn của mình. Và giải pháp của mình chính là Redis

Để có thể sử dụng redis, đầu tiên bạn cần cài đặt redis server. Vì mình đang sử dụng ubuntu nên mình sẽ chỉ hướng dẫn cài đặt trên ubuntu thôi nhé. Bạn hãy chạy lệnh sau để cài đặt:
```
sudo apt update
sudo apt install redis-server
```

Kiểm tra thử xem đã thành công chưa nhé
```
sudo systemctl status redis
```

Nếu kết quả trả về như dưới là đã thành công:
```
● redis-server.service - Advanced key-value store
   Loaded: loaded (/lib/systemd/system/redis-server.service; enabled; vendor pre
   Active: active (running) since T2 2019-08-05 11:05:13 +07; 4h 49min ago
     Docs: http://redis.io/documentation,
           man:redis-server(1)
  Process: 12315 ExecStopPost=/bin/run-parts --verbose /etc/redis/redis-server.p
  Process: 12312 ExecStop=/bin/kill -s TERM $MAINPID (code=exited, status=0/SUCC
  Process: 12309 ExecStop=/bin/run-parts --verbose /etc/redis/redis-server.pre-d
  Process: 12327 ExecStartPost=/bin/run-parts --verbose /etc/redis/redis-server.
  Process: 12324 ExecStart=/usr/bin/redis-server /etc/redis/redis.conf (code=exi
  Process: 12321 ExecStartPre=/bin/run-parts --verbose /etc/redis/redis-server.p
 Main PID: 12326 (redis-server)
   CGroup: /system.slice/redis-server.service
           └─12326 /usr/bin/redis-server 127.0.0.1:6379       

Th08 05 11:05:12 i120937-pc systemd[1]: Starting Advanced key-value store...
Th08 05 11:05:12 i120937-pc run-parts[12321]: run-parts: executing /etc/redis/re
Th08 05 11:05:13 i120937-pc run-parts[12327]: run-parts: executing /etc/redis/re
Th08 05 11:05:13 i120937-pc systemd[1]: Started Advanced key-value store.
lines 1-19/19 (END)
```

Để chắc chắn thêm 1 chút nữa, chúng ta hãy thử kết nối với redis server xem sao, chạy lệnh:
```
redis-cli
```
Ping:
```
127.0.0.0.1:6379 > ping


-----


Output:
PONG
```
```
127.0.0.0.1:6379 > set test "Testing


-----
Output:
OK

```
```
127.0.0.0.1:6379 > get test


-----
Output:
Testing

```
Vậy là được rồi đó.
Giờ tới sử dụng.
Ở trong `Client/ChatController.php`, chúng ta sẽ sửa lại 1 chút:
```php
   public function index()
   {
        if (Redis::exists('chat_log')) {
            $chat_logs = json_decode(Redis::get('chat_log'));
        } else {
            $chat_logs = null;
        }
        return view('client.chat', compact('chat_logs'));
   }

   public function submit(Request $request)
   {
        $data = [
            'message' => $request->message,
            'sent_by' => 'client', //admin sẽ là 'admin'
        ];
        if (Redis::exists('chat_log')) {
            $log = Redis::get('chat_log');
            $arr_log = json_decode($log, true);
            array_push($arr_log, $data);
            Redis::getSet('chat_log', json_encode($arr_log));
        } else {
            $log = json_encode(array($data));
            Redis::set('chat_log', $log);
        }
        event(new Chat($data['message']));

        return response()->json(['message' => $data['message']], 200);
   }
```

Ở trong `index()` thì chúng ta sẽ kiểm tra xem có tồn tại key là `chat_log` không, nếu có thì sẽ decode value của key đó, không thì tạo 1 biến `chat_logs` và gán cho nó là null.

Ở method `submit()` chúng ta cũng kiểm tra như vậy, nếu tồn tại thì chúng ta sẽ lấy value của key sau đó decode, rồi đẩy thêm giá trị vào mảng, cuối cùng là encode mảng rồi ghi đè lên value cũ. Còn nếu chưa tồn tại key thì đơn giản tạo 1 key mới và lưu value.

Ở phía view:
```php
@if ($chat_logs != null)
    @foreach ($chat_logs as $chat_log)
       <li class="{{ $chat_log->sent_by == 'client' ? 'sent' : 'replies' }}">
            <img src="http://emilcarlsson.se/assets/mikeross.png" alt=""/>
            <p>{{ $chat_log->message }}</p>
        </li>
    @endforeach
@endif
```

Nhớ đừng quên ở phía admin nữa nhé


# Kết luận

Trên đây chỉ là 1 ứng dụng chat cực kì đơn giản giúp các bạn hiểu được cách sử dụng pusher để xây dựng ứng dụng realtime. Nếu muốn đưa vào sử dụng thực tế thì các bạn sẽ phải phát triển thêm (như là phân ra nhiều channel cho nhiều người dùng, ...)

Mong rằng bài viết của mình sẽ giúp ích được cho các bạn

Source code: https://github.com/duongmanhhoang/real-time-chat
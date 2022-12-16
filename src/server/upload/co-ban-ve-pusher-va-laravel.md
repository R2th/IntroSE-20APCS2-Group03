Với sự phát triển của công nghệ hiện nay, hai từ "real-time" đã không còn quá xa lạ với các developer nữa. Rất nhiều các chức năng đòi hỏi phải real-time như chat, thông báo... dẫn đến ra đời của rất nhiều công nghệ nhắm hỗ trợ việc đó và một trong số đó là Pusher.
## Pusher là gì?
Pusher là một dịch vụ cloud, tạo ra một server trung gian giúp chúng ta có thể xử lý các tác vụ thời gian thực. Dữ liệu được gửi tới pusher, và pusher lại gửi nó đi tới các client đã subscribe (đăng ký) và các channel. Trong đó Pusher Channel cung cấp giao tiếp thời gian thực giữa các máy chủ, ứng dụng và thiết bị. Các kênh được sử dụng cho các biểu đồ thời gian thực, danh sách người dùng thời gian thực, bản đồ thời gian thực, chơi trò chơi nhiều người chơi và nhiều loại cập nhật giao diện người dùng khác. Nó có một thư viện hỗ trợ mọi thứ như trình duyệt web, ứng dụng iOS và Android, khung PHP, chức năng đám mây, tập lệnh bash, thiết bị IoT. Pusher Channel hoạt động ở mọi nơi vì nó sử dụng WebSockets và HTTP và cung cấp dự phòng cho các thiết bị không hỗ trợ WebSockets.
## Sử dụng Pusher với Laravel
Đầu tiên để sử dụng Pusher, bạn cần phải đăng nhập vào màn hình quản trị của Pusher và tiến hành khởi tạo thông tin về app của bạn:
![](https://images.viblo.asia/8c5abd96-92a2-403a-a874-8e35316f2a01.png)

Như trong hình chúng ta có thể thấy Pusher hỗ trợ trên Font-end và Back-end rất nhiều ngôn ngữ, bạn có thể thoải mái lựa chọn ngôn ngữ phù hợp với project mình đang dùng. Sau khi khởi tạo thành công app, chúng ta sẽ thấy một màn hình quản lý app của bạn như sau:
![](https://images.viblo.asia/d64b431f-10ea-457f-8df9-f0e8119ccafe.png)

Khi bạn kéo xuống dưới sẽ thấy các thông tin `app_id`, `app_secret`, `app_key`, `cluter`. Đây là những thông tin để kết nối vào app của bạn nên hãy giữ kín nó nhé :).

Ok như vậy đã xong bước khởi tạo app trên Pusher, để Laravel có thể kết nối đến pusher thì trước tiên chúng ta cần cài package pusher cho laravel:

`composer require pusher/pusher-php-server`

Bước tiếp theo chúng ta cần thiết lập các cấu hình trong laravel để có thể kết nối được đến app. Đầu tiên chúng ta cần định nghĩa driver sẽ dùng trong file `config/broadcasting`: 

![](https://images.viblo.asia/b762c2e9-8d38-42c6-86e4-e02e4bfbe35c.png)

Sau khi thiết lập các biến như ảnh, chúng ta chỉ cần điền các biến như config vào file `env`. Như vậy là chúng ta đã config cho Laravel có thể kết nối đến app Pusher. Tiếp theo là phần trong trọng nhất là **phát đi event từ Laravel** và **lắng nghe sự kiện đó real-time trên Font-end**.
### Phát đi event từ laravel
Laravel có hỗ trợ **Laravel Broadcasting** giúp cho việc phát event từ Laravel. Bạn có thể tìm hiểu kĩ hơn về Laravel Broadcasting tại [đây](https://laravel.com/docs/6.x/broadcasting)

Ở đây, mình sẽ chỉ nói qua về cách dùng nó. Đầu tiên ta cần tạo một class `Event` 
```
<?php

use Illuminate\Queue\SerializesModels;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class MyEvent implements ShouldBroadcast
{
  use Dispatchable, InteractsWithSockets, SerializesModels;

  public $message;

  public function __construct($message)
  {
      $this->message = $message;
  }

  public function broadcastOn()
  {
      return ['my-channel'];
  }

  public function broadcastAs()
  {
      return 'my-event';
  }
}
```
Ở đây cái chúng ta cần quan tâm nhất chính là `tên channel` trong phần`broadcastOn` và `tên event` trong phần `broadcastAs`. Đó là 2 thông tin để bên Font-end lắng nghe dữ liệu.
### Lắng nghe sự kiện real-time trên Font-end
```
<!DOCTYPE html>
<head>
  <title>Pusher Test</title>
  <script src="https://js.pusher.com/5.0/pusher.min.js"></script>
  <script>

    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;

    var pusher = new Pusher('app-key', {
      cluster: 'ap1',
      forceTLS: true
    });

    var channel = pusher.subscribe('my-channel');
    channel.bind('my-event', function(data) {
      alert(JSON.stringify(data));
    });
  </script>
</head>
<body>
  <h1>Pusher Test</h1>
  <p>
    Try publishing an event to channel <code>my-channel</code>
    with event name <code>my-event</code>.
  </p>
</body>
```

Vừa trên mình đã giới thiệu cách sử dụng cơ bản của Pusher và Laravel. Hy vọng chút kiến thức của mình có ích cho mọi người.
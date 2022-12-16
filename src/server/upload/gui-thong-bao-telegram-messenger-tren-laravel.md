**Telegram** chắc là hẳn không còn lạ lẫm gì với anh em dev cũng giống như những người anh em WhatsApp, Facebook Messenger về các tính năng cũng như khả năng bảo mật tuyệt vời. Chúng ta có thể sử dụng Telegram để gửi tin nhắn đến các channel hoặc các group thông qua  **Telegram Bot API**. Nó hoàn toàn miễn phí vậy nên chúng ta có thể ứng dụng điều này để thông báo ứng dụng lỗi, báo cáo ứng dụng hằng ngày.

Bạn có thể tham khảo tài liệu API Bots chính thức tại. https://core.telegram.org/bots

Trong bài hướng dẫn này, chúng ta sẽ cùng nhau xây dựng một ứng dụng đơn giản cho phép gửi tin nhắn đến một channel. Let's start working now...

# Cài đặt Telegram Bot API
Telegram Bots được phát triển rất mạnh mẽ với cộng đồng thành viên tham xây dựng và phát triển hỗ trợ trên rất nhiều ngôn ngữ, nền tảng khác nhau. Chúng ta có thể tham khảo tại: https://core.telegram.org/bots/samples. Chúng ta sẽ sử dụng [Telegram Bot API PHP SDK](https://github.com/irazasyed/telegram-bot-sdk) package được phát triển bởi Syed Irfaq R. Lý do sử dụng bởi nó hỗ trợ Laravel và được cộng đồng đánh giá cao.


Cài đặt với cmd sau:

```
composer require irazasyed/telegram-bot-sdk
```

Tiếp theo, thêm dòng dưới vào Service Provider trong `config/app.php`.
```php
Telegram\Bot\Laravel\TelegramServiceProvider::class,
```
thêm vào mảng aliases với:
```php
 'Telegram' => Telegram\Bot\Laravel\Facades\Telegram::class,
```
Bước cuối cùng, chúng ta sẽ thực hiện publish cấu hình:
```php
php artisan vendor:publish --provider="Telegram\Bot\Laravel\TelegramServiceProvider"
```
command trên sẽ tạo ra file config telegram.php trong thư mục config. Thông tin config sẽ được thiết lập tại đây.

# Tạo một Telegram Bot
Đầu tiên chúng ta cần cài đặt ứng dụng Telegram và thực hiện một điều thú vị bằng việc nói chuyện với BotFather để tạo một telegram bot mới. ^^! khá mới mẻ. 

Để thực hiện điều này, chúng ta cần gửi một tin nhắn tới [@BotFather](https://t.me/botfather) và thực hiện một vài bước đơn giản như sau:

1. Click **Start** tiến hành giao tiếp với botfather  với **`/start`**
2. Tạo 1 bot mới với **`/newbot`**
3. Thiết lập tên và username cho bot.

Cuối cùng bạn sẽ nhận được thông tin xác nhận bot đã được tạo thành công với token để sử dụng cho **HTTP API**. Chúng ta cũng có thể tham khảo [tại đây](https://core.telegram.org/bots/api) (https://core.telegram.org/bots/api) để biết được chúng ta có thể dạy con bot những điều gì.

![](https://images.viblo.asia/97b20a8f-39a8-4e56-bdff-d6d3a4cb044f.jpg)

Tiếp theo đó, chúng ta sẽ cấu hình biến môi trường cho con bot của mình với token vừa nhận được
```
TELEGRAM_BOT_TOKEN=525012101:AAEwy9R1SCpq0V_Bpkgqm9Z4nbrWZaNt_Kg....
```

# Tạo channel để gửi thông báo

## Tạo channel
Bây giờ, chúng ta cần tạo một channel mới để gửi thông báo và đặt chế độ public để có thể tìm kiếm và join một cách dễ dàng. 
![](https://images.viblo.asia/2a7c6c9b-0782-42d4-9f6c-035080576933.jpg)

Tiếp theo, chúng ta sẽ thực hiện mời bot vừa tạo vào với quyền Admin để cho phép bot gửi tin nhắn tới channel.
![](https://images.viblo.asia/58fe42b7-7b4b-4f20-8a84-f354a8ead0ac.jpg)

## Cấu hình bot

Chúng ta cần cấu hình thông tin bot tại **`config/telegram.php`** với một số giá trị **token**, **certificate_path** và **webhook_url**. Những thông tin này chúng ta có thể hoàn toàn thiết lập tại **env**:
```php
'bots' => [
    'mybot' => [
        'username'            => env('TELEGRAM_BOT', 'TelegramBot'),
        'token'               => env('TELEGRAM_BOT_TOKEN', ''),
        'certificate_path'    => env('TELEGRAM_CERTIFICATE_PATH', ''),
        'webhook_url'         => env('TELEGRAM_WEBHOOK_URL', ''),
        'commands'            => [
        ],
    ],
],
```

## Lấy Channel chat_id
Để có thể gửi tin nhắn hoặc thông báo đến bất kì channel hay group nào chúng ta cần có **chat_id**. **chat_id** là một dãy số định danh duy nhất mà chúng ta có thể gửi tin nhắn trong Telegram.

Việc tìm kiếm thông tin chat_id chúng ta có thể lấy bằng cách tạo ra một route để Telegram có thể trả về tất cả thông tin liên quan đến hoạt động của con bot.  Thông tin trả về chứa kênh và số chat_id liên quan mà bot này sở hữu.

## Kiểm tra hoạt động bot

Đầu tiên chúng ta tạo **TelegramController** với method **`updatedActivity`** để thực hiện bắt các thông tin trả về từ Telegram

```php
<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Telegram\Bot\Laravel\Facades\Telegram;

class TelegramController extends Controller
{
    public function updatedActivity()
    {
        $activity = Telegram::getUpdates();
        dd($activity);
    }
}
```
thêm route tại `routes/web.php`.
```php
Route::get('/updated-activity', 'TelegramBotController@updatedActivity');
```

Chạy ứng dụng để kiểm tra hoạt động với endpoint `/updated-activity`. Lúc này chúng ta có thể nhận được một thông tin trống nếu như chưa có hoạt động gì xảy ra. 

Chúng ta sẽ thử mở channel và phát ra một tin nhắn `Hi`, `Hello` rồi sau đó refresh trình duyệt để kiểm tra lại thông tin thay đổi:

```php
array:2 [▼
  0 => Telegram\Bot\Objects\Update {#290 ▼
    #items: array:2 [▼
      "update_id" => 276542675
      "channel_post" => array:4 [▼
        "message_id" => 7
        "chat" => array:4 [▼
          "id" => -1001120496444
          "title" => "Tele Channel Test Bot"
          "username" => "telechanneltestbot"
          "type" => "channel"
        ]
        "date" => 1603295295
        "text" => "Hi"
      ]
    ]
  }
  1 => Telegram\Bot\Objects\Update {#299 ▼
    #items: array:2 [▼
      "update_id" => 276542676
      "channel_post" => array:4 [▼
        "message_id" => 8
        "chat" => array:4 [▼
          "id" => -1001120496444
          "title" => "Tele Channel Test Bot"
          "username" => "telechanneltestbot"
          "type" => "channel"
        ]
        "date" => 1603295569
        "text" => "Hello"
      ]
    ]
  }
]
```
Đễ dàng nhận thấy một id trong mảng `channel_post/chat/id`, trong trường hợp này **chat_id** của chúng ta sẽ là `-1001120496444`. Hãy thiết lập `TELEGRAM_CHANNEL_ID` trong file .env với giá trị này.
```
TELEGRAM_CHANNEL_ID=-1001120496444
```

# Tạo ứng dụng gửi tin nhắn

Trong ứng dụng này, chúng ta sẽ tạo ra 1 contact form để thực hiện gửi yêu cầu contact như sau:
## Tạo view
tạo file `contactform.blade.php`:
```HTML
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Telegram Bot Contact Form</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-light bg-light" style="margin-bottom: 50px;">
        <a class="navbar-brand" href="#">Telegram</a>
        <div class="collapse navbar-collapse">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <a class="nav-link" href="{{ url('/contact') }}">Contact Us</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="{{ url('/updated-activity') }}">Check Activity</a>
                </li>
            </ul>
        </div>
    </nav>
    <div class="container">
        <div class="row">
            <div class="col-sm-10 offset-sm-1">
                 <form action="{{ url('/send-message') }}" method="post">
                    {{ csrf_field() }}
                    <div class="form-group">
                        <label for="email">Email address</label>
                        <input type="email" class="form-control" id="email" name="email" placeholder="Enter your email">
                    </div>
                    <div class="form-group">
                        <label for="message">Message</label>
                        <textarea name="message" id="message" class="form-control" placeholder="Enter your query" rows="10"></textarea>
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</body>
</html>
```

thiết lập routes:
```php
Route::get('/contact', 'TelegramController@contactForm');
Route::post('/send-message', 'TelegramController@storeMessage');
```

## Thiết lập action
cập nhật TeletgramController:
```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Telegram\Bot\Laravel\Facades\Telegram;

class TelegramController extends Controller
{
    public function updatedActivity()
    {
        $activity = Telegram::getUpdates();
        dd($activity);
    }

    public function contactForm()
    {
        return view('contactform');
    }
 
    public function sendMessage(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'message' => 'required'
        ]);
 
        $text = "A new contact us query\n"
            . "<b>Email Address: </b>\n"
            . "$request->email\n"
            . "<b>Message: </b>\n"
            . $request->message;
 
        Telegram::sendMessage([
            'chat_id' => env('TELEGRAM_CHANNEL_ID', ''),
            'parse_mode' => 'HTML',
            'text' => $text
        ]);
 
        return redirect()->back();
    }
}
```
Sau khi validate dữ liệu thành công, chúng ta sẽ thực hiện gửi tin nhắn tới channel với method `Telegram::sendMessage` với `parse_mode` là HTML để thực hiện parse html với đoạn text trên.

Cuối cùng, truy cập endpoint `/contact` để thử thực hiện gửi contact form để kiểm tra thành quả nhé. ^^!
![](https://images.viblo.asia/255fc6e4-e78e-4d41-bf48-e0ac97fe933d.jpg)

# Kết luận
Như vậy, chúng ta đã được Telegram bot và thực hiện gửi tin nhắn tới channel thành công với Telegram Bot API. Hy vọng sau bài viết này các bạn có thể phát triển được nhiều ứng dụng thực tế cho riêng mình từ Telegram như việc áp dụng vào thông báo kết quả công việc hay ứng dụng cảnh bảo an toàn. Chúc các bạn thành công!


Tham khảo tại: 

https://core.telegram.org/bots

https://core.telegram.org/api

https://tutsforweb.com/sending-notifications-to-telegram-messenger-with-laravel/
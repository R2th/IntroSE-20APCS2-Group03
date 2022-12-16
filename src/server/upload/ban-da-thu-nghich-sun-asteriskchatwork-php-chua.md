Bạn có dùng chatwork chứ? Bạn có từng nhận được những tin nhắn tự động trên chatwork bao giờ chưa? Bạn có tò mò rằng những tin nhắn ấy được gửi như thế nào không?

Nếu có thì bạn hãy cùng mình tìm hiểu về **sun-aterisk/chatwork-php** nhé. Và xem việc tạo một project gửi tin nhắn như vậy có khó không ha :)

### 1. Tạo một bot account

Trước khi nghịch ngợm thì bạn hãy tạo 1 account để làm bot nhé. Chúng ta sẽ sử dụng bạn bot để gửi tin nhắn cho hệ thống.

Chỉ đơn giản là đăng ký 1 account trên [chatwork](https://www.chatwork.com/) thôi mà.

Sau khi có tài khoản, bạn hãy truy cập đường dẫn sau: https://www.chatwork.com/service/packages/chatwork/subpackages/api/token.php

và nhập mật khẩu để lấy `api token`. Chúng ta sẽ sử dụng api token này để sử dụng cho những phần tiếp theo nhé. 

### 2. Cài đặt chatwork-php
Cái này thì quá đơn giản ha.
Bạn có thể chạy lệnh:
```
composer require sun-asterisk/chatwork-php
```
hoặc thêm dòng dưới đây vào composer.json và chạy `composer update`
```php:composer.json
"require": {
    "sun-asterisk/chatwork-php": "^0.1.2"
},
```

Xem chi tiết hơn tại [đây](https://github.com/sun-asterisk-research/chatwork-php).

### 3. ChatWork API Documentation
![](https://images.viblo.asia/058dfd3a-125e-466e-afd1-73555ba03acc.png)

Nếu không dùng sun-asterisk/chatwork-php thì bạn có thể tìm hiểu thêm về Chatwork Api Documentation. Tài liệu này cung cấp thông tin khá đầy đủ về những api mà chatwork hỗ trợ cho người dùng. Chi tiết xem tại [đây](https://download.chatwork.com/ChatWork_API_Documentation.pdf).


### 4. Lấy danh sách rooms của Bot

Một trong những việc chúng ta có thể làm với sun-asterisk/chatwork-php chính là lấy danh sách rooms (là những groups mà bot của bạn được add hoặc danh sách bạn bè của bot).

Thử nhé, đơn giản lắm. Đầu tiên mình sẽ tạo 1 controller:
```php
use Illuminate\Http\Request;
use SunAsterisk\Chatwork\Chatwork;
use SunAsterisk\Chatwork\Exceptions\APIException;

class ChatworkController extends Controller
{
    /**
     * Get type of all system report
     *
     * @return array
     */
    public function getRooms(Request $request)
    {
        try {
            $chatwork = Chatwork::withAPIToken(<api_token>);
            $type = $request->get('type', 'all');
            $list = $chatwork->rooms()->list();
            $rooms = [];
            foreach ($list as $room) {
                $room['name'] = htmlspecialchars($room['name']);
                if ($room['type'] == $type || $type == 'all') {
                    array_push($rooms, $room);
                }
            }

            return $rooms;
        } catch (APIException $e) {
            return [];
        }
    }
}
```

>> Trong đó, api_token là token  bạn lấy được ở mục 1.

sau đó, thêm 1 router:
```php
Route::get('/get-rooms', 'ChatworkController@getRooms');
```
Giờ mình sẽ gọi 1 api:
```
http://localhost:8000/get-rooms?type=direct
```
và kết quả thu được sẽ như vậy
![](https://images.viblo.asia/1c7d9cc9-a8fe-4e93-9e36-da9128f373e8.png)

### 5. Gửi tin nhắn nào
Để gửi tin nhắn thì mình sẽ tạo 1 Job là SendMessageByChatwork nhé.

```php:app/Jobs/SendMessageByChatwork.php
<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use SunAsterisk\Chatwork\Chatwork;
use SunAsterisk\Chatwork\Exceptions\APIException;

class SendMessageByChatwork implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $message = "Hello world!";
        try {
            $chatwork = Chatwork::withAPIToken(<api_token>);
            $chatwork->room(<room_id>)->messages()->create($message);
        } catch (APIException $error) {
            throw $error;
        }
    }
}

```

>> Lưu ý: 
>>- api_token: Là token bạn lấy được ở mục 1
>> - room_id: Là id của group bạn đã join hoặc account đã kết bạn với account của bạn.

Sau đó, thực thi job, bot sẽ gửi tin nhắn "Hello world!" tới box mà bạn chỉ định.

Kết quả sẽ như vầy:

![](https://images.viblo.asia/3d65e085-bd55-41de-9140-5e5fa3d83666.png)

[chatwork-php](https://github.com/sun-asterisk-research/chatwork-php) là một trong những open source của bộ phận RnD thuộc Sun-asterisk. Đội ngũ RnD đã xây dựng rất nhiều các open source thú vị và hữu ích khác nữa. Các bạn hãy truy cập https://github.com/sun-asterisk-research để tìm hiểu thêm nhé. Mình cũng sẽ cố gắng chia sẻ nhiều hơn cho các bạn về những OS này. Hi vọng là bài viết của mình sẽ có ích với bạn.

Cảm ơn và hẹn gặp lại bạn trong bài viết tiếp theo.
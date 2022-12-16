Xin chào mọi người! :D 

Nhận thấy Chatwork có public API nên mình muốn làm 1 bản demo nhỏ để push notification lên Chatwork, từ đó để các bạn có thể ứng dụng tạo lời nhắc hay push tự động lên Chatwork như là Update OKR, Daily Report, ... 

Nào mình cùng bắt đầu nhé.
# I. Create project Laravel 7x
Trước tiên là cài project Laravel. Các bạn có thể vào docs của Laravel để xem và cài đặt tại đây [Install Laravel 7x](https://laravel.com/docs/7.x/installation).
Chỉ cần mở command line của các bạn lên và chạy lệnh sau: 

```
 composer create-project --prefer-dist laravel/laravel:^7.0 laravel7x
```
Sau khi chạy lệnh này, laravel framework sẽ được tạo trong thư mục `laravel7x`
![Install laravel 7x](https://images.viblo.asia/2d764bec-3af3-46c6-9081-e504699330e2.PNG)

# II. Get Token Chatwork
Tiếp đến, mình sẽ hướng dẫn cách lấy Token của Chatwork.

Các bạn đăng nhập vào tài khoản của mình, và truy cập vào https://www.chatwork.com/ và click vào Avatar chọn Integrations.
![Integrations](https://images.viblo.asia/fdb2312c-6d0a-40d7-a728-f9534c9dc555.PNG)

Trên page hiển thị đó bạn chọn API Token
![API token](https://images.viblo.asia/59bd7402-bc1f-4330-924d-3930ff4572b9.PNG)

Nhập password của bạn vào và sau đó sẽ hiển thị Token cá nhân của bạn
![Show token API Chatwork](https://images.viblo.asia/ba3a7a1e-8b97-4a0e-b810-83aa84159bb8.PNG)

OK, như vậy bạn đã có Token API của Chatwork cá nhân bạn. Lưu ý là không nên share Token này cho ai khác, kẻo bị mạo danh làm điều không mong muốn hoặc bị lộ các thông tin chat trên Chatwork nhé :D 

Tiếp theo tiến hành test Token API Chatwork vừa lấy được.
![Test Result API Chatwork](https://images.viblo.asia/24bc1ec1-89a9-4b1c-a58f-fb1f718d2fd8.PNG)

Các bạn có thể tham khảo tài liệu tại đây để rõ hơn:
[Chatwork API doccument](https://download.chatwork.com/ChatWork_API_Documentation.pdf)
# III. Push notification to Chatwork
OK, Tiếp theo mình sẽ code để push notification vào Chatwork nhé.

## 3.1 Install package 
Để push notification, mình dùng package `wataridori/chatwork-sdk`

- Cài đặt package vào project:
```
composer require wataridori/chatwork-sdk
```
![Install wataridori/chatwork-sdk](https://images.viblo.asia/e555d1c9-8969-4ebb-92f8-24c89c2cd1d9.PNG)

- Thêm Alias cho package vừa install vào `config/app.php`:
```
'ChatworkSDK' => \wataridori\ChatworkSDK\ChatworkSDK::class,
```

## 3.2 Create command run Batch
Tiếp theo, sử dụng command để tạo Batch mới.

```
php artisan make:command PushChatwork
```

Sau đó, mở file `app/Console/Commands/PushChatwork.php` batch đã tạo ra và sửa thành:
```
<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use wataridori\ChatworkSDK\ChatworkApi;
use wataridori\ChatworkSDK\ChatworkRoom;
use wataridori\ChatworkSDK\ChatworkSDK;

class PushChatwork extends Command
{
    protected $signature = 'push:chatwork';

    protected $description = 'Command description';

    private $apiKey = 'API_CHATWORK_TOKEN'; //Token bạn đã lấy được

    public function __construct()
    {
        parent::__construct();

        ChatworkSDK::setApiKey($this->apiKey);
    }

    public function handle()
    {
        $api = new ChatworkApi();

        // Get user rooms list
        $rooms = $api->getRooms();
        foreach ($rooms as $room) {
            $room = new ChatworkRoom($room['room_id']);
            $members = $room->getMembers();
            $room->sendMessageToList($members, 'This is test message'); //Gửi message tới toàn bộ member trong room
        }
    }
}

```
- Chạy command để push notification:
```
php artisan push:chatwork
```

Và tận hưởng thành quả của mình nào
![Test result](https://images.viblo.asia/0fd985cf-5a35-4d65-b771-01217ec9f15e.PNG)

# IV. Tổng kết
Như vậy mình đã hướng dẫn xong cách tạo batch trên Laravel push notification đến Chatwork thành công! Hy vọng sẽ giúp đỡ được ai đó trong quá trình tìm hiểu.

Từ ví dụ sample như này các bạn có thể áp dụng vào cho chính mình để tạo schedule nhắc nhở update OKR, Daily Report ...

Hẹn gặp lại các bạn vào bài viết sau nhé! Thanks you for reading :D 

## Tham khảo
1. https://github.com/wataridori/chatwork-sdk
2. https://download.chatwork.com/ChatWork_API_Documentation.pdf
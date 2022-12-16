### Mở đầu  

[ChatWork](https://go.chatwork.com/) là một Ứng dụng của NHẬT BẢN tích hợp tất cả trong một: tính năng chat, chỉ định công việc, gọi thoại/video và chia sẻ tập tin.
Nó giúp cho nhân viên dễ dàng làm việc theo nhóm bằng hình thức đối thoại trực tiếp, tăng khả năng tương tác và nâng cao hiệu quả công việc. Có hơn 185,000 công ty, khu vực sử dụng [Chatwork](https://go.chatwork.com/) trao đổi thông tin, nâng cao hiệu suất và đối thoại để thành công.

Hiện tại, có rất nhiều công ty, tổ chức đang tích hợp các tính năng của chatwork cho project Laravel của mình. Chính vì vậy, hôm nay mình xin giới thiệu đến các bạn package [Laravel-Chatwork](https://github.com/sun-asterisk-research/laravel-chatwork) do [Sun* R&D Lab](https://research.sun-asterisk.com/vi) phát triển. Hy vọng phần nào có thể giúp cho việc sử dụng các tính năng của Chatwork cho laravel trở nên thuận tiện và dễ dàng hơn :):):) . 

Github: https://github.com/sun-asterisk-research/laravel-chatwork

Package: https://packagist.org/packages/sun-asterisk/laravel-chatwork
### Nội dung
#### I. Create project Laravel
Để sử dụng package, trước tiên ta cần tạo 1 project Laravel
 ```
composer create-project --prefer-dist laravel/laravel sun-asterisk/laravel-chatwork
 ```
 #### II. Install Required Composer Packages 
 Chúng ta cần thiết lập các gói packages cần thiết cho project.
```shell
composer require sun-asterisk/laravel-chatwork
```
Tiếp theo chúng ta cần cập nhật `Provider` bằng lệnh:
```objectivec
php artisan vendor:publish --provider="SunAsterisk\Chatwork\Laravel\ServiceProvider"
```
#### III. Configure
Đầu tiên bạn cần đăng ký 1 API Key tại [đây](https://www.chatwork.com/service/packages/chatwork/subpackages/api/token.php).
Sau đó thêm API Key của bạn vào file `.env`
```objectivec
CHATWORK_API_KEY = your_api_key
```
#### IV. Usage
Bạn có thể sử dụng các tính năng của Chatwork thông qua 1 provided facade.
```php
use Chatwork;

$me = Chatwork::me();
$members = Chatwork::room($roomId)->members()->list();
```

Bạn cũng có thể sử dụng dependency injection
```php
use SunAsterisk\Chatwork\Chatwork;

class ChatworkCommand extends Command
{
    public function handle(Chatwork $chatwork)
    {
        $message = $chatwork->toAll()->text('Hi there');
        $chatwork->room($roomId)->messages()->create($message);
    }
}
```
#### V. Các tính năng của chatwork 
Tiếp theo, mình xin điểm qua một vài tính năng của Chatwork sử dụng trong package.

##### Xem thông tin cá nhân của mình
```php
$me = Chatwork::me();
```
##### Kiểm tra số chat, số To chưa đọc
```php
$status = Chatwork::my()->status();
```
##### Lấy ra danh sách các task
```php
$tasks = Chatwork::my()->tasks();
```
##### Lấy ra danh sách các yêu cầu contact đang chờ xác nhận 
```php
$requests = Chatwork::incomingRequests()->list();
```
##### Chấp nhận yêu cầu contact
```php
Chatwork::incomingRequests()->accept($roomId);
```
##### Từ chối yêu cầu contact 
```php
Chatwork::incomingRequests()->reject($roomId);
```
##### Lấy ra danh sách danh bạ
```php
$users = Chatwork::contacts();
```
##### Lấy ra danh sách chat của mình
```php
$rooms = Chatwork::rooms()->list();
```
##### Tạo group chat mới
```php
Chatwork::rooms()->create([
        'members_admin_ids' => '123,542,1001',
        'members_member_ids' => '21,344',
        'members_readonly_ids' => '15,103',
        'name' => 'Test project',
        'description' => "A demo project",
        'icon_preset' => 'event, check',
    ]);
```
Trong đó:
* `members_admin_ids`: Mảng acount ID các admin user.
* `members_member_ids`: Mảng acount ID các member user.
* `members_readonly_ids`: Mảng acount ID các Readonly user.
* `name`: Tên Group Chat.
* `description`: Text giải thích description của Group Chat.
* `icon_preset`: Các loại icon trong Group Chat
##### Lấy thông tin chat room 
```php
Chatwork::room($roomId)->detail();
```
##### Cập nhật thông tin chat room
```php
Chatwork::room($roomId)->updateRoomInfo([
    'description' => 'group chat description',
    'icon_preset' => 'meeting',
    'name' => 'Website renewal project'
]);
```
##### Xóa nhóm chat
```php
Chatwork::room($roomId)->delete();
```
##### Rời nhóm chat 
```php
Chatwork::room($roomId)->leave();
```
##### Lấy danh sách tin nhắn từ 1 chat room 
```php
Chatwork::room($roomId)->messages()->list();
```
##### Gửi 1 tin nhắn trong chat room
```php
$message = Chatwork::message()->to($accountId, "Boy de thuong")->text("Hello Baby");
Chatwork::room($roomID)->messages()->create((string) $message);
```
##### Xóa 1 tin nhắn trong chat room
```php
Chatwork::room($roomID)->messages()->delete($messageID);
```
##### Sửa 1 tin nhắn trong chat room
```php
$message = (string) Chatwork::message()->toAll()->text("Hi everybody");
Chatwork::room($roomID)->messages()->update($messageID, $message);
```
##### Xóa 1 tin nhắn trong chat room 
```php
Chatwork::room($roomID)->messages()->delete();
```
##### Đánh dấu 1 tin nhắn thành đã đọc trong chat room
```php
Chatwork::room($roomID)->messages()->markAsRead($messageId);
```
##### Đánh dấu 1 tin nhắn thành chưa đọc trong chat room
```php
Chatwork::room($roomID)->messages()->markAsUnRead($messageId);
```
##### Lấy danh sách member trong chat room
```php
Chatwork::room($roomID)->members()->list();
```
##### Lấy danh sách task trong  chat room
```php
Chatwork::room($roomID)->tasks()->list();
```
##### Lấy danh sách task trong  chat room
```php
Chatwork::room($roomID)->files()->list();
```
Trên đây là 1 vài tính năng hữu ích của **chatwork** sử dụng  trong package. Chi tiết xem tại [Chatwork API](http://developer.chatwork.com/vi/endpoints.html)
### Kết luận
Trên đây là toàn bộ những chia sẻ của mình về 1 package laravel-chatwork. Rất mong nhận được ý kiến đóng góp của các bạn để giúp cho package được hoàn thiện hơn.
### Contributing 
+ Github: https://github.com/sun-asterisk-research/laravel-chatwork
+ Fork
+ Clone
+ Viết code và unit test
+ Push code
+ Pull Request
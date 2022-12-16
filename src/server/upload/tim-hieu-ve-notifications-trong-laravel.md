### Giới thiệu
![](https://images.viblo.asia/fbfdd5b3-0447-49e5-b2ae-78c9bdf6a4f3.PNG)
Thông báo (notification) là gì?
- Một thông báo (notification) là một tin nhắn, thông điệp được hiển thị trong một thời gian ngắn trên thanh trạng thái của thiết bị nhằm gây sự chú ý của người dùng.
-  Nó tương tự như một tin nhắn thông thường (SMS ), tuy nhiên nó khác SMS là dịch vụ này hiện nay là hoàn toàn miễn phí và cần có kết nối internet mới có thể gửi và nhận notification. và notification chỉ có thể gửi cho ứng dụng mà nhà phát triển đã đăng ký và người dùng có cài ứng dụng đó.
- Các notification này sẽ hiển thị trên thanh trạng thái ở phía trên cùng của màn hình.
- Thông thường một thông báo là được tự động kích hoạt nhằm thông báo tới người dùng là ứng dụng đó đã hoàn thành một công việc nào đó. Hoặc bạn có thể gửi thông tin khuyễn mãi tới cho khách hàng của bạn, mời khách hàng tham gia một sự kiện nào đó...
### Nội dung chính
Và các bạn thấy đấy, một trang web hay một ứng dụng không thể nào thiếu được tính năng Notifications. Chính vì vậy Laravel có hỗ trợ rất đầy đủ cho tính năng này:
- Mail Notifications
- Database Notifications
- Broadcast Notifications
- SMS Notifications
- Slack Notifications

Tạo một notification với command khá là đơn giản:
```bash
php artisan make:notification ConfirmAccount
```
### 1. Mail Notifications:
![](https://images.viblo.asia/e4145678-9c76-451e-9098-56ec72e84791.png)
Một hình thức notifications khá phổ biến cho trang web đó chính là Mail Notifications. Một số trường hợp chúng ta có thể dùng nó như: Mail thông báo đăng ký tài khoản thành công, đổi mật khẩu thành công, confirm tài khoản, hay confirm đơn hàng chẳng hạn,...
Như hôm họ mình có bắt Grab taxi bằng ứng dụng của Grab, sau khi mình kết thúc chuyến đi và thanh toán thành công. Hệ thống của Grab cũng gửi một email thông báo hóa đơn cho mình với nội dung như trên.
```php
/**
 * Get the mail representation of the notification.
 *
 * @param  mixed  $notifiable
 * @return \Illuminate\Notifications\Messages\MailMessage
 */
public function toMail($notifiable)
{
   return (new MailMessage)->view(
        'emails.receipt', ['invoice' => $this->invoice]
    );
}
```
Và chúng ta cần tạo một blade để hiển thị trong mail.
### 2. Database Notifications:
![](https://images.viblo.asia/24730233-35dd-4bd6-a17d-af320505840a.png)
Notifications là một phần dữ liệu khá quan trọng, và đương nhiên một blog chia sẻ kiến thức như viblo thì nó không thể nào thiếu được. Như trên hình ta có thể thấy các notifications của viblo thường thông báo về việc: Upvote bài viết, comment; Clip bài post;... Và để hiển thị được lịch sử  thì các notifications phải được lưu vào trong bảng dữ liệu. Chúng ta chỉ cần chạy command bên dưới, Laravel đã tạo cho chúng ta một migration khá là đầy đủ phục vụ việc lưu trữ các notifications.
```
php artisan notifications:table

php artisan migrate
```
Sau khi chạy xong command, db sẽ thêm 1 bảng notifications với các trường như:
```php
Schema::create('notifications', function (Blueprint $table) {
    $table->uuid('id')->primary();
    $table->string('type');
    $table->morphs('notifiable');
    $table->text('data');
    $table->timestamp('read_at')->nullable();
    $table->timestamps();
});
```
Tại function via các bạn hãy sử dụng return database để dữ liệu được lưu lại trong db.
```php
/**
 * Get the notification's delivery channels.
 *
 * @param  mixed  $notifiable
 * @return array
 */
public function via($notifiable)
{
    return ['database'];
}
```
Và sử dụng function toArray để event trả ra một data.
```php
/**
 * Get the array representation of the notification.
 *
 * @param  mixed  $notifiable
 * @return array
 */
public function toArray($notifiable)
{
    return [
        'invoice_id' => $this->invoice->id,
        'amount' => $this->invoice->amount,
    ];
}
```

### 3. Broadcast Notifications:
Chúng ta chỉ cần khai báo trong function via là chúng ta đã broadcast được một event rồi.
```php
/**
 * Get the notification's delivery channels.
 *
 * @param  mixed  $notifiable
 * @return array
 */
public function via($notifiable)
{
    return ['database', 'broadcast'];
}
```
Và bên client thì chúng ta dùng Laravel echo để subcribe channel cũng như listen event notification để lấy dữ liệu.
```php
Echo.private('App.User.' + userId)
    .notification((notification) => {
        console.log(notification.type);
    });
```
### 4. SMS Notifications:
Gửi message notification trong Laravel được cung cấp bởi [Nexemo](https://www.nexmo.com/). Trước khi gửi tin nhắn thông qua Nexemo chúng ta cần cài đặt **laravel/nexmo-notification-channel**:
```php
composer require guzzlehttp/guzzle
```
Chúng ta cần cài đặt trong *config/services.php*
```php
'nexmo' => [
    'key' => env('NEXMO_KEY'),
    'secret' => env('NEXMO_SECRET'),
    'sms_from' => '15556666666',
],
```
```php
/**
 * Get the Nexmo / SMS representation of the notification.
 *
 * @param  mixed  $notifiable
 * @return NexmoMessage
 */
public function toNexmo($notifiable)
{
    return (new NexmoMessage)
                ->content('Your SMS message content')
                ->from('15554443333');
}
```
Routing SMS Notifications:
```php
<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * Route notifications for the Nexmo channel.
     *
     * @param  \Illuminate\Notifications\Notification  $notification
     * @return string
     */
    public function routeNotificationForNexmo($notification)
    {
        return $this->phone;
    }
}
```
### 5. Slack Notifications:
```php
composer require guzzlehttp/guzzle
```

```php
/**
 * Get the Slack representation of the notification.
 *
 * @param  mixed  $notifiable
 * @return SlackMessage
 */
public function toSlack($notifiable)
{
    $url = url('/exceptions/'.$this->exception->id);

    return (new SlackMessage)
        ->error()
        ->content('Whoops! Something went wrong.')
        ->attachment(function ($attachment) use ($url) {
            $attachment->title('Exception: File Not Found', $url)
                       ->content('File [background.jpg] was not found.');
        });
}

```
Và kết quả ta thu được một slack notificatio như sau:
![](https://images.viblo.asia/ddea6526-874d-489e-b744-8d60e5b54311.png)
Routing Slack Notifications:
```php
<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * Route notifications for the Slack channel.
     *
     * @param  \Illuminate\Notifications\Notification  $notification
     * @return string
     */
    public function routeNotificationForSlack($notification)
    {
        return 'https://hooks.slack.com/services/...';
    }
}
```
### Kết Luận
Đọc đến đây chắc các ban cũng đã hiểu các chức năng của notification cũng như biết cách sử dụng nó cho trang web có sử dụng Laravel rồi đúng không nào. Hy vọng mọi người có thể lựa chọn các notifications phù hợp và cần thiết cho website của mình
![](https://images.viblo.asia/de712910-d0ef-4e55-aaf8-d7cffca1e892.jpg)
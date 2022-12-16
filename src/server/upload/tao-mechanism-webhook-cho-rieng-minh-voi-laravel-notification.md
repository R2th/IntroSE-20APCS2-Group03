# Mở đầu
Hôm nay mình sẽ hướng dẫn cho các bạn cách tạo một webhook mechanism cho riêng mình. từ lâu chúng ta đã biểt đến và dùng chức năng webhook của github, facebook ... .Đại loại là họ sẽ cho mình nhập 1 Payload URL và chọn sự kiện để khi có sự kiện đó thì github cũng send http request đến  Payload URL của người dùng.
![](https://images.viblo.asia/1c1ffc57-7a82-4cfe-9e57-38ddbff49a33.png)


 Tương tự vậy, ở demo nay chúng ta sẽ cho phép người dùng nhập webhook url của họ. và khi có 1 sự kiện nào đó trên hệ thống chúng ta thì hệ thống cũng tiến hành send http request đến url của họ (request gồm body và header).
# Webhook là gì?
# Cài đặt Dependencies
Đầu tiên chúng ta cần cài đặt package để cho việc gửi HTTP request. Ở đây mình dùng thư viện khá phổ biến là Guzzle:
```
composer require guzzlehttp/guzzle:~6.0
```
# Migrate dữ liệu
Tiếp theo chúng ta tạo bảng user. ở ví dụ demo này thì mình sẽ lưu `name`, `email`, `password`, `api_token` và đặc biệt có thêm trường `webhook_url` đây chính là enpoint của người dùng khi đăng ký Webhook End Point trên hệ thống của chúng ta.
```php
<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');
            $table->string('api_key');
            $table->string('webhook_url')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}

```
# Tạo model
Tiếp theo là tạo model User
```php
namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'api_key', 'webhook_url',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token', 'api_key',
    ];
    
    /**
     * @return string
     */
    public function getSigningKey()
    {
        return $this->api_key;
    }

    /**
     * @return string
     */
    public function getWebhookUrl()
    {
        return $this->webhook_url;
    }
}

```

Model này khá dễ hiểu rồi. mình có thêm 2 hàm `getSigningKey` và `getWebhookUrl` để lấy `api_key` và `webhook_url`
# Tạo notification channels
Tiếp theo chúng ta cần tạo 1 notification channel. Thì laravel có hỗ trợ chúng ta tạo cũng như custom notification channels ở [Tại đây](https://laravel.com/docs/5.6/notifications#custom-channels).

Tiến hành tạo WebhookChannel

```App\Channels\WebhookChannel.php
<?php
namespace App\Channels;
use GuzzleHttp\Client;
use Illuminate\Log\Logger;
use Illuminate\Notifications\Notifiable;
use Illuminate\Notifications\Notification;
class WebhookChannel
{
    /**
     * @var Client
     */
    private $client;
    /**
     * @var Logger
     */
    private $logger;
    public function __construct(Client $client, Logger $logger)
    {
        $this->client = $client;
        $this->logger = $logger;
    }
    /**
     * @param Notifiable $notifiable
     * @param Notification $notification
     * @throws WebHookFailedException
     */
    public function send($notifiable, Notification $notification)
    {
    }
}

```

Function send là nơi chúng ta viết code để thực hiện việc send http request đến endpoint (webhook_url) của người dùng. 

Tiếp theo mình tiến hành viết hàm send

Đầu tiên ,

```php
/**
     * @param Notifiable $notifiable
     * @param Notification $notification
     * @throws WebHookFailedException
     */
    public function send($notifiable, Notification $notification)
    {
        if (method_exists($notification, 'toWebhook')) {
            $body = (array) $notification->toWebhook($notifiable);
        } else {
            $body = $notification->toArray($notifiable);
        }
        $timestamp = now()->timestamp;
        $token = str_random(16);
        // Tạo header cho request webhook . cái này để người dùng có thể xác minh request gửi lên là từ hệ thống của chúng ta mà không phải từ hệ thông khác
        $headers = [
            'timestamp' => $timestamp,
            'token' => $token,
            'signature' => hash_hmac(
                'sha256',
                $token . $timestamp,
                $notifiable->getSigningKey()
            ),
        ];
        
        // Tiếp theo chúng ta tạo 1 request sử dụng GuzzleHttp để gửi request
        $request = new Request('POST', $notifiable->getWebhookUrl(), $headers, json_encode($body));

        try {
            $response = $this->client->send($request);
            // kiểm tra nếu không nhận được status code = 200 thì sẽ báo lỗi
            if ($response->getStatusCode() !== 200) {
                throw new WebHookFailedException('Webhook received a non 200 response');
            }
            // Lưu lại log
            $this->logger->debug('Webhook successfully posted to '. $notifiable->getWebhookUrl());

            return;

        } catch (ClientException $exception) {
            if ($exception->getResponse()->getStatusCode() !== 410) {
                throw new WebHookFailedException($exception->getMessage(), $exception->getCode(), $exception);
            }
        } catch (GuzzleException $exception) {
            throw new WebHookFailedException($exception->getMessage(), $exception->getCode(), $exception);
        }

        $this->logger->error('Webhook failed in posting to '. $notifiable->getWebhookUrl());
    }
```

Vậy là xong 1 notification channels. Tiếp theo mình chỉ việc gọi Webhook notification và dùng thôi.
# Thực hiện notification webhook
Tiếp theo chúng ta tạo notification bằng lệnh 
```
php artisan make:notification SomethingHappenedNotification
```
Tiến hành viết code.


```App\Notifications\SomethingHappenedNotification.php
<?php
namespace App\Notifications;
use App\Channels\WebhookChannel;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
class SomethingHappenedNotification extends Notification implements ShouldQueue
{
    use Queueable;
    /**
     * @var string
     */
    private $message;
    /**
     * Create a new notification instance.
     *
     * @param string $message
     */
    public function __construct($message)
    {
        //
        $this->message = $message;
    }
    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return [WebhookChannel::class];
    }
    public function toWebhook($notifiable)
    {
        return [
            'message' => $this->message,
        ];
    }
    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [];
    }
}
```

ok. vậy là đã xong . giờ chúng ta có thể tạo các sự kiện và send notification đến endpoint mà người dùng đã đăng ký.

```php
use App\Notifications\SomethingHappenedNotification;

$user->notify(new SomethingHappenedNotification($massage));
```
# Kết luận
Cảm ơn các bạn đã đọc đến đây. 

Tham khảo : https://laravel.com/docs/5.6/notifications#custom-channels, 

Source code: https://github.com/phamtuananh1996/laravel-webhook-demo
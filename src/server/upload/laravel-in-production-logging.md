## LARAVEL - Logging
Tiếp nối series về `laravel in production`, bài viết này mình sẽ chia sẻ về việc thực hiện ghi `log` trên server laravel.

## 1. Giới thiệu về laravel logging
Hãy tưởng tượng, một ngày đẹp trời bạn đang nhâm nhi cốc cafe và `chill` theo giai điệu mà mình yêu thích. **BOOM**, bạn nhận được một ticket `điều tra` lỗi và cần trả lời: tại sao lại xảy ra, mức độ ảnh hưởng như thế nào, xử lý nó ra làm sao? Okie, cũng đơn giản thôi, vào check `log` nào. Sau khi hì hục đọc log trên server, filter các kiểu. Bạn nhận ra, không có log cần thiết để điều tra `cái lỗi này` :cry:

Ở trên chỉ là 1 trường hợp mà `có thể` bạn đã gặp phải trong khi làm việc. Và sau những ticket điều tra, hầu như tất cả chúng ta đều nhận ra sự quan trọng của việc đặt `log` và `ghi lại` những thông tin cần thiết để phục vụ điều tra cũng như truy vết lỗi.

Thật may, trong laravel, việc ghi log khá là đơn giản.
```php
Log::debug($message);
```
### Log level
Mặc định laravel hỗ trợ các log level sau: `emergency`, `alert`, `critical`, `error`, `warning`, `notice`, `info`, `debug`
Tùy vào `mức độ` mà các bạn sẽ chọn level phù hợp để ghi log. 

```php
Log::emergency($message);
Log::alert($message);
Log::critical($message);
Log::error($message);
Log::warning($message);
Log::notice($message);
Log::info($message);
Log::debug($message);
```

### Log driver
Theo document của laravel, laravel hỗ trợ các channel sau:
| Name | Description |
|-|-|
| **stack** | A wrapper to facilitate creating "multi-channel" channels |
| **single** | A single file or path based logger channel (StreamHandler) |
| **daily** | A RotatingFileHandler based Monolog driver which rotates daily |
| **slack** | A SlackWebhookHandler based Monolog driver |
| **papertrail** | A SyslogUdpHandler based Monolog driver |
| **syslog** | A SyslogHandler based Monolog driver |
| **errorlog** | A ErrorLogHandler based Monolog driver |
| **monolog** | A Monolog factory driver that may use any supported Monolog handler |
| **custom** | A driver that calls a specified factory to create a channel |

*Note:* các bạn có thể hiểu driver là phương thức mà chúng ta sẽ ghi lại log

Ví dụ:
- single: bạn sẽ ghi log của mỗi ngày vào 1 file
- slack: bạn sẽ gửi log vào 1 slack channel

## 2. Logging in production
Cách sử dụng log khá là đơn giản, tuy nhiên, việc đặt log ở đâu, log những thông tin gì thì lại làm chúng ta đau đầu.
Nếu chúng ta log toàn bộ thông tin thì sẽ quá lãng phí tài nguyên của hệ thống
Log không đầy đủ, không đúng chỗ thì chúng ta không có đủ dữ liệu phục vụ điều tra

Dưới đây là 1 số điều mà mình đã rút ra trong quá trình làm việc với log trong các dự án thực tế

### Permission
Ơ, `permission` thì có vẹo gì đâu mà phải chú ý nhỉ :lol:
```php
// config/logging.php
    'channels' => [
        'daily' => [
            'driver' => 'daily',
            'path' => storage_path('logs/laravel.log'),
            'level' => 'debug',
            'days' => 0,
            'permission' => 0755,
        ],
    //....
```

Việc set permission cho các file log không chính xác sẽ ảnh hưởng khá lớn tới 1 số tác vụ liên quan tới các file log. Ví dụ như:

- Saving. Đối với 1 số dự án, các bạn lưu trữ log trên server chứ không sử dụng các service của bên thứ 3 để quản lý log. Vậy nên để tối ưu tài nguyên của hệ thống, chúng ta thường phải chạy các tác vụ để zip, chuyển các file qua server khác để lưu trữ.

- Deploying. Việc triển khai hệ thống hiện nay, chúng ta thường sử dụng các tool hỗ trợ như `rocketeer`, `deployer`, `capistrano`. Thư mục `storage` - thường là nơi các bạn lưu trữ log - là thư mục được thường share giữa các releases và các server (trong trường hợp hệ thống chạy nhiều server). Vậy nên, nếu không setting permission phù hợp, các bạn sẽ gặp lỗi khi thực hiện auto-deploy, khi tạo symbolic link hay copy thư mục storage chẳng hạn.

- Viewing. `"Em ơi, có lỗi rồi! lên server check giúp anh/chị"`, Các bạn thấy câu này có quen không :lol: Việc ssh lên server và check log thường sẽ không thể tránh khỏi. Nếu user mà bạn dùng để `ssh` không có quyền đọc file log thì bạn sẽ lại mất công `chmod` nó. Thậm chí, khi bạn không có quyền `sudo`, bạn sẽ chẳng làm gì được nó cả =))

### Log channel
Việc sử dụng `channel` mặc định sẽ gây ảnh hưởng khá nhiều tới việc điều tra, nhất là khi dữ liệu logging lớn. Mọi thứ sẽ trộn vào nhau và bạn cần phải filter rất nhiều để có được dữ liệu mà mình mong muốn.

Đối với dự án của mình, team mình thực hiện ghi log theo chức năng. Như chức năng login / logout, mình sẽ sử dụng channel riêng. Hay tính năng gắn tag, hủy tag mình cũng sử dụng channel riêng. Việc này giúp mình khá nhiều khi cần phải điều tra về 1 tính năng cụ thể.

```php
// config/logging.php
'login_history' => [
    'driver' => 'single',
    'path' => storage_path('logs/login_history.log'),
    'level' => 'debug',
    'permission' => 0755,
],

'tag_logging' => [
    'driver' => 'daily',
    'path' => storage_path('logs/tags.log'),
    'level' => 'debug',
    'days' => 0,
    'permission' => 0755,
],

// somewhere....
Log::channel('login_history')->info($info);
Log::channel('tag_logging')->debug($info);
```

### Exception handler
Cái này khá là nhiều bạn đã biết và việc ghi lại lỗi khi xảy ra exception là điều hiển nhiên.

Laravel có sãn `Handler` để xử lý mỗi khi có exception xảy ra. Class này chứa 2 phương thức: `report` và `render`. Phương thức `render` sẽ cho phép chúng ta chọn cách mà exception được ghi lại, thường chúng ta sử dụng mặc định. Còn phương thức `report` sẽ convert exception và ghi lại vào file log. 

Tuy nhiên, chúng ta thường thực hiện việc report (gửi tin nhắn) ngay sau khi exception xảy ra để có những đối ứng cần thiết. Tùy vào dự án mà các bạn có thể gửi thông tin lên `sentry`, `bugsnag` hay `slack`, `chatwork`

Có khá nhiều các thông tin hữu ích có trong exception mà bạn có thể lấy ra để ghi log cũng như gửi report.
Dưới đây là ví dụ mà bên mình dùng (gửi tin nhắn tới `slack` và `chatwork`):
```php
<?php
// app/Exceptions/Handler.php

    /**
     * Report or log an exception.
     *
     * @param Exception $exception
     * @return mixed|void
     * @throws Exception
     */
    public function report(Exception $exception)
    {
        parent::report($exception);

        $this->handleNotification($exception);
    }

    /**
     * Handle notification
     *
     * @param \Exception $exception
     * @return void
     */
    public function handleNotification(Exception $exception): void
    {
        if ($this->shouldntReport($exception)) {
            return;
        }

        $title = get_class($exception);                                     // Get class đã gây ra lỗi
        $trance = $exception->getTraceAsString();                           // Lấy stack trace
        $e = $this->convertException($exception);                           // Lấy thông tin của file và line lỗi
        $auth = $this->getAuth();                                           // Lấy thông tin của user gây lỗi
        $url = $this->getUrl();                                             // Url gặp lỗi
        $gitInfo = $this->getGitInfo();                                     // Version của git
        $infoServer = $this->getInfoServer();                               // Thông tin của server (ip)
        $context = $e + $auth + $url + $gitInfo + $infoServer + $dataLine;

        // Send exception to slack
        $detail = $this->getDetailException($exception);                    // Trim $exception->toString()
        $this->toSlack($title, $context + $detail);                         // Tửi tin nhắn tới slack

        // Send exception to chatwork
        $detail = $this->getDetailException($exception, $this->limitString);// Trim $exception->toString()
        $this->toChatwork($title, $context + $detail, $trance);             // Gửi tin nhắn tới chatwork
    }
```

Nếu các bạn không muốn `report` một số `exception`, các bạn có thể thêm nó vào biến `$dontReport` trong `Handler`. Nó sẽ tự động lọc và chỉ report các exception phù hợp.

```php
protected $dontReport = [
    \Illuminate\Auth\AuthenticationException::class,
    \Illuminate\Auth\Access\AuthorizationException::class,
    \Symfony\Component\HttpKernel\Exception\HttpException::class,
    \Illuminate\Database\Eloquent\ModelNotFoundException::class,
    \Illuminate\Validation\ValidationException::class,
];
```

### Database logging
Ở trên chúng ta đã thực hiện việc lưu log hành động trên hệ thống laravel. Tuy nhiên, đôi khi do logic sai dẫn tới việc lưu trữ dữ liệu không đúng. Cũng có thể do query quá lớn dẫn tới việc thực hiện query gây ra sai sót. Vậy chúng ta cần làm gì?

Ghi lại log trước khi thao tác với cơ sở dữ liệu? Việc này có thể làm được nhưng bạn cần phải lặp lại code ở `rất rất nhiều` nơi, và có thể quên một số chỗ. Có 1 cách tối ưu hơn, chúng ta sẽ sử dụng phương thức có sẵn `DB::listen()` để mỗi khi có thao tác tới cơ sở dữ liệu, chúng ta sẽ ghi lại câu query đó. Các bạn cũng có thể `filter` để tránh ghi lại những query không cần thiết

```php
// AppServiceProvider
/**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        DB::listen(function ($query) {
            try {
                if ($this->filterQuery($query)) {
                    Log::channel('query_history')->debug("QUERY TIME: {$query->time}, EXECUTE SQL: {$sql}");
                }
            } catch (\Exception $e) {
                Log::info($e);
            }
        });
    }
    // ...
```

### Log Formatter
Một điểm khá hay là laravel cho phép chúng ta thay đổi format mặc định khi ghi ra log và các bạn có thể format `theo ý của mình`. *Cái này mình không dùng bao giờ, thấy nó hay hay nên thêm vào thôi :3*

Bạn cần tạo 1 `CustomizeFormatter` và cập nhật lại config của `channel`, thêm `'tap' => [App\Logging\CustomizeFormatter::class]` như dưới:
```php
// config/logging.php
'single' => [
    'driver' => 'single',
    'tap' => [App\Logging\CustomizeFormatter::class],
    'path' => storage_path('logs/laravel.log'),
    'level' => 'debug',
],

// app\Logging\CustomizeFormatter.php
<?php

namespace App\Logging;

use Monolog\Formatter\LineFormatter;

class CustomizeFormatter
{
    /**
     * Customize the given logger instance.
     *
     * @param  \Illuminate\Log\Logger  $logger
     * @return void
     */
    public function __invoke($logger)
    {
        foreach ($logger->getHandlers() as $handler) {
            $handler->setFormatter(new LineFormatter(
                '[%datetime%] %channel%.%level_name%: %message% %context% %extra%'
            ));
        }
    }
}
```

### Log Viewing
Mỗi bạn, mỗi dự án sẽ có cách `đọc` log khác nhau. Bình thường các bạn đọc log như thế nào? Dưới đây là một số cách mà mình đã dùng để lấy log và đọc.

- `ssh` lên server, đọc từng file. Nếu số lượng server nhiều hay số lượng file cần check lớn, cách này không hợp lý. Ngoài ra bạn cần có quyền ssh vào server đồng thời biết sử dụng `vim`
- Download log từ server xuống máy local và sử dụng 1 số editor để `find`. Cách này khá ổn, nhưng như cách trên, bạn cần có quyền ssh vào server để download file xuống. Chúng ta có thể tự động hóa nó bằng cách viết `script` (sử dụng `rsync` hay `scp`) hoặc sử dụng các tool như `ansible`
- Sử dụng ứng dụng bên thứ 3 như `sentry`, `bugsnag`. Mình chỉ cần login vào và xem thôi.
- Sử dụng `FILE_DRIVER` của bên thứ 3 (như là `aws s3`, ...). Tương tự cách trên, chúng ta chỉ việc vào `amazon console` và filter.


### Lời Kết
Ở trên, mình mới chỉ đề cập tới cách ghi log mà chưa nói tới cách đặt log. Việc đặt log như thế nào, vị trí nào cho hợp lý nó phụ thuộc khá nhiều vào developer cũng như kinh nghiệm của họ. Nó không có một quy chuẩn nào cả. Chỉ có một điều mà mình nghĩ chúng ta nên tuân thủ: `chỉ log những thông tin cần thiết` :smiley:
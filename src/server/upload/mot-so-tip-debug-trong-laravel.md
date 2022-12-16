Xin chào anh em, cũng lâu lâu mình cũng chưa viết bài chia sẻ. Trong lân này mình muốn chia sẻ cho các bạn về các kỹ thuật debug trong Laravel nhé. Như các bạn biết đấy, khi chúng ta code thì hầu hết đa phần chúng ta không thể nào code đúng ngay được, có khi gặp những lỗi mình không biết nó từ đâu sinh ra. Vì vậy, việc debug rất quan trọng khi chúng ta lập trình. Trong bài viết này, mình sẽ giới thiệu các bạn cách sử dụng một số công cụ hỗ trợ việc phát triển và debug trong Laravel 5 nhé.
![](https://images.viblo.asia/ba7206dc-0c55-4b2f-a95c-b6ed5f45a8ae.jpg)

Đầu tiên chúng ta sẽ tải project mới về bằng `composer` nhé
```PHP
composer create-project --prefer-dist laravel/laravel demo_laravel_scout
```
Sau đó chúng ta vào file `.env` để config database
```PHP
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=test
DB_USERNAME=root
DB_PASSWORD=
```
Chúng ta sẽ thực thi câu lệnh `php artisan migrate` để nó `migration` các bảng có sẵn nhé để chúng ta dùng.
Sau đó mình fake dữ liệu bằng cách sau
```PHP
php artisan tinker

factory(App\User::class, 100)->create();
```
Sau đó chúng ta tạo `UserController` nhé.
Xong phần set up cái project mẫu để chúng ta có thể sử dụng các tip debug dưới đây thông qua ví dụ nhé.
# Hàm dd()

Hàm này được dùng trong việc muốn xem xem kết quả trả ra là cái gì. Nó được dùng để phục vụ cho việc bạn muốn xem đầu ra của dữ liệu. Chúng ta thường xuyên sau khi query xong nó trả về cái gì , liệu nó là Collection hay Eloquent, hay là một mảng dữ liệu gì đó. Nhiều khi các bạn sử dụng thư viện `Transformer` để trả về kiểu dữ liệu theo một quy chuẩn nào đó... Việc `dd()` ra dữ liệu đầu ra giúp các bạn dễ dàng trong việc hiển thị kết quả đó ra một cách dễ dàng. 
```PHP
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $users = User::all();
        dd($users);
        
        return $users;
    }
}

```
Bây giờ chúng ta sẽ lấy về tất cả các User nhưng chúng ta không biết kết quả trả về như nào cả thì chúng ta có thể dùng hàm `dd()` để có thể xem được nó trả về những gì nhé.
Kết quả là như này
![](https://images.viblo.asia/3c358676-204b-4f93-9a15-8961d588ab5b.png)
Nếu như  các bạn muốn xem rõ hơn nữa trong User nó có những thuộc tính gì thì các bạn cứ ấn vào để xem nhé, rất chi tiết.
# Hàm var_dump()
Hàm `var_dump()` cũng tương tự như `dd()` , nó cũng sẽ in ra thông tin của biến gồm kiểu dữ liệu của biến và giá trị.

Tương tự như vậy mình cũng sẽ thay đổi code như sau
```PHP
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $users = User::all();
        var_dump($users);
   
        return $users;
    }
}

```
Một điều đặc biệt các bạn sẽ thấy đó chính là khi gặp hàm `var_dump()` chương trình của chúng ta không dừng mà vẫn chạy tiếp cho đến đoạn `return $users`. Vì thế khi muốn dừng thì các bạn phải kết hợp với `die()` nhé
```PHP
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $users = User::all();
        var_dump($users);
        die();
        return $users;
    }
}

```

![](https://images.viblo.asia/b3266798-3f5e-4484-8b94-1bd30d77246a.png)
Nó sẽ trả ra cho các bạn một chuỗi lằng nhằng để format lại các bạn ấn `CTRL + U` của trình duyệt chrome nhé, thì nó sẽ ra cho bạn như này nhìn nó dễ nhìn hơn.
![](https://images.viblo.asia/90101fcb-1b8b-435b-8051-6c42633d6018.png)

# print_r()
Hàm `print_r()` sẽ in biến ra thông tin của biến truyền vào một cách dễ hiểu, nó thường xuyên được kết hợp với thẻ `<pre>` trong các trường hợp in mảng, đối tượng,...

```PHP
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $users = User::all();
        echo "<pre>";
        print_r($users);
        echo "</pre>";
        return $users;
    }
}

```
Kết quả hiển thị 
![](https://images.viblo.asia/2c27be11-2c1a-4f0f-b289-3716b4c31891.png)
Thật dễ dàng phải không các bạn, mình vừa giới thiệu qua một số hàm của PHP rồi. Nối tiếp bài viết, mình sẽ giới thiệu cho các bạn về `Laravel Logger` nhé.
# Laravel Logger
`Logging` là một tính năng phổ biến, và mặc định Laravel sử dụng `Monolog` cho việc ghi tất cả log cần thiết, nó là một thư viện phổ biến `PHP logging`. Một điều mà `Monolog` mà nó mang lại rất hay là nó cung cấp một `interface` chung cho chúng ta có thể viết log bất cứ thứ gì, đơn giản là nó ghi ra file log hay đến sử dụng bến những `third-party log management services`.

`Monolog` có tính linh hoạt cao, nó có thể gửi lỗi mà được log lại vào file , socket, email, databases và một vài các web service khác nữa. `Laravel` thường thiết lập Monolog thông qua file cấu hình.
## Logging configuration
File config logging sẽ nằm ở thư mục `config/logging.php`. Đầu tiên chúng ta sẽ thấy 2 phương thức của Monolog được import vào để hỗ trợ việc xử lý cho các channel. Các bạn sẽ thấy từ khóa được return về  **default** và **channels**. Các kênh là những nơi nhận nhiệm vụ báo log cho chúng ta.
```PHP
return [

    /*
    |--------------------------------------------------------------------------
    | Default Log Channel
    |--------------------------------------------------------------------------
    |
    | This option defines the default log channel that gets used when writing
    | messages to the logs. The name specified in this option should match
    | one of the channels defined in the "channels" configuration array.
    |
    */

    'default' => env('LOG_CHANNEL', 'stack'),

    /*
    |--------------------------------------------------------------------------
    | Log Channels
    |--------------------------------------------------------------------------
    |
    | Here you may configure the log channels for your application. Out of
    | the box, Laravel uses the Monolog PHP logging library. This gives
    | you a variety of powerful log handlers / formatters to utilize.
    |
    | Available Drivers: "single", "daily", "slack", "syslog",
    |                    "errorlog", "monolog",
    |                    "custom", "stack"
    |
    */

    'channels' => [
        'stack' => [
            'driver' => 'stack',
            'channels' => ['daily'],
            'ignore_exceptions' => false,
        ],

        'single' => [
            'driver' => 'single',
            'path' => storage_path('logs/laravel.log'),
            'level' => 'debug',
        ],

        'daily' => [
            'driver' => 'daily',
            'path' => storage_path('logs/laravel.log'),
            'level' => 'debug',
            'days' => 14,
        ],

        'slack' => [
            'driver' => 'slack',
            'url' => env('LOG_SLACK_WEBHOOK_URL'),
            'username' => 'Laravel Log',
            'emoji' => ':boom:',
            'level' => 'critical',
        ],

        'papertrail' => [
            'driver' => 'monolog',
            'level' => 'debug',
            'handler' => SyslogUdpHandler::class,
            'handler_with' => [
                'host' => env('PAPERTRAIL_URL'),
                'port' => env('PAPERTRAIL_PORT'),
            ],
        ],

        'stderr' => [
            'driver' => 'monolog',
            'handler' => StreamHandler::class,
            'formatter' => env('LOG_STDERR_FORMATTER'),
            'with' => [
                'stream' => 'php://stderr',
            ],
        ],

        'syslog' => [
            'driver' => 'syslog',
            'level' => 'debug',
        ],

        'errorlog' => [
            'driver' => 'errorlog',
            'level' => 'debug',
        ],
    ],
];
```
Như các bạn thấy có rất nhiều các kênh đảm nhiệm việc báo log cho người dùng. `stack` là kênh mặc định để gửi log. Chúng mình sẽ đi tìm hiểu chi tiết hơn về cấu hình các kênh này nhé.
## Configuration within each channel
Ứng với mỗi `key channel` các bạn có thể nhìn thấy một mảng các key khác nhau được sử dụng.

Đầu tiên là `drivers`:
* `single`: Viết log vào một `single` file, mặc định, nó thường được ghi vào `storage/logs/laravel.log`.
* `daily`: Ý là nếu cần ghi log thì nó sẽ tạo 1 file mới có ngày tháng năm trong tên file log đó. VD: storage/logs/laravel-2019-09-01.log
* `errorlog`: Nơi mà lỗi được lưu log nó phụ thuộc vào `web server` của bạn. Ví dụ bạn dùng `nginx` thì nới lưu log sẽ là `/var/log/nginx/error.log`.
* `syslog`: cái này nó cũng phụ thuộc vào `server OS` của các  bạn.

Đó là 4 driver mà đã có từ phiên bản 5.7 trở về trước, từ phiên bản 5.7 trở đi thì được support thêm một vài driver nữa
* `stack`: Khi sử dụng driver này tứ là bạn có thể sử dụng nhiều `logging channel` cùng với nhau. Khi đó bạn phải set thêm key **channel** với giá trị là một mảng tên các key channel nhé.
* `slack`: Channel này cho phép bạn gửi log đến `the popular social channel`. Ví dụ như chúng ta dùng chatwork, chúng ta có thể báo lỗi về tin nhắn cho chúng ta.
* `monolog`: Đây là khi monolog sử dụng lại chính nó, và khi các bạn sử dụng driver này các bạn sẽ sử dụng các method của chính nó nữa. Các bạn sử dụng nó thông qua từ khóa `handler` nhé.
## Writing log message
Như các bạn biết đấy, chúng ta hoàn toàn có thể ghi log vào trong thư mục `storage/logs` bằng cách sử dụng facade `Log`. Nhật ký lỗi được ghi nhận với 8 cấp độ khác nhau theo tiêu chuẩn [RFC 5424](https://tools.ietf.org/html/rfc5424) 
```PHP
Log::emergency($message);
Log::alert($message);
Log::critical($message);
Log::error($message);
Log::warning($message);
Log::notice($message);
Log::info($message);
Log::debug($message);
```
Trong quá trình ghi log, nếu bạn muốn thêm các thông tin để log được chi tiết hơn. Chúng ta truyền vào tham số thứ hai nhé
```PHP
Log::info('User failed to login.', ['id' => $user->id]);
```
Đôi khi bạn cũng muốn là nhật ký ghi log kênh nào được gửi đến thì chúng ta sẽ sẽ sử dụng phương thức `channel` nhé.
```PHP
Log::stack(['single', 'slack'])->info('Something happened!');
```
# Laravel Debugbar
`Laravel Debugbar` là một package giúp tích hợp PHP Debyg Bar vào framework Laravel, sau khi chúng ta cài đặt package này, vào mỗi website của chúng ta sẽ thấy một thanh công cụ ở phía dưới cùng, nó chứa rất nhiều thông tin hữu ích cho ta để chúng ta có thể kiểm tra lỗi của ứng dụng.

![](https://images.viblo.asia/d97f3ea9-773f-4228-be35-51ba69840d89.png)
 Về cách cài đặt bạn có thể vào hẳn trong [package](https://github.com/barryvdh/laravel-debugbar) xem nhé.
 Các bạn chú ý rằng chúng ta nên để `Laravel DebugBar` ở chết độ hoạt động khi phát triển ứng dụng, nó có thể làm chậm ứng dụng đi do phải thu thập nhiều thông tin phục vụ cho việc debug.
 
 Như các bạn nhìn trên hình ảnh trên đấy, nó có các tab để phục vụ cho việc chúng ta debug tùy theo mục đích của chúng ta. Ví dụ trong tab message chúng ta mà muốn debug trong tab này thì chúng ta có thể dùng
 ```PHP
 Debugbar::info($object);
Debugbar::error('Error!');
Debugbar::warning('Watch out…');
Debugbar::addMessage('Another message', 'mylabel');
 ```
 vào từng chỗ mà chúng ta mong muốn debug. Hay chúng ta muốn hiển thị thời gian thực thi một hành động ở tab `Timeline` thì chúng ta sẽ sử dụng 
 ```PHP
 // C1: Nhóm các đoạn code cần đo thời gian thực hiện vào  Debugbar::startMeasure() và Debugbar::stopMeasure()
Debugbar::startMeasure('render','Time for rendering');
$post = App\Post::where('email', 'nguyenminhhoang@gmail.com')->get()
Debugbar::stopMeasure('render');

// C2: Sử dụng phương thức Debugbar::addMeasure()
$start = microtime(true);
$post = App\Post::where('email', 'nguyenminhhoang@gmail.com')->get()
$end = microtime(true);
Debugbar::addMeasure('total query: ', $start, $end);

// C3: Khai bào hàm Closure với phương thức measure()
Debugbar::measure('Thời gian thực hiện truy vấn', function() {
    $post = App\Post::where('email', 'nguyenminhhoang@gmail.com')->get()
});
 ```
 Hiển thị exception
 ```PHP
 try {
    throw new Exception('foobar');
} catch (Exception $e) {
    Debugbar::addThrowable($e);
}
 ```
 Khi các bạn vào trang web và vào tab `Queries` thì các bạn sẽ thấy câu truy vấn cuối cùng được Laravel sinh ra để thực hiện truy vấn cơ sở dữ liệu, nó đầy đủ các thông tin nhập vào. vân vân và mây mây...
 Để bật tắt chế độ hoạt động Laravel Debugbar trong ứng dụng thì chúng ta sẽ thông qua method `Debugbar::enable()` và `Debugbar::disable()`.
 # Lời kết
 Vậy qua một số tip debug mà mình hay dùng trên thì mong rằng cũng phần nào giúp được các bạn trong quá trình các bạn làm project, nó không được mạnh mẽ như công cụ debug của các IDE của microsoft nhưng mong rằng với lượng thông tin mà nó có thể cung cấp cũng giúp các bạn phần nào nhận ra được dấu hiệu của lỗi và có hướng sửa. Cảm ơn các bạn đã đọc bài viết của mình. Have a nice day !!
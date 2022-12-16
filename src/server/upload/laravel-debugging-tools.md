Vào một ngày đẹp trời, tự nhiên đứa bên cạnh hỏi mình cách debug ứng dụng Laravel viết API, không có phần view? Lúc đó mình chưa biết xử lý như thế nào (haiz). Vì vậy bài viết sẽ tập hợp lại một số tools hỗ trợ debug cho ứng dụng Laravel khi dùng với ứng dụng API và dùng với ứng dụng web có front đầy đủ.
# 1. Clockwork

Clockwork là một extension của trình duyệt, cung cấp tools để debug và ghi lại các hoạt động trong ứng dụng PHP, bao gồm request data, application log, database queries, routes, visualisation of application runtime and more.

Clockwork sử dụng một thành phần server-side, tập hợp tất cả dữ liệu và dễ dàng tích hợp với bất kỳ dự án PHP nào, bao gồm hỗ trợ ngoài luồng cho các frameworks

Bạn có thể xem giao diện dữ liệu được thu thập được thông qua extension Clockwork được tích hợp trên `Chrome` và `Firefox`.

## 1.2. Cài đặt
> Bài viết sẽ hướng dẫn cài đặt và sử dụng trong Laravel framework, nếu bạn muốn cài đặt nó trong các framework khác, hãy tham khảo tại [đây](https://underground.works/clockwork/introduction?#content)

Cài đặt Clockwork dựa vào Composer
```php
$ composer require itsgoingd/clockwork
```

Nếu bạn đang dùng bản Laravel mới nhất, việc cài đặt đã xong :D.

Đối với các phiên bản thấp hơn `5.5`, bạn cần đăng kí service provider, trong file `config/app.php`:
```php
'providers' => [
	...
	Clockwork\Support\Laravel\ClockworkServiceProvider::class
]
```
Mặc định thì Clockwork sẽ chỉ có debug mode, bạn có thể thay đổi các cài đặt khác trong file cấu hình. Để sinh file cấu hình, sử dụng `vendor:publish` Artisan command.

Nếu bạn thích sử dụng `Facade`, thêm dòng này vào file `config/app.php`:

```php
'aliases' => [
	...
	'Clockwork' => Clockwork\Support\Laravel\Facade::class,
]
```
**Note**: Nếu bạn đang sử dụng Laravel route cache, bạn sẽ cần refresh lại bằng cách sử dụng lệnh `route:cach` Artisan command

Khả năng làm việc realtime của Clockwork, giao diện dễ quan sát. Tôi hay sử dụng extension này :D
## 1.3. Sử dụng
Để sử dụng được Clockwork, bạn cần tích hợp thêm extension cho trình duyệt
* install the [Chrome extension](https://chrome.google.com/webstore/detail/clockwork/dmggabnehkmmfmdffgajcflpdjlnoemp)
* or the [Firefox add-on](https://addons.mozilla.org/en-US/firefox/addon/clockwork-dev-tools/)
* or use the web UI `http://your.app/__clockwork`.

Ngoài ra Clockwork cung cấp các helper function giúp bạn ghi lại các log, events theo cách riêng của mình. Chi tiết các helper tham khảo tại [đây](https://github.com/itsgoingd/clockwork).

# 2. Laravel Debugbar
Sở hữu 10.3k star trên Github repository, đây chắc hẳn là tool hỗ trợ dubug cho Laravel được yêu thích và sử dụng rộng rãi nhất. Với sự dễ dàng khi cài đặt và sử dụng, không quá khó hiểu khi nó lại được ưa chuộng đến vậy. Tuy nhiên nó lại cung cấp các thông tin debug trên front-end do đó nó có vẻ không hữu ích để debug cho các ứng dụng Laravel về API (Nếu bạn đang sử dụng Laravel Debugbar để debug ứng dụng cung cấp API, hãy cho mình hướng dẫn thêm ở phần comment nhé)

Laravel Debugbar thêm 1 thanh bar thông minh dưới trình duyệt chứa các thông tin phục vụ debug (ví dụ số lượng queries). Với Eloquent, có thể dễ dàng thực hiện các yêu cầu cơ sở dữ liệu không cần thiết để Debugbar giúp xác định mã không hiệu quả.

Chi tiết xem tại [đây](https://github.com/barryvdh/laravel-debugbar)

# 3. Telescope
Đây có thể coi là trợ thử đắc lực của laravel giúp cho việc debug, đặc biệt cung cấp khả năng UI đẹp mắt và thân thiện. Tuy nhiên nó lại cần thao tác với DB và publish code font end cho ứng dụng của bạn.

Telescope phân tích đầu đủ và chi tiết cho bạn những request đến ứng dụng exceptions, log entries, database queries, queued jobs, mail, notifications, cache operations, scheduled tasks, variable dumps và còn nhiều hơn nữa. Telescope là 1 công cụ, môi trường tuyệt vời để phát triển ứng dụng Laravel.

Telescope cũng hỗ trợ tốt cho việc debug với API vì nó cung cấp 1 màn hình riêng để debug (như clockwork vậy).

> Telescope makes a wonderful companion to your local Laravel development environment.

Chi tiết cách cài đặt và sử dụng bạn có thể lên [đây](https://laravel.com/docs/5.8/telescope) để theo dõi
# 4. Laravel log viewer
Package này hỗ trợ mạnh mẽ cho Laravel tuy nhiên nó lại thiên về đọc `log` chứ không hỗ trỡ xem các thông tin (như query DB, performance DB). Nó cho phép bạn xem log trong thư mục `storage/logs` dưới dạng bảng HTML đẹp mắt.

Chi tiết: [xem tại đây](https://github.com/rap2hpoutre/laravel-log-viewer)
# 5. Tự ghi log
Một trong những phần quan trọng khi debug là xem câu lệnh truy vấn SQL, bạn có thể hoàn toàn tự làm việc này.

File `app\Providers\AppServiceProvider:`
```php
/**
 * Log database queries and bindings to the standard log
 * Only when in debug mode and not running unit tests
 */
protected function bootDBLogger()
{
    if (config('app.debug_log_queries')) {
        DB::listen(function ($query) {
            Log::channel('queries')->debug($query->sql, [
                'time' => $query->time . ' ms', // milisecond
                'bindings' => $query->bindings,
            ]);
        });
    }
}
```
và đăng ký nó trong method `boot()`
```php
/**
 * Bootstrap any application services.
 *
 * @return void
 */
public function boot()
{
    $this->bootDBLogger();
}
```
Cập nhật file config nào:
File `config\app.php`
```scala
    /*
     | Log queries to log file storage/queries.log
     |
     */
    'debug_log_queries' => env('DEBUG_LOG_QUERIES', false),
```
File `config\logging.php`
```
	'channels' => [
		...
        'queries' => [
            'driver' => 'single',
            'path' => storage_path('logs/queries.log'),
        ],
	],
```
Như vậy các query sẽ được ghi ra `storage/logs/queries.log`
# Tổng kết
- Với các ứng dụng Laravel API, không có front-end để quan sát, sử dụng `Clockwork` và `Telescope` để debug hiệu quả. Tuy nhiên khi sử dụng `Telescope` thì lại ảnh hưởng đến code và DB do nó sinh ra code cho phần view. 
- `Telescope` có lẽ là ứng dụng quản lý việc debug đẹp mắt và chi tiết nhất (theo quan điểm cá nhân).
- `Clockwork` và `Laravel Debugbar` dễ triển khai, chỉ cần cài qua Composer và tích hợp extension hoặc bật config là xong. Các package còn lại thì cần sinh thêm code (view html chẳng hạn) vì vậy sẽ phụ thuộc vào dự án mà cần cài đặt các debugger hợp lý.
- Hãy thận trọng khi cài debugger, hãy để ở chế độ dev và khi triển khai trên các môi trường khác ngoài dev, bạn hãy chắc chắn rằng bạn đã tắt nó đi. Nếu ai đó xem được phần debugger này trên server, đó là điểm yếu của hệ thống cho các hacker khai thác :D.
```
composer require laravel/telescope --dev
```
And install
```
composer install --no-dev
```

# References

[Debug Laravel](https://blog.logrocket.com/getting-started-with-laravel-telescope-what-can-it-do-for-you-719aaef07941/)
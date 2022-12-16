> [Phần1](https://viblo.asia/p/laravel-8-tim-hieu-ve-service-container-phan-1-bWrZnz0QZxw)


> Bài viết này sẽ giới thiệu với các bạn cách Service Container binding.
# Binding
## Liên kết Class, Interface cơ bản
Hầu hết tất cả các liên kết service container của bạn sẽ được đăng ký trong service providers.


Dưới đây là một số cách bạn có thể dùng để bind class/interface vào container:

### bind()
 Chúng ta có thể đăng ký một liên kết bằng cách sử dụng phương thức ```bind```, truyền vào tên lớp hoặc tên interface mà chúng ta muốn đăng ký cùng với một closure trả về một thể hiện của lớp.
 
 
 Thông qua ```$this->app```:
```php
use App\Services\Transistor;
use App\Services\PodcastParser;

$this->app->bind(Transistor::class, function ($app) {
    return new Transistor($app->make(PodcastParser::class));
});
```
Thông qua facades:
```php
use App\Services\Transistor;
use Illuminate\Support\Facades\App;

App::bind(Transistor::class, function ($app) {
    // ...
});
```
Không cần liên kết các lớp vào container nếu chúng không phụ thuộc vào bất kỳ interface nào. Container không cần phải được hướng dẫn về cách xây dựng các đối tượng này, vì nó có thể tự động giải quyết các đối tượng này bằng cách sử dụng reflection.

### singleton()
Phương thức ```singleton``` liên kết một lớp hoặc interface vào container chỉ nên được giải quyết một lần. Khi một liên kết singleton được giải quyết, một object tương tự sẽ được trả về trong các lần gọi tiếp theo vào container:
```php
use App\Services\Transistor;
use App\Services\PodcastParser;

$this->app->singleton(Transistor::class, function ($app) {
    return new Transistor($app->make(PodcastParser::class));
});
```

### scoped()
Phương thức ```scoped``` liên kết một lớp hoặc interface vào container chỉ nên được giải quyết một lần trong một Laravel request / job lifecycle nhất định. Mặc dù phương thức này tương tự như ```singleton```, các instance được đăng ký bằng ```scoped``` sẽ được xóa bất cứ khi nào ứng dụng Laravel bắt đầu một "vòng đời" mới:
```php
use App\Services\Transistor;
use App\Services\PodcastParser;

$this->app->scoped(Transistor::class, function ($app) {
    return new Transistor($app->make(PodcastParser::class));
});
```

### instance()
Bạn cũng có thể liên kết một instance vào container bằng phương thức ```instance```. Các lần gọi tiếp theo vào container sẽ luôn trả về instance đã liên kết:
```php
use App\Services\Transistor;
use App\Services\PodcastParser;

$service = new Transistor(new PodcastParser);

$this->app->instance(Transistor::class, $service);
```

### extend()
Phương thức ```extend``` cho phép sửa đổi các service đã giải quyết. Ví dụ: khi một service được giải quyết, bạn có thể chạy code để định cấu hình service. Phương thức ```extend``` nhận một tham số duy nhất là một closure. Closure này nhận vào service đang được giải quyết và container instance, trả về service đã sửa đổi:
```php
$this->app->extend(Service::class, function ($service, $app) {
    return new DecoratedService($service);
});
```

## Liên kết Interfaces với implementations
Một tính năng rất mạnh của service container là khả năng liên kết một interface với một implementation nhất định. Ví dụ: giả sử bạn có interface **EventPusher** và implementation **RedisEventPusher**. Khi bạn đã code phần implementation **RedisEventPusher** của interface này, bạn có thể đăng ký nó với service container như sau:
```php
use App\Contracts\EventPusher;
use App\Services\RedisEventPusher;

$this->app->bind(EventPusher::class, RedisEventPusher::class);
```

Câu lệnh này cho container biết rằng nó sẽ chèn **RedisEventPusher** khi một lớp cần implements **EventPusher**. Bây giờ chúng ta có thể type-hint interface **EventPusher** trong phương thức khởi tạo của lớp được giải quyết bởi container. Hãy nhớ rằng, controllers, event listeners, middleware, và nhiều lớp khác trong các ứng dụng Laravel luôn được giải quyết bằng cách sử dụng container:

```php
use App\Contracts\EventPusher;

/**
 * Create a new class instance.
 *
 * @param  \App\Contracts\EventPusher  $pusher
 * @return void
 */
public function __construct(EventPusher $pusher)
{
    $this->pusher = $pusher;
}
```

## Liên kết theo ngữ cảnh (contextual binding)
Đôi khi bạn có thể có hai lớp sử dụng cùng một interface, nhưng bạn muốn chèn implementation khác nhau vào mỗi lớp. Ví dụ: hai controllers có thể phụ thuộc vào các triển khai khác nhau của [contract](https://laravel.com/docs/8.x/contracts) **Illuminate \ Contracts \ Filesystem \ Filesystem**. Laravel cung cấp một interface đơn giản, thuận tiện trong trường hợp này:
```php
use App\Http\Controllers\PhotoController;
use App\Http\Controllers\UploadController;
use App\Http\Controllers\VideoController;
use Illuminate\Contracts\Filesystem\Filesystem;
use Illuminate\Support\Facades\Storage;

$this->app->when(PhotoController::class)
          ->needs(Filesystem::class)
          ->give(function () {
              return Storage::disk('local');
          });

$this->app->when([VideoController::class, UploadController::class])
          ->needs(Filesystem::class)
          ->give(function () {
              return Storage::disk('s3');
          });
```

## Liên kết kiểu dữ liệu nguyên thủy (primitive)
Đôi khi bạn cần một giá trị nguyên thủy được injected chẳng hạn như integer. Bạn có thể dễ dàng sử dụng contextual binding để inject bất kỳ giá trị nào mà lớp của bạn cần:
```php
$this->app->when('App\Http\Controllers\UserController')
          ->needs('$variableName')
          ->give($value);
 ```
 Đôi khi một lớp có thể phụ thuộc vào một mảng các instance được gắn thẻ. Bạn có thể dễ dàng inject tất cả các liên kết container với thẻ đó bằng phương thức ```giveTagged```:
 ```php
 $this->app->when(ReportAggregator::class)
    ->needs('$reports')
    ->giveTagged('reports');
 ```
 Nếu bạn cần inject giá trị từ một file config của ứng dụng, bạn có thể sử dụng phương thức ```giveConfig```:
 ```php
 $this->app->when(ReportAggregator::class)
    ->needs('$timezone')
    ->giveConfig('app.timezone');
 ```
 
 ## Liên kết dạng Variadics
 Khi bạn có một lớp nhận một mảng các đối tượng sử dụng phương thức khởi tạo có tham số dạng variadics:
 ```php
 <?php

use App\Models\Filter;
use App\Services\Logger;

class Firewall
{
    /**
     * The logger instance.
     *
     * @var \App\Services\Logger
     */
    protected $logger;

    /**
     * The filter instances.
     *
     * @var array
     */
    protected $filters;

    /**
     * Create a new class instance.
     *
     * @param  \App\Services\Logger  $logger
     * @param  array  $filters
     * @return void
     */
    public function __construct(Logger $logger, Filter ...$filters)
    {
        $this->logger = $logger;
        $this->filters = $filters;
    }
}
```
Nếu dùng contextual binding, bạn có thể giải quyết dependency này bằng phương thức ```give``` với tham số là một closure trả về một mảng các instances ```Filter``` đã giải quyết:
```php
$this->app->when(Firewall::class)
          ->needs(Filter::class)
          ->give(function ($app) {
                return [
                    $app->make(NullFilter::class),
                    $app->make(ProfanityFilter::class),
                    $app->make(TooLongFilter::class),
                ];
          });
```
Để thuận tiện, bạn cũng có thể chỉ truyền vào một mảng tên các lớp được container giải quyết:
```php
$this->app->when(Firewall::class)
          ->needs(Filter::class)
          ->give([
              NullFilter::class,
              ProfanityFilter::class,
              TooLongFilter::class,
          ]);
```
 
 ## Gắn thẻ
 Đôi khi, bạn có thể cần phải giải quyết tất cả liên kết thuộc một nhóm nhất định. Ví dụ: có lẽ bạn đang xây dựng một trình phân tích báo cáo nhận vào một mảng các implementations khác nhau của interface **Report** . Sau khi đăng ký **Report** implementations, bạn có thể gán thẻ cho chúng bằng phương pháp ```tag```:
 ```php
 $this->app->bind(CpuReport::class, function () {
    //
});

$this->app->bind(MemoryReport::class, function () {
    //
});

$this->app->tag([CpuReport::class, MemoryReport::class], 'reports');
```
Khi các service đã được gắn thẻ, bạn có thể dễ dàng giải quyết tất cả chúng thông qua phương thức ```tagged``` của container:
```php
$this->app->bind(ReportAnalyzer::class, function ($app) {
    return new ReportAnalyzer($app->tagged('reports'));
});
```
Khi một lớp có một dependency dạng variadics (```Report ...$reports```), bạn có thể dễ dàng inject tất cả các liên kết bằng ```need``` và ```giveTagged``` với tag của dependency đó:
 ```php
$this->app->when(ReportAggregator::class)
    ->needs(Report::class)
    ->giveTagged('reports');
 ```
 
 # Tham khảo
https://laravel.com/docs/8.x/container
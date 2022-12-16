> Phần 1: https://viblo.asia/p/tim-hieu-ve-cache-trong-laravel-8-phan-1-4dbZNXqg5YM


Bài viết sau sẽ tìm hiểu về một số tính năng với Cache mà Laravel 8 đang hỗ trợ.

# Cache Tags
Cache tags cho phép bạn gắn thẻ để nhóm các phần tử có liên quan tới nhau trong bộ nhớ cache và sau đó xóa chúng theo nhóm đã được gán. 

### Lưu trữ các phần tử vào cache theo tag
Để gắn thẻ một phần tử, bạn truy cập vào cache theo tag đó bằng phương thức ```tags``` với tham số là một mảng chứa tên các tag và ```put``` phần tử đó vào. Một phần tử có thể được gắn một hoặc nhiều thẻ.
```php
Cache::tags(['people', 'artists'])->put('John', $john, $seconds);
Cache::tags(['people', 'authors'])->put('Anne', $anne, $seconds);
```
### Truy xuất các phần tử cache theo tag
Để truy xuất một phần tử cache được gắn thẻ, bạn truy cập vào cache theo tag và sau đó gọi phương thức ```get``` bằng khóa bạn muốn truy xuất:
```php
$john = Cache::tags(['people', 'artists'])->get('John');
$anne = Cache::tags(['people', 'authors'])->get('Anne');
```
### Xóa các phần tử cache theo tag
Để xóa các phần tử cache theo tag, bạn truy cập vào cache theo tag đó và sau đó gọi phương thức ```flush```
```php
Cache::tags('authors')->flush(); //Anne is removed
Cache::tags(['people', 'authors'])->flush(); //both Anne and John are removed
```
### Lưu ý
Cache tags không được hỗ trợ khi sử dụng driver file, dynamodb hoặc database. Khi sử dụng cache được lưu trữ vĩnh viễn với nhiều tags, hiệu suất sẽ tốt nhất với các driver có khả năng tự động xóa các bản ghi cũ như memcached.

# Atomic Locks
Atomic lock là một cơ chế được cung cấp bởi Laravel để giới hạn các request đồng thời. 
### Yêu cầu đối với driver
Nếu bạn sử dụng **database** driver, bạn sẽ cần thiết lập một bảng để chứa các khóa cache của ứng dụng. Dưới đây là một ví dụ về khai báo Schema:
```php
Schema::create('cache_locks', function ($table) {
    $table->string('key')->primary();
    $table->string('owner');
    $table->integer('expiration');
});
```
### Quản lý khóa
Atomic lock cho phép thao tác với các khóa phân tán mà không cần lo lắng về race condition. Ví dụ, Laravel Forge sử dụng atomic lock để đảm bảo rằng chỉ có một tác vụ từ xa đang được thực thi trên một máy chủ tại một thời điểm. Bạn có thể tạo và quản lý khóa bằng phương thức ```Cache::lock```:
```php
use Illuminate\Support\Facades\Cache;

$lock = Cache::lock('foo', 10);

if ($lock->get()) {
    // Lock acquired for 10 seconds...

    $lock->release();
}
```
Nếu bạn truyền tham số là một closure thì sau khi closure được thực hiện, Laravel sẽ tự động giải phóng khóa:
```php
Cache::lock('foo')->get(function () {
    // Lock acquired indefinitely and automatically released...
});
```
Nếu khóa không khả dụng tại thời điểm bạn yêu cầu, bạn có thể block để đợi trong một số giây cụ thể. Nếu không thể nhận được khóa trong thời hạn đã chỉ định, một Illuminate\Contracts\Cache\LockTimeoutException sẽ được ném ra:
```php
use Illuminate\Contracts\Cache\LockTimeoutException;

$lock = Cache::lock('foo', 10);

try {
    $lock->block(5);

    // Lock acquired after waiting a maximum of 5 seconds...
} catch (LockTimeoutException $e) {
    // Unable to acquire lock...
} finally {
    optional($lock)->release();
}
```
Bạn có thể viết lại đoạn code trên theo cách đơn giản là truyền một closure vào ```block```. Laravel sẽ cố gắng lấy khóa trong số giây được chỉ định tự động giải phóng khóa khi closure thực thi xong:
```php
Cache::lock('foo', 10)->block(5, function () {
    // Lock acquired after waiting a maximum of 5 seconds...
});
```
### Quản lý khóa trong các tiến trình
Đôi khi, bạn có thể muốn nhận được một khóa trong một tiến trình và giải phóng nó trong một tiến trình khác. Ví dụ: bạn có thể nhận được một khóa trong một request và muốn giải phóng khóa khi kết thúc một công việc trong hàng đợi được kích hoạt bởi request đó. Trong trường hợp này, bạn nên truyền token của khóa cho công việc đó để nó có thể khởi tạo lại khóa bằng cách sử dụng token đã cho.

Trong ví dụ dưới đây, tiến trình ```$podcast``` sẽ được cho vào hàng đợi nếu lấy được khóa thành công. Token của khóa sẽ được truyền cho tiến trình thông qua phương thức ```owner``` của khóa:
```php
$podcast = Podcast::find($id);

$lock = Cache::lock('processing', 120);

if ($result = $lock->get()) {
    ProcessPodcast::dispatch($podcast, $lock->owner());
}
```
Trong tiến trình **ProcessPodcast**, bạn có thể khôi phục và giải phóng khóa bằng cách sử dụng token của khóa:
```php
Cache::restoreLock('processing', $this->owner)->release();
```

Sử dụng  ```forceRelease``` để mở khóa, bỏ qua token hiện tại của nó:
```php
Cache::lock('processing')->forceRelease();
```

### Lưu ý
Để sử dụng tính năng này, ứng dụng của bạn phải sử dụng một trong các driver memcached, redis, dynamicodb, database, file hoặc array làm cache driver mặc định. Ngoài ra, tất cả các máy chủ phải giao tiếp với cùng một máy chủ cache.

# Custom Cache Drivers
### Tạo một custom driver
Để tạo một custom cache driver, trước tiên bạn cần implement Illuminate\Contracts\Cache\Store contract. Ví dụ về việc implement một MongoDB cache:
```php
<?php

namespace App\Extensions;

use Illuminate\Contracts\Cache\Store;

class MongoStore implements Store
{
    public function get($key) {}
    public function many(array $keys) {}
    public function put($key, $value, $seconds) {}
    public function putMany(array $values, $seconds) {}
    public function increment($key, $value = 1) {}
    public function decrement($key, $value = 1) {}
    public function forever($key, $value) {}
    public function forget($key) {}
    public function flush() {}
    public function getPrefix() {}
}
```

Bạn chỉ cần implement từng phương thức trên bằng cách sử dụng MongoDB connection.


Bạn có thể tạo namespace **Extensions** trong thư mục **app** để chứa code của custom cache driver. 
Laravel không yêu cầu cấu trúc ứng dụng cứng nhắc nên bạn có thể tự do sắp xếp ứng dụng theo nhu cầu của mình.
### Đăng ký custom driver
 Khi implement xong, bạn có thể hoàn thành đăng ký custom driver của mình bằng cách gọi phương thức ```extend``` của Cache facade:
```php
Cache::extend('mongo', function ($app) {
    return Cache::repository(new MongoStore);
});
```
Tham số đầu tiên được truyền vào phương thức ```extend``` là tên của driver tương ứng với driver option trong file cấu hình config/cache.php. Tham số thứ hai là một closure trả về một thể hiện của Illuminate\Cache\Repository. Tham số $app của closure là một thể hiện của **service container**.


Vì các service providers khác có thể đọc các giá trị được lưu trong bộ nhớ cache trong phương thức ```boot```, bạn cần đăng ký custom driver của mình trong một hàm callback ```booting```. Bằng cách sử dụng hàm ```booting``` callback, bạn có thể đảm bảo rằng custom driver được đăng ký ngay trước ```boot``` và sau ```register``` được gọi trên tất cả các service providers. Bạn có thể đăng ký ```booting``` callback trong phương thức ```register``` của lớp App\Providers\AppServiceProvider của ứng dụng:
```php
<?php

namespace App\Providers;

use App\Extensions\MongoStore;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\ServiceProvider;

class CacheServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->booting(function () {
             Cache::extend('mongo', function ($app) {
                 return Cache::repository(new MongoStore);
             });
         });
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
```
Sau khi custom driver của bạn được đăng ký, hãy cập nhật driver option trong file cấu hình config / cache.php thành tên của custom driver.
# Events
Để thực thi code trên mọi hoạt động của cache, bạn có thể lắng nghe các sự kiện do cache kích hoạt. Thông thường, bạn nên đặt các event listener này trong lớp App\Providers\EventServiceProvider của ứng dụng:
```php
/**
 * The event listener mappings for the application.
 *
 * @var array
 */
protected $listen = [
    'Illuminate\Cache\Events\CacheHit' => [
        'App\Listeners\LogCacheHit',
    ],

    'Illuminate\Cache\Events\CacheMissed' => [
        'App\Listeners\LogCacheMissed',
    ],

    'Illuminate\Cache\Events\KeyForgotten' => [
        'App\Listeners\LogKeyForgotten',
    ],

    'Illuminate\Cache\Events\KeyWritten' => [
        'App\Listeners\LogKeyWritten',
    ],
];
```

# Tài liệu tham khảo
https://laravel.com/docs/8.x/cache
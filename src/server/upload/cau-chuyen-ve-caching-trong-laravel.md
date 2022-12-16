# Caching là gì, tại sao phải caching?
Caching được hiểu đơn giản là một hành động lưu trữ lại kết quả của một công việc xử lý và tính toán dữ liệu từ trước và được tái sử dụng cho những lần gọi sau. Sau khi hiểu caching là gì thì các bạn chắc cũng đã hiểu vì sao lại phải caching. Caching giúp cho ứng dụng hoạt động nhanh hơn, đương nhiên là phải caching một cách hợp lý, chúng ta không thể caching tất cả mọi thứ. Chỉ nên caching những kết quả mà có thời gian xử lý lâu và có khả năng tái sử dụng nhiều lần. Ngoài ra chúng ta phải xem sét tới việc sai lệch dữ liệu, vì khi cache thì các kết quả được lấy ra và trả về cho người dùng chứ không xử lý lại một lần nữa, có thể dẫn tới việc sai lệch dữ liệu cho người dùng.

# Laravel có thể caching những gì?
## Cache query
Khi nghĩ đến cache thì chúng ta nghĩ đến đầu tiên có lẽ là cache các câu query phức tạp và tốn thời gian. Tất nhiên laravel cũng hỗ trợ bạn điều đó, tiếp theo là chúng ta lưu dữ liệu cần cache ở đâu và làm sao để config nó. Thì câu trả lời nằm trong file `config/cache.php`.
```php
<?php

use Illuminate\Support\Str;

return [

    /*
    |--------------------------------------------------------------------------
    | Default Cache Store
    |--------------------------------------------------------------------------
    |
    | This option controls the default cache connection that gets used while
    | using this caching library. This connection is used when another is
    | not explicitly specified when executing a given caching function.
    |
    */

    'default' => env('CACHE_DRIVER', 'file'),

    /*
    |--------------------------------------------------------------------------
    | Cache Stores
    |--------------------------------------------------------------------------
    |
    | Here you may define all of the cache "stores" for your application as
    | well as their drivers. You may even define multiple stores for the
    | same cache driver to group types of items stored in your caches.
    |
    | Supported drivers: "apc", "array", "database", "file",
    |         "memcached", "redis", "dynamodb", "octane", "null"
    |
    */

    'stores' => [

        'apc' => [
            'driver' => 'apc',
        ],

        'array' => [
            'driver' => 'array',
            'serialize' => false,
        ],

        'database' => [
            'driver' => 'database',
            'table' => 'cache',
            'connection' => null,
            'lock_connection' => null,
        ],

        'file' => [
            'driver' => 'file',
            'path' => storage_path('framework/cache/data'),
        ],

        'memcached' => [
            'driver' => 'memcached',
            'persistent_id' => env('MEMCACHED_PERSISTENT_ID'),
            'sasl' => [
                env('MEMCACHED_USERNAME'),
                env('MEMCACHED_PASSWORD'),
            ],
            'options' => [
                // Memcached::OPT_CONNECT_TIMEOUT => 2000,
            ],
            'servers' => [
                [
                    'host' => env('MEMCACHED_HOST', '127.0.0.1'),
                    'port' => env('MEMCACHED_PORT', 11211),
                    'weight' => 100,
                ],
            ],
        ],

        'redis' => [
            'driver' => 'redis',
            'connection' => 'cache',
            'lock_connection' => 'default',
        ],

        'dynamodb' => [
            'driver' => 'dynamodb',
            'key' => env('AWS_ACCESS_KEY_ID'),
            'secret' => env('AWS_SECRET_ACCESS_KEY'),
            'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
            'table' => env('DYNAMODB_CACHE_TABLE', 'cache'),
            'endpoint' => env('DYNAMODB_ENDPOINT'),
        ],

        'octane' => [
            'driver' => 'octane',
        ],

    ],

    /*
    |--------------------------------------------------------------------------
    | Cache Key Prefix
    |--------------------------------------------------------------------------
    |
    | When utilizing the APC, database, memcached, Redis, or DynamoDB cache
    | stores there might be other applications using the same cache. For
    | that reason, you may prefix every cache key to avoid collisions.
    |
    */

    'prefix' => env('CACHE_PREFIX', Str::slug(env('APP_NAME', 'laravel'), '_').'_cache_'),

];
```

Như các bạn thấy thì laravel hỗ trợ rất nhiều stores để chúng ta có thể cache. Nhưng phổ biến nhất có lẽ là `file` và `redis`. Trong bài này mình cũng chỉ đề cập tới cách sử dụng của hai store này.

* **File**

File là store default của laravel. Tất cả dữ liệu cache được lưu tại `framework/cache/data`.
Để có thể lưu trữ dữ liệu vào file cache thì chúng ta sử dụng một trong hai câu lệnh dưới đây:
```php
Cache::put('key', 'value', $minutes);

Cache::add('key', 'value', $minutes);
```
Hai câu lệnh đều dùng để thêm một biến cache vào trong file cache và có thể set thời gian hết hạn cache. Sự khác nhau giữa hai lệnh là lệnh `Cache::put` thì trực tiếp thêm vào file cache, có thể ghi đè lên biến cũ. Còn đối với lệnh `Cache::add` thì chỉ thêm dữ liệu khi biến cache đó không tồn tại. Còn nếu đã tồn tại dữ liệu thì sẽ trả về `false`. Khi lưu thành công sẽ trả về `true`.

Đương nhiên đã có lưu cache thì phải có lấy ra để sử dụng, không thì lưu làm gì đúng không nào :).
```php
$value = Cache::get('key', 'default');
```
Lệnh `Cache:get` có thể lấy ra giá trị của `key` trong cache hoặc trả về giá trị `default` nếu không có biến `key` trong cache. Giá trị `default` trong câu lệnh trên là không bắt buộc, có thể loại bỏ nếu không cần thiết.

Ngoài các lệnh dùng để lưu trữ và lấy ra dữ liệu thì còn một vài lệnh `Cache` hay sử dụng như dưới đây: 

`Cache::has('key')` dùng để kiểm tra xem có key nào đó trong cache hay không.

`Cache::forever('key', 'value')` dùng để lưu trữ một biến vĩnh viễn trong bộ nhớ cache.

`Cache::remember('key', $time, 'default')` dùng để lây ra một biến `key` từ trong cache và lưu giá trị `default` vào nếu như biến đó không tồn tại. Ngoài ra thì còn có câu lệnh `rememberForever` cũng như `remember` nhưng thời gian là viễn viễn.

`Cache::pull('key')` dùng để lấy ra một biến từ bộ nhỡ cache và sau đó xóa bỏ nó khỏi bộ nhớ cache.

`Cache::forget('key')` dùng để xóa bỏ một biến bên trong bộ nhớ cache.

* **Redis**

Redis là một một kho lưu trữ dữ liệu theo dạng `key-value`, mã nguồn mở, hỗ trợ nhiều kiểu dữ liệu ` strings, hashes, lists, sets, sorted sets`

Cài đặt:
```php
composer require predis/predis
```
Các bạn có thể thấy config của redis bên trong file `config/database.php` 
```php
    'redis' => [

        'client' => env('REDIS_CLIENT', 'phpredis'),

        'options' => [
            'cluster' => env('REDIS_CLUSTER', 'redis'),
            'prefix' => env('REDIS_PREFIX', Str::slug(env('APP_NAME', 'laravel'), '_').'_database_'),
        ],

        'default' => [
            'url' => env('REDIS_URL'),
            'host' => env('REDIS_HOST', '127.0.0.1'),
            'username' => env('REDIS_USERNAME'),
            'password' => env('REDIS_PASSWORD'),
            'port' => env('REDIS_PORT', '6379'),
            'database' => env('REDIS_DB', '0'),
        ],

        'cache' => [
            'url' => env('REDIS_URL'),
            'host' => env('REDIS_HOST', '127.0.0.1'),
            'username' => env('REDIS_USERNAME'),
            'password' => env('REDIS_PASSWORD'),
            'port' => env('REDIS_PORT', '6379'),
            'database' => env('REDIS_CACHE_DB', '1'),
        ],

    ],
```

Để sử dụng cache redis thì phải set biến `CACHE_DRIVER=redis` trong .env để trong `config/cache.php` lấy ra driver redis gán cho default cache.

Laravel hỗ trợ tương tác với Redis qua các lệnh trên [redis command](https://redis.io/commands/) qua facade ví dụ như các lệnh :
```php
<?php
 
namespace App\Http\Controllers;
 
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Redis;
 
class UserController extends Controller
{
    /**
     * Show the profile for the given user.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return view('user.profile', [
            'user' => Redis::get('user:profile:'.$id)
        ]);
    }
}
```
Đoạn trên sử dụng phương thức get của facade và  sẽ được chuyển tới Redis.

Ngoài ra Redis còn có thể sử dụng transaction để đảm báo tính đúng đắn và toàn vẹn dữ liệu:
```php
Redis::transaction(function ($redis) {
    $redis->incr('user_visits', 1);
    $redis->incr('total_visits', 1);
})
```

Khi bạn muốn gửi nhiều lệnh tới redis thì có thể sử dụng `pipeline` để gửi các lệnh tới redis cùng một lúc:
```php
Redis::pipeline(function ($pipe) {
    for ($i = 0; $i < 1000; $i++) {
        $pipe->set("key:$i", $i);
    }
});
```
## Cache view
Ngoài cache query thì cache view cũng giúp tăng tốc độ của ứng dụng một cách đáng kể. Cache view sẽ lưu lại các view trong thư mục `storage/framework/views`. Để có thể chủ động cache lại các view thì chúng ta có thể chạy lệnh `php artisan view:cache`, và có thể thay đổi config bên trong file `config/view.php`.
```php
<?php

return [

    /*
    |--------------------------------------------------------------------------
    | View Storage Paths
    |--------------------------------------------------------------------------
    |
    | Most templating systems load templates from disk. Here you may specify
    | an array of paths that should be checked for your views. Of course
    | the usual Laravel view path has already been registered for you.
    |
    */

    'paths' => [
        resource_path('views'),
    ],

    /*
    |--------------------------------------------------------------------------
    | Compiled View Path
    |--------------------------------------------------------------------------
    |
    | This option determines where all the compiled Blade templates will be
    | stored for your application. Typically, this is within the storage
    | directory. However, as usual, you are free to change this value.
    |
    */

    'compiled' => env(
        'VIEW_COMPILED_PATH',
        realpath(storage_path('framework/views'))
    ),

];
```

Trong trường hợp bạn muốn clear cache của view thì sử dụng lệnh `php artisan view:clear`

## Cache config

Các bạn sử dụng laravel có lẽ đã quá quen thuộc với câu lệnh thần kì `php artisan config:cache` mỗi khi gặp lỗi rồi đúng không nào :). Đúng vậy đây là câu lệnh để cache tất cả các config của laravel, và gộp nó vào một file duy nhất `bootstrap/cache/config.php`. Khi gộp tất cả config lại vào một file có thể tăng tốc độ load cho ứng dụng.
![image.png](https://images.viblo.asia/f7426627-5769-4968-b5e7-663c69f00364.png)

Trong trường hợp bạn muốn clear cache của config thì sử dụng lệnh `php artisan config:clear`

## Cache route
Đối tượng caching cuối cùng mình chia sẻ hôm này chính là route. Việc cache route giúp các bạn giảm được thời gian mapping từ route tới controller và action. Nếu không cache route thì mỗi lần gửi request các bạn sẽ phải mapping controller, actions lại từ đầu.

Để cache route thì các bạn chạy lệnh `php artisan route:cache`. Sau khi cache thì sẽ tạo ra một file `bootstrap/cache/routes.php`.
![image.png](https://images.viblo.asia/e00cb32c-59ed-44d1-ad2d-a4c18d55cdec.png)

Trong trường hợp bạn muốn clear cache của route thì sử dụng lệnh `php artisan route:clear`

# Tổng kết
Ở trên là những kiến thức về caching trong laravel mà mình tìm hiểu được. Cảm ơn các bạn đã theo dõi bài viết, mong bài viết sẽ đem lại những kiến thức hữu ích cho các bạn. Hẹn gặp lại các bạn ở những bài viết tiếp theo.

Ngoài ra mình có để cử một series về caching cho các bạn. Các bạn có thê đọc series ở [đây](https://viblo.asia/s/caching-dai-phap-QqKLvpNbl7z).
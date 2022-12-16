## Overview

Trong bài trước, chúng ta đã cùng nhau thực hành áp dụng kỹ thuật [Page Cache cho website Nuxt.js](https://viblo.asia/p/tang-toc-website-nuxtjs-voi-page-level-caching-module-LzD5dMM4KjY) để giảm thời gian tải trang. Tiếp tục tìm hiểu về việc implement Page Cache ở cấp độ application thì trong phần này, tôi sẽ tiếp tục giới thiệu tới các bạn cách để cache lại HTML Response cho website Laravel.

Với Laravel, framework này đã có sẵn cache module cho người dùng sử dụng thông qua một lớp facade có tên là `Cache`. Cache module của Laravel hỗ trợ sẵn nhiều driver phổ biến như: File, [Memcached](https://memcached.org/), [Redis](https://redis.io/), [DynamoDB](https://aws.amazon.com/dynamodb). Nếu bạn chưa biết về chúng thì hãy ghé qua [phần trước đó](https://viblo.asia/p/tang-toc-website-su-dung-page-cache-application-cache-6J3ZgaBB5mB)  của series để hiểu hơn về các điểm khác nhau của từng driver.

## Laravel Cache

Việc sử dụng cache module của Laravel cũng khá dễ dàng trong dự án. Ví dụ:

```php
// Lưu cache có key là "key_1":
Cache::set("key_1", "1");

// Lấy dữ liệu đã cache với key là "key_1"
Cache::get("key_1");

// Xóa cache với key là "key_1"
Cache::forget("key_1");

// Lưu cache với TTL cụ thể:
Cache::remember("key_1", "4", now()->addMinutes(10));
```

Đó là cách mà chúng ta thực hiện để cache lại một phần dữ liệu nào đó của ứng dụng. Việc triển khai page cache cũng như vậy, chỉ khác là dữ liệu bây giờ sẽ là HTML response mà thôi. Tôi nhớ có lần đi phỏng vấn các bạn Newbie apply vào job mà yêu cầu biết sử dụng Laravel framework, tôi từng hỏi: *"Laravel sẽ thực thi code của Middleware trước Controller hay không? Khi nào thì code của Middleware sẽ chạy sau khi Controller đã chạy xong?"*.

Hầu hết với các bạn Newbie được hỏi câu này, các bạn ấy đều trả lời là Middleware chỉ chạy trước. Nhưng thực ra là Middleware có thể được chạy sau khi Controller đã chạy xong. Mà một số trường hợp có thể áp dụng như: dùng middleware để lưu Request Logs hoặc cache lại response chẳng hạn.

```php:after-controller
// ResponseCacheMiddleware.php
public function handle(Request $request, Closure $next)
{
    $response = $next($request);

    if ($this->shouldCache($request, $response)) {
        Cache::remember($this->cacheKey($request), $response, now()->addHour());
    }

    return $response;
}
```

Như vậy, việc tự tạo page cache với Laravel khá là đơn giản. Chúng ta chỉ cần tạo một Middleware đứng sau Controller để lưu lại response, kết hợp một middleware đứng trước Controller để bỏ qua việc gọi vào Controller để xử lý logic bằng cách lấy response từ Cache ra.

```php:before-controller
public function handle(Request $request, Closure $next)
{
    $shouldCache = $this->shouldCache($request, $response);
    $cacheHit = Cache::hasKey($this->cacheKey($request));

    if ($shouldCache && $cacheHit) {
        return Cache::get($this->cacheKey($request));
    }

    return next($response);
}
```

Khá là đơn giản phải không nào! :D

## Library: spatie/laravel-responsecache

Thay vì tự implement các middleware để làm page cache, tôi giới thiệu tới các bạn một package mà tôi sử dụng đó là [spatie/laravel-responsecache](https://github.com/spatie/laravel-responsecache).

### Cài đặt

Cài đặt bằng composer:

```bash
composer require spatie/laravel-responsecache

# Tạo file config/responsecache.php
php artisan vendor:publish --provider="Spatie\ResponseCache\ResponseCacheServiceProvider"
```

File config được tạo tương tự mẫu sau:

```php
// config/responsecache.php

return [
    /*
     * Determine if the response cache middleware should be enabled.
     */
    'enabled' => env('RESPONSE_CACHE_ENABLED', true),

    /*
     *  The given class will determinate if a request should be cached. The
     *  default class will cache all successful GET-requests.
     *
     *  You can provide your own class given that it implements the
     *  CacheProfile interface.
     */
    'cache_profile' => Spatie\ResponseCache\CacheProfiles\CacheAllSuccessfulGetRequests::class,

    /*
     * When using the default CacheRequestFilter this setting controls the
     * default number of seconds responses must be cached.
     */
    'cache_lifetime_in_seconds' => env('RESPONSE_CACHE_LIFETIME', 60 * 60 * 24 * 7),

    /*
     * This setting determines if a http header named with the cache time
     * should be added to a cached response. This can be handy when
     * debugging.
     */
    'add_cache_time_header' => env('APP_DEBUG', true),

    /*
     * This setting determines the name of the http header that contains
     * the time at which the response was cached
     */
    'cache_time_header_name' => env('RESPONSE_CACHE_HEADER_NAME', 'laravel-responsecache'),

    /*
     * Here you may define the cache store that should be used to store
     * requests. This can be the name of any store that is
     * configured in app/config/cache.php
     */
    'cache_store' => env('RESPONSE_CACHE_DRIVER', 'file'),

    /*
     * Here you may define replacers that dynamically replace content from the response.
     * Each replacer must implement the Replacer interface.
     */
    'replacers' => [
        \Spatie\ResponseCache\Replacers\CsrfTokenReplacer::class,
    ],

    /*
     * If the cache driver you configured supports tags, you may specify a tag name
     * here. All responses will be tagged. When clearing the responsecache only
     * items with that tag will be flushed.
     *
     * You may use a string or an array here.
     */
    'cache_tag' => '',

    /*
     * This class is responsible for generating a hash for a request. This hash
     * is used as a key to look up a cached response.
     */
    'hasher' => \Spatie\ResponseCache\Hasher\DefaultHasher::class,

    /*
     * This class serializes cache data and expands it.
     * Serialization can save the data to be returned in an appropriate form.
     */
    'serializer' => \Spatie\ResponseCache\Serializer\DefaultSerializer::class,
];
```

Một số biến môi trường chúng ta tùy chỉnh ngay được như `RESPONSE_CACHE_ENABLED`, `RESPONSE_CACHE_LIFETIME`, `RESPONSE_CACHE_HEADER_NAME`, `RESPONSE_CACHE_DRIVER`. Trong đó, hãy chú ý tới `RESPONSE_CACHE_LIFETIME` và `RESPONSE_CACHE_DRIVER` tương ứng với TTL và Driver.

Cuối cùng trong việc setup đó là khai báo các middleware để library này hoạt động gồm:

```php
// app/Http/Kernel.php
...

protected $middlewareGroups = [
   'web' => [
       ...
       \Spatie\ResponseCache\Middlewares\CacheResponse::class,
   ],

...

protected $routeMiddleware = [
   ...
   'doNotCacheResponse' => \Spatie\ResponseCache\Middlewares\DoNotCacheResponse::class,
];
```

Nếu muốn bật cho một số route cụ thể thì có thể dùng theo cách:

```php:routes/web.php
// add a "foo" tag to this route with a 300 second lifetime
Route::get('/test1', 'SnowflakeController@index')->middleware('cacheResponse:300,foo');

// add a "bar" tag to this route
Route::get('/test2', 'SnowflakeController@index')->middleware('cacheResponse:bar');

// add both "foo" and "bar" tags to these routes
Route::group(function() {
   Route::get('/test3', 'AnotherSnowflakeController@index');

   Route::get('/test4', 'YetAnotherSnowflakeController@index');
})->middleware('cacheResponse:foo,bar');
```


### Cache Profile

Chúng ta có một interface gọi là `Cache Profile`, dùng để định nghĩa ra cấu hình cache của riêng bạn. Đây là cái chúng ta quan tâm. Các method của interface gồm:

```php
interface CacheProfile
{
    /*
     * Determine if the response cache middleware should be enabled.
     */
    public function enabled(Request $request): bool;

    /*
     * Determine if the given request should be cached.
     */
    public function shouldCacheRequest(Request $request): bool;

    /*
     * Determine if the given response should be cached.
     */
    public function shouldCacheResponse(Response $response): bool;

    /*
     * Return the time when the cache must be invalidated.
     */
    public function cacheRequestUntil(Request $request): DateTime;

    /**
     * Return a string to differentiate this request from others.
     *
     * For example: if you want a different cache per user you could return the id of
     * the logged in user.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return mixed
     */
    public function useCacheNameSuffix(Request $request);
}
```

Với các method cụ thể bên trên, chúng ta có thể dễ dàng định nghĩa được một Profile riêng phù hợp với business của dự án. Profile mặc định sau khi cài đặt là `Spatie\ResponseCache\CacheProfiles\CacheAllSuccessfulGetRequests` - sẽ thực hiện cache lại toàn bộ response của các request có type là GET và response được coi là thành công. VD: 200, 2xx.

### Xóa cache

Một điểm khá hay với package này đó là nó cung cấp khá nhiều cách để chúng ta có thể xóa cache data. Dưới đây là một số cách thực hiện:

```php
ResponseCache::clear();

// Hoặc command
php artisan responsecache:clear

// Forget one
ResponseCache::forget('/some-uri');

// Forget several
ResponseCache::forget(['/some-uri', '/other-uri']);

// Equivalent to the example above
ResponseCache::forget('/some-uri', '/other-uri');

// forgetting all PUT responses of /some-uri
ResponseCache::selectCachedItems()->withPutMethod()->forUrls('/some-uri')->forget();

// forgetting all PUT responses of multiple endpoints
ResponseCache::selectCachedItems()->withPutMethod()->forUrls(['/some-uri','/other-uri'])->forget();

// this is equivalent to the example above
ResponseCache::selectCachedItems()->withPutMethod()->forUrls('/some-uri','/other-uri')->forget();

// forget /some-uri cached with "100" suffix (by default suffix is user->id or "")
ResponseCache::selectCachedItems()->usingSuffix('100')->forUrls('/some-uri')->forget();

// all options combined
ResponseCache::selectCachedItems()
    ->withPutMethod()
    ->withHeaders(['foo'=>'bar'])
    ->withCookies(['cookie1' => 'value'])
    ->withParameters(['param1' => 'value'])
    ->withRemoteAddress('127.0.0.1')
    ->usingSuffix('100') 
    ->usingTags('tag1', 'tag2')
    ->forUrls('/some-uri', '/other-uri')
    ->forget();
```

Chỉnh bởi như vậy nên chúng ta có thể hook vào Model Events / Eloquent Observers để tự động xóa cache cho các trang thích hợp. Ví dụ với Model Events:

```php
namespace App\Traits;

use Spatie\ResponseCache\Facades\ResponseCache;

trait ClearsResponseCache
{
    public static function bootClearsResponseCache()
    {
        self::created(function () {
            ResponseCache::clear();
        });

        self::updated(function () {
            ResponseCache::clear();
        });

        self::deleted(function () {
            ResponseCache::clear();
        });
    }
}
```

Giả sử một trang như Viblo, khi một bài viết được update hệ thống sẽ tự động xoá cache cho các trang xem nội dung bài viết đó. Như vậy quả là rất hữu ích phải không nào.

## Tổng kết

Trên đây là những chia sẻ của tôi về cách mà bạn có thể thực hiện Page Cache trong Laravel. Giúp cải thiện tốc độ tải trang khi truy cập. Response time sẽ được rút ngắn đi xuống chỉ còn vài chục mili giây trên localhost. Khoảng 100ms nếu không qua CDN server và khoảng 200ms nếu server của bạn đứng sau một CDN.

Demo source: https://github.com/kimyvgy-labs/demo-laravel-response-cache

:coffee::coffee: *Nếu thấy nội dung này bổ ích, hãy mời tôi một tách cà phê nha! **https://kimyvgy.webee.asia***
Khi xây dựng các ứng dụng web thì thì khái niệm về cache được nhắc đến khá phổ biến. Chúng ta có cache lại kết quả của các câu truy vấn (queries) để trả về kết quả nhanh hơn.
Có 3 ưu điểm của Web Caching là:

* Giảm tải băng thông.
* Giảm gánh nặng cho server.
* Giảm sự tiềm ẩn.

Web cache được đặt giữa các Web Servers (hoặc các servers chính) và client (hoặc nhiều clients).

Trong bài viết này chúng ta sẽ cùng tìm hiểu một Laravel package "laravel responsecache"
Laravel package này có thể lưu trữ toàn bộ response. Mặc định thì nó sẽ lưu trữ tất cả các kết quả trả về của phương thức get-requests thành công dưới dạng json hoặc html trong một tuần. Điều này có khả năng tăng tốc độ phản hồi khá đáng kể.
### Cài đặt package
Ta cài package này bằng cách dùng composer 
> composer require spatie/laravel-responsecache
> 

Nội dung file `config/responsecache.php `

```php
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
    'cache_lifetime_in_seconds' => env('RESPONSE_CACHE_LIFETIME', 60 * 24 * 7),

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
     * is used to look up an cached response.
     */
    'hasher' => \Spatie\ResponseCache\Hasher\DefaultHasher::class,

    /*
     * This class serializes cache data and expands it.
     * Serialization can save the data to be returned in an appropriate form.
     */
    'serializer' => \Spatie\ResponseCache\Serializer\DefaultSerializer::class,
];
```

Sau đó cài đặt  provided middlewares `\Spatie\ResponseCache\Middlewares\CacheResponse::class` và `\Spatie\ResponseCache\Middlewares\DoNotCacheResponse` trong kernel.

```app/Http/Kernel.php

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
Chúng ta đã thực hiện xong bước cài đặt vậy sử dụng package như nào?
### Sử dụng
Như ở phần mở đầu cũng có nói mặc định package sẽ lưu trữ tất cả các kết quả của get-requests thành công trong một tuần. Mỗi user đã đăng nhập sẽ có bộ nhớ cache riêng. 

1. Xóa bộ nhớ cache
> ResponseCache::clear();
> 
khi dùng câu lệnh trên thì sẽ xóa mọi thứ khỏi kho lưu trữ cache được chỉ định trong  file config  `config/responsecache.php `.

hoặc có thể dùng lệnh artisan command `php artisan responsecache:clear`

**sử dụng model events**

Sử dụng các event trong model như `self::created, self::updated, self::deleted`

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
**Forget một hoặc một vài URI(s)**

```php
// Forget một URI
ResponseCache::forget('/some-uri');

// Forget hai hay nhiêu URI
ResponseCache::forget(['/some-uri', '/other-uri']);
// hoặc
ResponseCache::forget('/some-uri', '/other-uri');
```

**Không cho request được lưu vào bộ nhớ cache**

Các request có thể chặn bằng cách sử dụng middleware doNotCacheResponse. Middleware này có thể sử dụng ở controller hoặc routes.

sử dụng ở routes
```app/Http/routes.php
Route::get('/auth/logout', ['middleware' => 'doNotCacheResponse', 'uses' => 'AuthController@getLogout']);
```
sử dụng ở controller
```UserController.php
class UserController.php extends Controller
{
    public function __construct()
    {
        $this->middleware('doNotCacheResponse', ['only' => ['fooAction', 'barAction']]);
    }
}
```

Để xác định những request nào sẽ được lưu trong bộ nhớ cache và trong bao lâu ta sử dụng class `Spatie\ResponseCache\CacheProfiles\CacheAllSuccessfulGetRequests`. Hoặc có thể tự tạo một interface Spatie\ResponseCache\CacheProfiles\CacheProfile.php.
```CacheProfile.php
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

**Caching cho từng route**

thay  vì đăng kí một middleware **cacheResponse**  cho tất cả các route thì ta có thể sử dùng middleware cho từng route riêng biệt.
```php
protected $routeMiddleware = [
   ...
   'cacheResponse' => \Spatie\ResponseCache\Middlewares\CacheResponse::class,
];
```

```php
// cache route trong vòng 5p
Route::get('/my-special-snowflake', 'SnowflakeController@index')->middleware('cacheResponse:300');

// cache route trong vòng 10p
Route::group(function() {
   Route::get('/another-special-snowflake', 'AnotherSnowflakeController@index');

   Route::get('/yet-another-special-snowflake', 'YetAnotherSnowflakeController@index');
})->middleware('cacheResponse:600');
```

**Events**

ta có thể sự dụng các sự kiện (event) được giới thiệu ở dưới đây để theo dõi cũng như debug.

1. *ResponseCacheHit*
`Spatie\ResponseCache\Events\ResponseCacheHit` event này dùng để  FeedbackCache và phản hồi được lưu trong bộ nhớ cache đã được tìm thấy và trả về.
2. *CacheMissed*
`Spatie\ResponseCache\Events\CacheMissed` FeedbackCache nhưng không tìm thấy hoặc trả về kết quả bộ nhớ cache.
3. *ClearingResponseCache và ClearedResponseCache*
`Spatie\ResponseCache\Events\ClearingResponseCache`
`Spatie\ResponseCache\Events\ClearedResponseCache`
2 sự kiên này được kích hoạt khi bắt đầu và kết thúc của việc responsecache:clear


**Creating a Replacer**

Để thay thế nội dung được lưu trong bộ nhớ cache bằng nội dung động, ta có thể tạo một trình thay thế bằng cách thêm một CsrfTokenReplacer trong file config hoặc  implementing interface sau Spatie\ResponseCache\Replacers\Replacer.

```Replacer.php
interface Replacer
{
    /*
     * Transform the initial response before it gets cached.
     *
     * For example: replace a generated csrf_token by '<csrf-token-here>' that you can
     * replace with its dynamic counterpart when the cached response is returned.
     */
    public function transformInitialResponse(Response $response): void;

    /*
     * Replace any data you want in the cached response before it gets
     * sent to the browser.
     *
     * For example: replace '<csrf-token-here>' by a call to csrf_token()
     */
    public function replaceCachedResponse(Response $response): void;
}
```

Sau đó ta sửa lại file config `responsecache.php`

```responsecache.php
'replacers' => [
    \Spatie\ResponseCache\Replacers\CsrfTokenReplacer::class,
],
```

## Tài liệu tham khảo
[laravel-responsecache](https://github.com/spatie/laravel-responsecache)
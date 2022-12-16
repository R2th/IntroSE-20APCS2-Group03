![](https://images.viblo.asia/68397fcc-9db1-4443-bd92-4049a08bda5b.png)

Giả dụ bạn đang làm một dự án mà ứng dụng của họ được sử dụng ở nhiều quốc gia, vậy thì mỗi nơi khác nhau lại có một múi giờ riêng (VD như Việt Nam và Nhật Bản múi giờ chênh lệch nhau 2h) dẫn đến việc lưu timestamp trong DB sẽ bị conflict và sẽ có lúc hiển thị time sai.

Vậy cách giải quyết vấn đề này là gì? Thì trong bài viết hôm nay mình xin hướng dẫn các bạn set multiple timezone trong project laravel nha! cumming nạ :running::running::running:
# 1. Giới thiệu
Như mọi người cũng biết Laravel cũng cấp cho chúng ta folder **config** - dùng để chứa các file cấu hình cho Laravel. Và mặc định khi bạn create 1 project Laravel timezone default sẽ được set mặc định trong file **config/app.php** và mình có thể thay đổi nó thành bất kỳ múi giờ nào bạn mong muốn ạ.
```
    /*
    |--------------------------------------------------------------------------
    | Application Timezone
    |--------------------------------------------------------------------------
    |
    | Here you may specify the default timezone for your application, which
    | will be used by the PHP date and date-time functions. We have gone
    | ahead and set this to a sensible default for you out of the box.
    |
    */

    'timezone' => 'UTC',
```

Tuy nhiên lại quay lại bài toán ở trên, vậy nếu mình muốn sử dụng nhiều timezone khác nhau thì sao? làm cách nào? Thì bây giờ chúng mình cùng đọc tiếp phần 2 của mình nhé!
# 2. Các bước thực hiện
## 1. Create project
Bước đầu tiên mình sẽ tạo 1 project Laravel bằng cách run comman sau:
```
composer create-project laravel/laravel multi-timezone
```
Trong ví dụ demo này mình bỏ qua các bước setup và seed data, mình sử dụng luôn table có sẵn users.
Sau khi create xong project mình tìm đến file **config/app.php** và tìm đến 'timezone' để set timezone mặc định chúng ta sẽ sử dụng nè. VD ở đây mình sẽ set timezone mặc định là Tokyo
```
'timezone' => env('TIMEZONE', 'Asia/Tokyo'),
```
Bước tiếp theo chúng ta sẽ create TimeZoneMiddleware và cấu hình cho nó nhé!
## 2. Create TimeZoneMiddleware
Run comman: 
```php artisan make:middleware TimeZoneMiddleware```

Sau khi câu lệnh chạy xong, mình sẽ đi đăng ký middleware trong app/Http/Kernel.php tại thuộc tính $routeMiddleware để gán middleware đó cho một route cụ thể.
```
    protected $routeMiddleware = [
        \\ other middlewares
        'timezone' => \App\Http\Middleware\TimeZoneMiddleware::class,
    ];
```

PHP cung cấp cho chúng ta hàm **date_default_timezone_set()** và dùng để set giá trị timezone cho hệ thống, sau khi set thì tất cả các hàm xử lí thời gian sẽ sử dụng timezone này.
Sau khi cấu hình cho **TimeZoneMiddleware** thì mình có một file **app/Http/Middleware/TimeZoneMiddleware.php** như sau:
```
<?php

namespace App\Http\Middleware;

use Closure;

class TimeZoneMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $timezone = ($request->hasHeader('X-Timezone')) ? $request->header('X-Timezone') : config('app.timezone');
        date_default_timezone_set($timezone);

        return $next($request);
    }
}
```

Ở đây mình sẽ thực hiện kiểm tra header request truyền lên. Và nếu k gửi lên **X-Timezone** thì mình set nó sử dụng giá trị mặc định trong file **config/app.php**.
Ting ting vậy là mình đã đi được nửa chặng đường rồi đó ạ hí hí.
## 3. SetAttribute and GetAttribute in BaseModel
Giờ đây các bạn có thể hình dung cách mình giải quyết bài toán trên đó là trong database của chúng ta mình chỉ lưu trữ dữ liệu timestamp ở một dạng mặc định. Từ đó dựa vào timezone truyền lên mà chúng ta có thể set và get dữ liệu ra đúng như mình mong muốn.

Laravel đã cung cấp Eloquent: Mutators khá hay - đó là khi bạn set hoặc get một attributes nào đó đã được định nghĩa thì mỗi lần ta call đến attributes đó đều auto chạy vào function setAttribute/getAttribute. Để biết thêm chi tiết các bạn đọc ở [đây](https://laravel.com/docs/5.8/eloquent-mutators) nhé!
Ở đây mình có tạo 1 BaseModel và model User được extend từ đây, trong này có viết 2 function setAttribute and getAttribute như sau:
```
<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;

class BaseModel extends Model
{
    /**
     * Set a given attribute on the model.
     *
     * @param  string  $key
     * @param  mixed  $value
     * @return mixed
     */
    public function setAttribute($key, $value)
    {
        $array = [
            'created_at',
            'updated_at',
        ];

        if (in_array($key, $array)) {
            $timezone = new \DateTime('now');

            if (!($value instanceof Carbon)) {
                $value = Carbon::parse($value);
            }

            return $this->attributes[$key] = Carbon::createFromFormat('Y-m-d H:i:s', $value, $timezone->getTimezone())
                ->setTimezone(config('app.timezone'));
        }

        return parent::setAttribute($key, $value);
    }

    /**
     * Get an attribute from the model.
     *
     * @param  string  $key
     * @return mixed
     */
    public function getAttribute($key)
    {
        $array = [
            'created_at',
            'updated_at',
        ];

        if (in_array($key, $array)) {
            $timezone = new \DateTime('now');
            $value = $this->getAttributeValue($key);

            if (!($value instanceof Carbon)) {
                $value = Carbon::parse($value);
            }

            return Carbon::createFromFormat('Y-m-d H:i:s', $value, config('app.timezone'))
                ->setTimezone($timezone->getTimezone());
        }

        return parent::getAttribute($key);
    }
}
```

Nhìn tên function chúng ta cũng lờ mờ đoán ra ý nghĩa của chúng đúng k ạ, Tuy nhiên mình vẫn sẽ giải thích qua một chút nhé:
* **function setAttribute()**: sẽ được gọi đến khi bạn create/update 1 record có thao tác với attributes đã được định nghĩa trong function. 
* **function getAttribute()**: sẽ được gọi đến khi bạn get records có thao tác với attributes đã được định nghĩa trong function. 

Và giờ đây muốn sử dụng chúng ta  chỉ cần thêm middleware đó vào trc mỗi API cần dùng và truyền lên Headers X-Token là uki nạ: VD
```
Route::group(['prefix' => 'v1', 'namespace' => 'Api\V1', 'middleware' => ['timezone']], function () {
    Route::resource('users', 'UsersController');
});
```

Sau khi cấu hình xong tất cả, bây giờ mỗi lần bạn create/update mặc định created_at or updated_at sẽ mặc định chuyển và lưu time theo múi giờ Tokyo, thật tiện lợi phải không ạ. 
# 3. Kết luận
Bài viết này mình đã chia sẻ với mọi người về cách config khi làm việc với dự án nhiều timezone bằng việc đưa bài toán về dạng lưu một dạng timezone mặc định trong database. Rất vui được khi được mọi người đọc bài và ủng hộ ạ <3
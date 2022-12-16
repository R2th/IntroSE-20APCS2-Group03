Tuy Laravel 6.0 mới ra mắt cách đây không lâu (tháng 9 năm 2019), nhưng hôm nay laravel đã ra mắt phiên bản thứ 7 với khá nhiều cập nhật lớn và hữu ích: giới thiệu Laravel Airlock, cải thiện tốc độ routing, tùy chỉnh Eloquent casts, Blade component tags, fluent string operations, HTTP client, first-party CORS support, cải tiến scoping cho route model binding, tùy biến stub, cải thiện hàng đợi database, hỗ trợ đồng thời nhiều mail drivers, casts khi truy vấn, command mới `test`, sửa lỗi và cải thiện nhiều phần khác. Sau đây là chi tiết:

# Laravel Airlock
Laravel Airlock cung cấp một hệ thống authentication gọn nhẹ cho SPAs (single page applications), ứng dụng mobile, và đơn giản hơn là token based APIs. Airlock cho phép mỗi người dùng ứng dụng của bạn có thể tạo ra nhiều API token cho tài khoản của họ. Những token này có thể được cấp abilities / scopes quy định hành động nào mà nó có thể thực hiện.

Để xem thông tin chi tiết về Laravel Airlock, xem chi tiết tại [Airlock documentation](https://laravel.com/docs/7.x/airlock).

# Tùy chỉnh Eloquent Casts
Laravel được tích hợp sẵn sẵn nhiều kiểu cast hữu ích. Tuy nhiên, đôi khi bạn cần định nghĩa kiểu cast khác cho dự án của mình. Bây giờ bạn có thể thực hiện điều đó bằng cách tạo một class implements CastsAttributes interface.

Những class implements interface này phải định nghĩa hai phương thức là `get` và `set`. Phương thức `get` sẽ chuyển đổi giá trị từ DB thành sang kiểu dữ liệu mong muốn. Ngược lại, phương thức `set` sẽ chuyển đổi giá trị của trường thành giá trị có thể lưu trữ được trong DB. Vị dụ về cast `json` được tích hợp sẵn:
```php
namespace App\Casts;

use Illuminate\Contracts\Database\Eloquent\CastsAttributes;

class Json implements CastsAttributes
{
    /**
     * Cast the given value.
     *
     * @param  \Illuminate\Database\Eloquent\Model  $model
     * @param  string  $key
     * @param  mixed  $value
     * @param  array  $attributes
     * @return array
     */
    public function get($model, $key, $value, $attributes)
    {
        return json_decode($value, true);
    }

    /**
     * Prepare the given value for storage.
     *
     * @param  \Illuminate\Database\Eloquent\Model  $model
     * @param  string  $key
     * @param  array  $value
     * @param  array  $attributes
     * @return string
     */
    public function set($model, $key, $value, $attributes)
    {
        return json_encode($value);
    }
}
```
Sau khi định nghĩa kiểu cast, bạn có thể gán cho thuộc tính trong Model thông qua tên class.
```php
<?php

namespace App;

use App\Casts\Json;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'options' => Json::class,
    ];
}
```
Để tìm hiểu chi tiết, xem thêm tại [Eloquent documentation](https://laravel.com/docs/7.x/eloquent-mutators#custom-casts).

# Blade Component Tags & Improvements

Blade components đã được cải tiến, cho phép sử dụng tag, quản lý thuộc tính, component classes, inline view components, ... Bởi vì những thay đổi này rất rộng, vui lòng truy cập [full Blade component documentation](https://laravel.com/docs/7.x/blade#components) để tìm hiểu một cách đầy đủ nhất.

Tóm lại, từ bây giờ, một component có thể gán với một Class quy định dữ liệu của nó. Tất cả các thuộc tính và phương thức public của Class sẽ có hiệu lực trong component view. Bất kỳ thuộc tính HTML nào khác của component sẽ được lưu vào biến `$attribute`.

Ví dụ, chúng ta tạo một component App\View\Components\Alert như sau:
```php
<?php

namespace App\View\Components;

use Illuminate\View\Component;

class Alert extends Component
{
    /**
     * The alert type.
     *
     * @var string
     */
    public $type;

    /**
     * Create the component instance.
     *
     * @param  string  $type
     * @return void
     */
    public function __construct($type)
    {
        $this->type = $type;
    }

    /**
     * Get the class for the given alert type.
     *
     * @return string
     */
    public function classForType()
    {
        return $this->type == 'danger' ? 'alert-danger' : 'alert-warning';
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\View\View|string
     */
    public function render()
    {
        return view('components.alert');
    }
}
```
Và template của component trên như sau:
```
<!-- /resources/views/components/alert.blade.php -->

<div class="alert {{ $classForType() }}" {{ $attributes }}>
    {{ $heading }}

    {{ $slot }}
</div>
```
Khi đó, component này có thể sử dụng ở template Blade khác bằng cách sử dụng component tag:
```
<x-alert type="error" class="mb-4">
    <x-slot name="heading">
        Alert content...
    </x-slot>

    Default slot content...
</x-alert>
```
Như đã nói, đây chỉ là một ví dụ rất nhỏ trong số rất nhiều thay đổi của Blade của Laravel 7.  Vui lòng tham khảo [full Blade component documentation](https://laravel.com/docs/7.x/blade#components) để tìm hiểu chi tiết.

# HTTP Client
Bây giờ, Laravel cung cấp một HTTP Client tối giản sử dụng **Guzzle HTTP client**, cho phép bạn thực hiện các HTTP request một cách nhanh nhất, tập trung vào những trường hợp phổ biến và trải nghiệm của developers. Ví dụ gửi POST request với JSON data:

```php
use Illuminate\Support\Facades\Http;

$response = Http::withHeaders([
    'X-First' => 'foo'
    'X-Second' => 'bar'
])->post('http://test.com/users', [
    'name' => 'Taylor',
]);

return $response['id'];
```
Ngoài ra, HTTP Client còn cung cấp chức năng test tiện dụng:
```php
Http::fake([
    // Stub a JSON response for GitHub endpoints...
    'github.com/*' => Http::response(['foo' => 'bar'], 200, ['Headers']),

    // Stub a string response for Google endpoints...
    'google.com/*' => Http::response('Hello World', 200, ['Headers']),

    // Stub a series of responses for Facebook endpoints...
    'facebook.com/*' => Http::sequence()
                            ->push('Hello World', 200)
                            ->push(['foo' => 'bar'], 200)
                            ->pushStatus(404),
]);
```

Để tim hiểu thêm về HTTP client, vui lòng truy cập [HTTP client documentation](https://laravel.com/docs/7.x/http-client).

# Fluent String Operations
Như bạn đã biết, Class Illuminate\Support\Str cung cấp khá nhiều function hữu ích để thao tác với chuỗi. Laravel 7 cung cấp một thư viện hướng đối tượng hơn để làm việc với chuỗi, dựa trên những function đã có. Bạn có thể tạo một đối tượng Illuminate\Support\Stringable  bằng cách sử dụng phương thức Str::of. Khi đó, nhiều phương thức có thể sử dụng liên tiếp để thao tác với chuỗi:
```php
return (string) Str::of('  Laravel Framework 6.x ')
                    ->trim()
                    ->replace('6.x', '7.x')
                    ->slug();
```
Để tìm hiểu thêm và các phương thức có sẵn, vui lòng truy cập [full documentation](https://laravel.com/docs/7.x/helpers#fluent-strings).

# Cải thiện Route Model Binding
## Key Customization
Đôi khi bạn muốn resolve Eloquent models bằng một column khác id. Để làm điều đó, Laravel 7 cho phép chỉ định column trong định nghĩaroute parameter:
```php
Route::get('api/posts/{post:slug}', function (App\Post $post) {
    return $post;
});
```
## Automatic Scoping
Đôi khi, khi binding ngầm nhiều Eloquent models trong cùng một route, bạn muốn ràng buộc Eloquent model thứ 2 là còn của Eloquent model thứ nhất. Ví dụ, khi bạn muốn truy cập một bài đăng theo slug cho user chỉ định:
```php
use App\Post;
use App\User;

Route::get('api/users/{user}/posts/{post:slug}', function (User $user, Post $post) {
    return $post;
});
```
Khi sử dụng các route parameter lồng nhau, Laravel 7 sẽ tự động giới hạn truy vấn để lấy thông tin nested model theo parent của nó, sử dụng conventions để đoán relationship trong parent model. Trong trường hợp này, giả sử User model có một relationship là `posts` (số nhiều của tham số trong route), nó sẽ được sử dụng để lấy thông tin Post model.
Để xem thêm về route model binding, vui lòng truy cập [routing documentation](https://laravel.com/docs/7.x/routing#route-model-binding).

# Multiple Mail Drivers
Laravel 7 cho phép cấu hình nhiều "mailers" cho một ứng dụng. Mỗi cấu hình mailer trong config `mail` sẽ có tùy chọn riêng, kể cả "transport", cho phép ứng dụng của bạn sử dụng các email services khác nhau để gửi email messages. Ví dụ, ứng dụng của bạn có thể sử dụng Postmark để gửi email trực tiếp, đồng thời sử dụng Amazon SES để gửi email hàng loạt.

Mặc định, Laravel sử dụng mailer được thiết lập `default` trong file `mail` config. Tuy nhiên, bạn có thể sử dụng phương thức `mailer`để gửi email bằng mailer chỉ định:
```php
Mail::mailer('postmark')
        ->to($request->user())
        ->send(new OrderShipped($order));
```

# Cải thiện tốc độ Route Caching
Laravel 7 bao gồm một phương thức matching compiled mới, cached routes được cache bằng lệnh Artisan `route:cache`. Đối với các ứng dụng lớn (khoảng 800 route trở lên),  những cải thiện này cho kết quả nhanh gấp 2 lần. Những thay đổi này sẽ tự động được áp dụng mà không cần thay đổi từ hệ thống của bạn.

# CORS Support
Laravel 7 bao gồm first-party support để cấu hình Cross-Origin Resource Sharing (CORS) OPTIONS bằng cách tích hợp package Laravel CORS được viết bởi Barry vd. Heuvel. File cấu hình `cors` mặc định sẽ được thêm vào trong ứng dụng Laravel.

Để tìm hiểu thêm về CORS support in Laravel 7.x, vui lòng truy cập [CORS documentation](https://laravel.com/docs/7.x/routing#cors).

# Query Time Casts
Đôi khi, bạn cần áp dụng cast khi thực thi truy vấn, ví dụ như select raw từ table. Ví dụ:
```php
use App\Post;
use App\User;

$users = User::select([
    'users.*',
    'last_posted_at' => Post::selectRaw('MAX(created_at)')
            ->whereColumn('user_id', 'users.id')
])->get();
```
Thuộc tính last_posted_at trong kết quả của query trên là một string. Sẽ thuận tiện hơn nếu chúng ta có thể áp dụng cast thuộc tính này thành date khi thực thi truy vấn. Để thực hiện điều này, chúng ta sử dụng phương thức withCasts được cung cấp bởi Laravel 7:

```php
$users = User::select([
    'users.*',
    'last_posted_at' => Post::selectRaw('MAX(created_at)')
            ->whereColumn('user_id', 'users.id')
])->withCasts([
    'last_posted_at' => 'date'
])->get();
```

# Cải thiện MySQL 8+ Database Queue
Trong các bản phát hành trước đây của Laravel, `database` queue không đủ mạnh để sử dụng trong production. Tuy nhiên, Laravel 7 cung cấp các cải tiến cho các ứng dụng sử dụng MySQL 8+. Bằng cách sử dụng mệnh đề `FOR UPDATE SKIP LOCKED` và các cải tiến SQL khác, trình `database` driver giờ đây có thể được sử dụng một cách an toàn trong các ứng dụng production.

# Lệnh Artisan `test`
Ngoài lệnh `phpunit`,  từ bây giờ bạn có thể sử dụng lệnh Artisan `test` để chạy test. Artisan test runner cung cấp giao diện đẹp hơn và hiển thị nhiều thông tin hơn về  test đang chạy. Ngoài ra, runner sẽ tự động dừng lại khi gặp trường hợp fail đầu tiên:
```
php artisan test
```
![](https://images.viblo.asia/d74ae574-bef6-490a-9c33-a42621e01268.png)

Bất kỳ tham số nào có thể truyền vào lệnh `phpunit` cũng có thể được sử dụng với lệnh `php artisan test`:
```
php artisan test --group=feature
```

# Cải thiện Markdown Mail Template
Markdown mail template mặc định đã được làm mới, hiện đại hơn dựa theo Tailwind CSS color palette. Tất nhiên, template này có thể published và tùy chỉnh theo nhu cầu ứng dụng của bạn:
![](https://images.viblo.asia/a9cdb040-fbe7-446f-9427-16e5925b5290.png)

Để biết thêm thông tin về Markdown mail, vui lòng truy cập [mail documentation](https://laravel.com/docs/7.x/mail#markdown-mailables).

# Tùy chỉnh Stub
Lệnh Artisan `make` được sử dụng để tạo rất nhiều class,  ví dụ như: controllers, jobs, migrations, và tests. Những class này được từ các "stub" file và dựa theo giá trị bạn nhập vào. Tuy nhiên, đôi khi có thể bạn muốn có những thay đổi nhỏ đối với file được tạo ra bởi lệnh Artisan. Để làm điều này, Laravel 7 cung cấp lệnh `stub:publish` để publish hầu hết các stub thông thường để bạn có thể tùy biến:

`php artisan stub:publish`

Những stub published sẽ nằm ở thư mục `stubs` trong thư mục gốc của ứng dụng. Bất cứ thay đổi nào bạn thực hiện với những stubs này sẽ được phản ánh khi bạn tạo class tương ứng  bằng lệnh Artisan `make`.

# Queue maxExceptions Configuration
Đôi khi bạn muốn quy định một job có thể được thử lại nhiều lần, nhưng sẽ thất bại nếu nếu khi thử lại có một số lượng exceptions nhất định. Trong Laravel 7, bạn có thể định nghĩa thuộc tính maxExceptions trong job class:
```php
<?php

namespace App\Jobs;

class ProcessPodcast implements ShouldQueue
{
    /**
     * The number of times the job may be attempted.
     *
     * @var int
     */
    public $tries = 25;

    /**
     * The maximum number of exceptions to allow before failing.
     *
     * @var int
     */
    public $maxExceptions = 3;

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        Redis::throttle('key')->allow(10)->every(60)->then(function () {
            // Lock obtained, process the podcast...
        }, function () {
            // Unable to obtain lock...
            return $this->release(10);
        });
    }
}
```
In this example, the job is released for ten seconds if the application is unable to obtain a Redis lock and will continue to be retried up to 25 times. However, the job will fail if three unhandled exceptions are thrown by the job.

Tham khảo:  [Laravel Release Notes](https://laravel.com/docs/7.x/releases#laravel-7)
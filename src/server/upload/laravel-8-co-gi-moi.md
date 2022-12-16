Laravel 8 tiếp tục những cải tiến được thực hiện trong Laravel 7.x bằng việc ra mắt Laravel Jetstream, model factory classes, migration squashing, job batching, cải tiến rate limiting, cải tiến queue, dynamic Blade components, Tailwind pagination views, time testing helpers, cải tiến `artisan serve`, cải tiến event listener, sửa lỗi và nhiều cải tiến khác.

## Laravel Jetstream
[Laravel Jetstream](https://github.com/laravel/jetstream) là một bộ khung được xây dựng cho Laravel, là điểm khởi đầu cho dự án tiếp theo của bạn. Jetstream bao gồm các chức năng đăng nhập, đăng ký, xác thực địa chỉ email, xác thực 2 lớp (two-factor authentication), quản lý session, hỗ trợ API thông qua Laravel Sanctum, và tuỳ chọn quản lý team. Laravel Jetstream thay thế và cải tiến dựa trên authentication UI có sẵn ở phiên bản Laravel trước.

Jetstream được thiết kế bằng [Tailwind CSS](https://tailwindcss.com/) và cung cấp lựa chọn sử dụng [Livewire](https://laravel-livewire.com/) hoặc [Inertia](https://inertiajs.com/).

## Thư mục Models
Do có nhiều yêu cầu từ cộng đồng người dùng, ứng dụng mặc định của Laravel nay sẽ có thêm thư mục `app/Models` để chứa các Eloquent model. Tất cả các artisan command liên quan cũng đã được cập nhật để kiểm tra thư mục này có tồn tại hay không. Nếu không, Eloquent model sẽ được lưu ở thư mục `app`.

## Model Factory Classes
Eloquent model factories đã được viết lại hoàn toàn dựa trên class và cải tiến để hỗ trợ relationship. Ví dụ, UserFactory có sẵn trong Laravel được viết như sau:
```php
<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = User::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->name,
            'email' => $this->faker->unique()->safeEmail,
            'email_verified_at' => now(),
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'remember_token' => Str::random(10),
        ];
    }
}
```
Nhờ có Trait HasFactory có sẵn khi khởi tạo models, model factory có thể sử dụng như sau:
```php
use App\Models\User;

User::factory()->count(50)->create();
```
Vì model factories giờ đây là những class PHP, các state transformations có thể viết dưới dạng phương thức của class. Ngoài ra, bạn có thể sử dụng bất kỳ helper class nào vào Eloquent model factory nếu muốn.

Ví dụ,  `User` model có một state là `suspended` để thay đổi một trong những thuộc tính mặc định của nó. Bạn có thể định nghĩa state transformations bằng phương thức `state` của base factory. Bạn có thể đặt trên phương thức state tuỳ ý. Dù sao nó cũng chỉ là một phương thức PHP:
```php
/**
 * Indicate that the user is suspended.
 *
 * @return \Illuminate\Database\Eloquent\Factories\Factory
 */
public function suspended()
{
    return $this->state([
        'account_status' => 'suspended',
    ]);
}
```
Sau khi định nghĩa phương thức state transformation, bạn có thể sử dụng như sau:
```
use App\Models\User;

User::factory()->count(5)->suspended()->create();
```
Như đã đề cập, Model factory của Laravel 8 hỗ trợ relationships. Vì vậy, giả sử `User` model chứa phương thức relationship là `posts`, chúng ta có thể chạy đoạn code sau để tạo 3 post cho user:
```php
$users = User::factory()
            ->hasPosts(3, [
                'published' => false,
            ])
            ->create();
```
Để đơn giản hoá quá trình nâng cấp, package [`laravel/legacy-factories`](https://github.com/laravel/legacy-factories) đã được phát hành, cung cấp hỗ trợ cho các phiên bản trước của model factories trong Laravel 8.x.
Xem thêm tại [database testing documentation](https://laravel.com/docs/8.x/database-testing#creating-factories).

## Migration Squashing
Trong quá trình xây dựng ứng dụng, số lượng migrations sẽ tích luỹ ngày càng nhiều theo thời gian. Điều này khiến thư mục migration  trở nên cồng kềnh với hàng trăm migrations. Nếu bạn muốn, bạn có thể "squash" migrations vào trong một file SQL duy nhất. để bắt đầu, chạy lệnh `schema:dump`:
```
php artisan schema:dump

// Dump database schema hiện tại và xoá tất cả migrations đang có...
php artisan schema:dump --prune
```

## Job Batching
Tính năng job batching của Laravel cho phép bạn dễ dàng thực hiện một loạt các job, sau đó thực hiện một số hành động khi batch thực thi xong.
Phương thức `batch` của `Bus` facade có thể được sử dụng để dispatch một batch. Tất nhiên, batching chỉ thực sự hữu ích khi kết hợp với các callback. Vì vậy, bạn có thể sử dụng phương thức `then`, `catch` và `finally` để khai báo các callback cho batch. Mỗi callback này sẽ nhận instance của `Illuminate\Bus\Batch` khi được gọi:
```php
use App\Jobs\ProcessPodcast;
use App\Podcast;
use Illuminate\Bus\Batch;
use Illuminate\Support\Facades\Batch;
use Throwable;

$batch = Bus::batch([
    new ProcessPodcast(Podcast::find(1)),
    new ProcessPodcast(Podcast::find(2)),
    new ProcessPodcast(Podcast::find(3)),
    new ProcessPodcast(Podcast::find(4)),
    new ProcessPodcast(Podcast::find(5)),
])->then(function (Batch $batch) {
    // All jobs completed successfully...
})->catch(function (Batch $batch, Throwable $e) {
    // First batch job failure detected...
})->finally(function (Batch $batch) {
    // The batch has finished executing...
})->dispatch();

return $batch->id;
```
Xem thêm tại [queue documentation](https://laravel.com/docs/8.x/queues#job-batching).

## Improved Rate Limiting
Tính năng Request rate limiter của Laravel đã được mở rộng với sự linh hoạt và mạnh mẽ, trong khi vẫn giữ được khả năng tương thích với throttle middleware API trong các phiên bản trước.
Rate limiters được khai báo bằng phương thức `for` cua `RateLimiter` facade. Phương thức `for` chấp nhận một rate limiter name và một Closure trả về thiết lập limit áp dụng cho route được gán rate limiter:
```php
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Support\Facades\RateLimiter;

RateLimiter::for('global', function (Request $request) {
    return Limit::perMinute(1000);
});
```
Vì rate limiter callback nhận instance của HTTP Request là tham số, bạn có thể xây dựng rate limit phân loại được dựa trên request hoặc người dùng:
```php
RateLimiter::for('uploads', function (Request $request) {
    return $request->user()->vipCustomer()
                ? Limit::none()
                : Limit::perMinute(100);
});
```
Đôi khi bạn muốn phân chia rate limit theo một số giá trị tuỳ ý. Ví dụ, bạn muốn người dùng truy cập 1 route nào đó 100 lần mỗi phút dựa trên địa chỉ IP. Để thực hiện điều này, bạnc so thể sử dụng phương thức `by` khi xây dựng rate limit:
```php
RateLimiter::for('uploads', function (Request $request) {
    return $request->user()->vipCustomer()
                ? Limit::none()
                : Limit::perMinute(100)->by($request->ip());
});
```
Rate limiter có thể được gán vào route bằng cách sử dụng middleware throttle. Middleware này nhận vào tên của rate limiter bạn muốn gán cho route:
```php
Route::middleware(['throttle:uploads'])->group(function () {
    Route::post('/audio', function () {
        //
    });

    Route::post('/video', function () {
        //
    });
});
```
Xem thêm tại [routing documentation](https://laravel.com/docs/8.x/routing#rate-limiting).

## Improved Maintenance Mode
Trong các phiên bản trước của Laravel, tính năng maintenance mode `php artisan down`  có thể bỏ qua bằng cách sử dụng "allow list" chứa các địa chỉ IP được phép truy cập vào ứng dụng. Tính năng này đã được loại bỏ để chuyển sang giải pháp "secret" / token đơn giản hơn.
Khi ở maintenance mode, bạn có thể sử dụng tuỳ chọn `secret` để định nghĩa một bypass token.
```
php artisan down --secret="1630542a-246b-4b66-afa1-dd72a4c43515"
```
Sau khi đặt ứng dụng vào maintenance mode, bạn có thể truy cập ứng dụng thông qua URL chứa token. Laravel sẽ trả về cookie để bypass maintenance mode cho trình duyệt.
```
https://example.com/1630542a-246b-4b66-afa1-dd72a4c43515
```
Sau khi truy cập route này, bạn sẽ được redirect về route `/`. Một khi cookie được tạo ra, bạn có thể truy cập ứng dụng bình thường như đang không trong maintenance mode.

### Pre-Rendering The Maintenance Mode View
Nếu bạn sử dụng lệnh `php artisan down` trong khi đang deployment, người dùng có thể đôi khi gặp phải lỗi nếu truy cập ứng dụng trong khi các dependencies của composer hoặc các infrastructure components khác đang được cập nhật. Điều này xảy ra bởi vì một phần của Laravel phải khởi chạy để kiểm tra xem ứng dụng của bạn có đang trong maintenance mode hay không và render view bằng template engine.
Vì lý do này, Laravel giờ đây cho phép bạn pre-render một view cho maintenance mode sẽ được trả về ngay khi bắt đầu request cycle. View này đã được render trước khi bất kỳ dependencies nào của ứng dụng được load. Bạn có thể pre-render một template tuỳ chọn bằng option `render` của lệnh `down`:
```
php artisan down --render="errors::503"
```

## Closure Dispatch / Chain
Bằng cách sử dụng phương thức `catch` mới, bây giờ bạn có thể cung cấp một Closure sẽ được thực thi nếu queue Closure thất bại sau khi kết thúc tất cả các lần thử được thiết lập trong queue:
```php
use Throwable;

dispatch(function () use ($podcast) {
    $podcast->publish();
})->catch(function (Throwable $e) {
    // This job has failed...
});
```

## Dynamic Blade Components
Đôi khi bạn muốn render một component nhưng không biết trước tên component cho đến khi thực chạy. Trong trường hợp này, bạn có thể sử dụng component dynamic-component được xây dựng sẵn trong Laravel để render component dựa trên giá trị khi chạy hoặc biến:
```
<x-dynamic-component :component="$componentName" class="mt-4" />
```
Xem thêm tại [Blade documentation](https://laravel.com/docs/8.x/blade#components).

## Event Listener Improvements
Từ bây giờ, event listener dựa trên Closure có thể được register chỉ bằng cách truyền Closure vào phương thức `Event::listen`. Laravel sẽ kiểm tra Closure để xác định loại event được xử lý.
```php
use App\Events\PodcastProcessed;
use Illuminate\Support\Facades\Event;

Event::listen(function (PodcastProcessed $event) {
    //
});
```
Ngoài ra, event listener dựa trên Closure  có thể được đánh dấu là queueable bằng cách sử dụng hàm Illuminate\Events\queueable:
```php
use App\Events\PodcastProcessed;
use function Illuminate\Events\queueable;
use Illuminate\Support\Facades\Event;

Event::listen(queueable(function (PodcastProcessed $event) {
    //
}));
```
Giống như queued jobs, bạn có thể sử dụng các phương thức `onConnection`, `onQueue` và `delay` để tuỳ chỉnh việc thực thi của queued listener.
```php
Event::listen(queueable(function (PodcastProcessed $event) {
    //
})->onConnection('redis')->onQueue('podcasts')->delay(now()->addSeconds(10)));
```
Nếu bạn muốn xử lý lỗi của anonymous queued listener, bạn có thể truyền một Closure cho phương thức `catch` khi khai báo queueable listener:
```php
use App\Events\PodcastProcessed;
use function Illuminate\Events\queueable;
use Illuminate\Support\Facades\Event;
use Throwable;

Event::listen(queueable(function (PodcastProcessed $event) {
    //
})->catch(function (PodcastProcessed $event, Throwable $e) {
    // The queued listener failed...
}));
```

## Time Testing Helpers
Khi testing, đôi khi bạn có thể sẽ muốn thay đổi thời gian trả về bởi helper như `now` hoặc `Illuminate\Support\Carbon::now()`. Từ bây giờ, class base feature test của Laravel sẽ có các helper cho phép bạn thao tác với thời gian hiện tại:
```php
public function testTimeCanBeManipulated()
{
    // Travel into the future...
    $this->travel(5)->milliseconds();
    $this->travel(5)->seconds();
    $this->travel(5)->minutes();
    $this->travel(5)->hours();
    $this->travel(5)->days();
    $this->travel(5)->weeks();
    $this->travel(5)->years();

    // Travel into the past...
    $this->travel(-5)->hours();

    // Travel to an explicit time...
    $this->travelTo(now()->subHours(6));

    // Return back to the present time...
    $this->travelBack();
}
```

## Artisan `serve` Improvements
Lệnh `serve` của Artisan được cải tiến để tự động reload khi biến môi trường trong file `.env` được thay đổi. Trước đây, việc này phải được stop và restart bằng cơm.

## Tailwind Pagination Views
Paginator của Laravel được cập nhật, thêm template cho [Tailwind CSS](https://tailwindcss.com/).

## Routing Namespace Updates
Trong các phiên bản trước của Laravel, `RouteServiceProvider` chứa thuộc tính `$namespace`. Thuộc tính này sẽ được tự động thêm vào trước các khai báo controller route và khi gọi đến helper `action` / `URL::action`. Trong Laravel 8.x, thuộc tính này mặc định được đặt là `null`. Nghĩa là sẽ không có prefix namespace nào được thực hiện bởi Laravel. Thay vào đó, trong ứng dụng Laravel 8.x, định nghĩa controller route sẽ được xác định bằng cú pháp chuẩn của PHP:
```php
use App\Http\Controllers\UserController;

Route::get('/users', [UserController::class, 'index']);
```
Gọi đến `action` và các phương thức liên quan:
```php
action([UserController::class, 'index']);

return Redirect::action([UserController::class, 'index']);
```
Nếu thích sử dụng prefix giống như Laravel 7.x, bạn chỉ cần thêm thuộc tính `$namespace` vào `RouteServiceProvider`.

**Lưu ý**: Những thay đổi này chỉ áp dụng cho ứng dụng khởi tạo bằng Laravel 8.x. Ứng dụng upgrade từ Laravel 7.x vẫn sẽ có thuộc tính `$namespace` trong `RouteServiceProvider`.

Nguồn: https://laravel.com/docs/8.x/releases
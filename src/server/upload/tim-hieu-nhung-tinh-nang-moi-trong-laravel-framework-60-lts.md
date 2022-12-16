![](https://images.viblo.asia/f1575929-86ed-4531-a873-f1f3fbb271f5.jpg)
## Lời nói đầu
Chào các bạn, Như các bạn đã biết, Laravel vừa released version 6.0 (LTS), do đó trong bài viết hôm nay mình xin giới thiệu một vài tính năng mới trong Laravel 6.0.
## Nội dung
### 1. Laravel Vapor Compatibility
Laravel 6.0 cung cấp khả năng tương thích với Laravel Vapor , một nền tảng triển khai không có máy chủ tự động mở rộng cho Laravel. Vapor trừu tượng hóa sự phức tạp của việc quản lý các ứng dụng Laravel trên AWS Lambda, cũng như can thiệp vào các ứng dụng đó với SQS queues, databases, Redis clusters,networks, CloudFront CDN, v.v.
### 2. cải thiện Exceptions thông qua Ignition
Tại phiên bản Laravel 6.0 có sử dụng  Ignition, đây là một trang exception detail mã nguồn mở mới được tạo bởi Freek Van der Herten và Marcel Pociot. Ignition cung cấp nhiều lợi ích so với các bản phát hành trước đó, chẳng hạn như cải thiện tệp lỗi Blade và xử lý số dòng, giải pháp có thể chạy cho các vấn đề phổ biến, code editing,  exception sharing và UX được cải thiện.
![](https://images.viblo.asia/b4192162-3886-4386-b832-5cdb349a87c4.png)
### 3. Cải thiện Authorization Responses
Trong các bản phát hành trước đây của Laravel, rất khó để truy xuất và hiển thị các thông báo  custom authorizationcho người dùng cuối. Điều này gây khó khăn cho việc giải thích cho người dùng cuối chính xác lý do tại sao một yêu cầu cụ thể bị request was denied. Trong Laravel 6.0, điều này giờ đây dễ dàng hơn nhiều khi sử dụng các thông báo authorization response và phương thức mới Gate::inspect. Ví dụ, đưa ra policy method:
```
/**
 * Determine if the user can view the given flight.
 *
 * @param  \App\User  $user
 * @param  \App\Flight  $flight
 * @return mixed
 */
public function view(User $user, Flight $flight)
{
    return $this->deny('Explanation of denial.');
}
```
Response authorization policy's và message authorization policy có thể dễ dàng truy xuất bằng phương thức:Gate::inspect
```
$response = Gate::inspect('view', $flight);

if ($response->allowed()) {
    // User is authorized to view the flight...
}

if ($response->denied()) {
    echo $response->message();
}

```
Ngoài ra, các thông báo tùy chỉnh này sẽ tự động được trả về giao diện của bạn khi sử dụng các phương thức trợ giúp như $this->authorize từ các routes or controllers của bạn.
### 4. Job Middleware
Job middleware cho phép bạn wrap custom logic xung quanh việc thực hiện queue jobs, giảm phức tạp trong các công việc. Ví dụ, trong các bản phát hành trước đây của Laravel, bạn có thể wrapped logic a job của phương thức handle trong một rate-limited callback:
```
/**
 * Execute the job.
 *
 * @return void
 */
public function handle()
{
    Redis::throttle('key')->block(0)->allow(1)->every(5)->then(function () {
        info('Lock obtained...');

        // Handle job...
    }, function () {
        // Could not obtain lock...

        return $this->release(5);
    });
}

```
Trong Laravel 6.0, logic này có thể được extracted thành  job middleware, cho phép bạn giữ job's handle method của mình mà không có bất kỳ  rate limiting responsibilities:
```
<?php

namespace App\Jobs\Middleware;

use Illuminate\Support\Facades\Redis;

class RateLimited
{
    /**
     * Process the queued job.
     *
     * @param  mixed  $job
     * @param  callable  $next
     * @return mixed
     */
    public function handle($job, $next)
    {
        Redis::throttle('key')
                ->block(0)->allow(1)->every(5)
                ->then(function () use ($job, $next) {
                    // Lock obtained...

                    $next($job);
                }, function () use ($job) {
                    // Could not obtain lock...

                    $job->release(5);
                });
    }
}
```
Sau khi tạo middleware, chúng có thể được gắn vào một job bằng cách returning chúng từ job's middleware method:
use App\Jobs\Middleware\RateLimited;
```
/**
 * Get the middleware the job should pass through.
 *
 * @return array
 */
public function middleware()
{
    return [new RateLimited];
}
```
### 5. Lazy Collections
Nhiều nhà phát triển đã sẵn sàng sử dụng  Collection methods mạnh mẽ của Laravel . Để bổ sung cho Collection class đã rất mạnh mẽ, Laravel 6.0 giới thiệu một LazyCollection, sử dụng các trình generators của PHP để cho phép bạn làm việc với các bộ dữ liệu rất lớn trong khi vẫn giữ mức sử dụng bộ nhớ thấp.
Ví dụ, ứng dụng của bạn cần xử lý tệp nhật ký có dung lượng tính bằng gigabyte trong khi đang sử dụng các collection methods của Laravel để phân tích các bản ghi. Thay vì đọc toàn bộ tệp vào bộ nhớ cùng một lúc, các lazy collections có thể được sử dụng để chỉ giữ một phần nhỏ của tệp trong bộ nhớ tại một thời điểm nhất định:
```
use App\LogEntry;
use Illuminate\Support\LazyCollection;

LazyCollection::make(function () {
    $handle = fopen('log.txt', 'r');

    while (($line = fgets($handle)) !== false) {
        yield $line;
    }
})
->chunk(4)
->map(function ($lines) {
    return LogEntry::fromLines($lines);
})
->each(function (LogEntry $logEntry) {
    // Process the log entry...
});
```
Hoặc, bạn cần lặp lại qua 10.000 Eloquent models. Khi sử dụng các Laravel collections truyền thống, tất cả 10.000 Eloquent models phải được tải vào bộ nhớ cùng một lúc:
```
$users = App\User::all()->filter(function ($user) {
    return $user->id > 500;
});
```
Tuy nhiên, bắt đầu từ Laravel 6.0, phương thức query builder's cursor của trình tạo truy vấn đã được cập nhật để trả về một LazyCollection instance. Điều này cho phép bạn chỉ chạy một truy vấn duy nhất đối với cơ sở dữ liệu mà vẫn giữ một Eloquent model được tải trong bộ nhớ tại một thời điểm. Trong ví dụ này, filter callback không được thực thi cho đến khi chúng tôi lặp lại qua từng người dùng, cho phép giảm đáng kể việc sử dụng bộ nhớ:
```
$users = App\User::cursor()->filter(function ($user) {
    return $user->id > 500;
});

foreach ($users as $user) {
    echo $user->id;
}
```
### 6. Cải tiến truy vấn phụ(Eloquent Subquery)
Laravel 6.0 giới thiệu một số cải tiến mới để hỗ trợ truy vấn cơ sở dữ liệu(database subquery). Ví dụ: chúng ta có một bảng destinations và một bảng flights. Các bảng flights chứa một cột arrived_at chỉ chuyến bay đến địa điểm nào.
Sử dụng chức năng Eloquent Subquery mới trong Laravel 6.0, chúng ta có thể chọn tất cả destinations và tên của chuyến bay gần đây nhất đã đến đích đó bằng một truy vấn duy nhất:
```
return Destination::addSelect(['last_flight' => Flight::select('name')
    ->whereColumn('destination_id', 'destinations.id')
    ->orderBy('arrived_at', 'desc')
    ->limit(1)
])->get();
```
Ngoài ra, có thể sử dụng các tính năng truy vấn phụ mới dùng trong chức năng orderBy của trình tạo truy vấn để sắp xếp tất cả các điểm đến dựa trên thời điểm chuyến bay cuối cùng đến đích. Điều này có thể được thực hiện trong khi thực hiện một truy vấn duy nhất đối với cơ sở dữ liệu:
```
return Destination::orderByDesc(
    Flight::select('arrived_at')
        ->whereColumn('destination_id', 'destinations.id')
        ->orderBy('arrived_at', 'desc')
        ->limit(1)
)->get();
```
## Kết Luận.
Qua bàI viết vừa rồi mình đã giới thiệu các tính năng mới có trong phiên bản laravel 6.0. Hy vọng có thể giúp các bạn nắm bắt được những kiến thức này để áp dụng vào trong các dự án có sử dụng laravel 6.0
## Tài liệu tham khảo
[(https://laravel.com/docs/6.x/releases)]
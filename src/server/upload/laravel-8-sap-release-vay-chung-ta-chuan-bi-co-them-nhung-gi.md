Theo https://laravel-news.com/laravel-8-release-date thì laravel 8 sẽ được ra mắt vào ngày 8/9 tới đây. Team phát triển của laravel sẽ release bản mới 6 tháng 1 lần với những thay đổi quan trọng. Trong bản update lần này sẽ có rất nhiều thay đổi và cải tiến

# Job Batching
Giờ batching job sẽ dễ dàng hơn với `Bus::batch()`. Bạn chỉ cần truyền tất cả các job vào trong `Bus::batch()` và hãy xem điều kì diệu nhé

```php
Bus::batch([
    new Job1(),
    new Job2()
])->then(function (Batch $batch) {
    if ($batch->hasFailures()) {
        // die
    }
})->success(function (Batch $batch){
	//invoked when all job completed

})->catch(function (Batch $batch,$e){
	//invoked when first job failure

})->allowFailures()->dispatch();
```

và đây sẽ là kết quả trả về

![](https://images.viblo.asia/f783d5db-fd95-4fa9-914d-6a61478dea02.PNG)

Bạn có thể tìm kiếm thông tin của batch bằng `Bus::findBatch(batchId)`

# Thư mục model mới
Giờ trong bản 8, thư mục mặc định của model sẽ là `app/Models` chứ không còn được tạo mặc định ở `app` nữa

# Laravel Jetstream
Đây là một package mới của laravel 8 và nó sẽ mang tới cho bạn khởi đầu tuyệt vời hơn. Nó mang rất nhiều tính năng như: quản lý người dùng, xác thực 2 yếu tố, quản lý các phiên trình duyệt,  quản lý api token, ... Còn rất nhiều thứ nữa các bạn có thể tìm hiểu thêm ở đây:
https://github.com/laravel/jetstream

# Laravel factory
Giờ đây chúng ta có thể seed dữ liệu từ model một cách dễ dàng hơn với sự cải tiến mới của factory. 

```php
Route::get('test-factory',function(){
   return User::factory()->create();
});
```

```php
Route::get('test-factory',function(){
   return User::factory()->times(10)->create();
});
```

# Migration Squashing
Giờ chúng ta sẽ có câu lệnh mới `php artisan schema:dump` . Chắc hẳn trong khi build dự án, việc liên tục tạo ra các file migrations sẽ khiến cho folder đó có vô cùng nhiều file. Và bạn có thể `squash` tất cả các file migrations vào 1 file sql.

# Nâng cấp rate limiting
Rate limiters được định nghĩa bởi `RateLimiter`. Phương thức `for` nhận vào tên và `Closure` trả về thiết lập được áp dụng cho route

```php
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Support\Facades\RateLimiter;

RateLimiter::for('global', function (Request $request) {
    return Limit::perMinute(1000);
});
```

# Time Testing Helpers
Khi tiến hành test, bạn có thể dễ dàng "du hành thời gian" với tính năng mới này của Laravel

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

# Dynamic Blade Components
Nếu bạn có nhiều components và mỗi một thời điểm khác nhau bạn cần gọi tới một components khác nhau thì đây sẽ là một tính năng giúp ích cho bạn
```php
<x-dynamic-component :component="$componentName" />
```

# Nâng cấp Maintenance Mode
Trong các phiên bản trước, khi ở chế độ maintenance thì vẫn có thể truy cập vào app bằng việc thiết lập một danh sách địa chỉ IP được phép truy cấp. Ở bản cập nhập này thì tính năng đó đã được loại bỏ và thay vào đó là sử dụng `secret`

Khi ở chế độ maintenance, bạn có thể đưa vào 1 bypass token:
```
php artisan down --secret="1630542a-246b-4b66-afa1-dd72a4c43515"
```

Và sau đó bạn có thể truy cập vào app bằng cách
```
https://example.com/1630542a-246b-4b66-afa1-dd72a4c43515
```

Bạn cũng có thể đưa vào thêm các options khác
```
php artisan down --redirect=/ --status=200 --secret=1630542a-246b-4b66-afa1-dd72a4c43515 --render="errors::503"
```

Đoạn này có ý nghĩa là:
 * Đưa app về chế độ maintenance
* Redirect tất cả các routes về `/`
*  Đặt status code là 200
*  Đặt bypass token là `1630542a-246b-4b66-afa1-dd72a4c43515`
*  Render errors 503

# Nâng cấp `serve`
Trong bản 8, laravel đã support chúng ta restart lại app mỗi khi `.env` có sự thay đổi. Việc này sẽ giúp chúng ta không phải chạy lại `php artisan serve` mỗi lần thay đổi `.env` nữa.


Ở đây mình chỉ nêu ra một số thay đổi, vẫn còn thêm vài thay đổi nữa, bạn có thể tìm đọc thêm ở link dưới nhé

Nguồn: https://laravel.com/docs/8.x/releases#laravel-8
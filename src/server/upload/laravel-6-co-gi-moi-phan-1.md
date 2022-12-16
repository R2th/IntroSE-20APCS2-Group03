### What's new?

**Semantic versioning**

Mặc dù nhảy thẳng từ 5,8 đến 6,0 là một bản release lớn, Otwell đã đề cập về các tính năng và thay đổi mới, bản cập nhật này sẽ có cảm giác giống như chuyển từ 5,8 đến 5,9.

Laravel đã có những cập nhật lớn với mỗi phiên bản release chính, đó là điển hình trong một framework trẻ. Tất cả các bản cập nhật trong suốt version 5.x đã đặt nền tảng cho một framework ổn định và mạnh mẽ. Tiếp tục với 6.0, bạn sẽ không phải lo lắng nhiều về những thay đổi lớn và viết lại với mỗi bản release mới. Vì tính ổn định mới này, Laravel framework package chính thức áp dụng [sematic versioning](https://semver.org/) truyền thống hơn.

**Job middleware**

Thay vì thêm thủ công boilerplate code xung quanh jobs của bạn, bây giờ bạn có thể *extract it into middleware* và sau đó chỉ cần gắn nó vào job!

Ví dụ này cho thấy cách bạn có thể thêm rate limiting cho một job trước 6.0. Bạn sẽ thêm nó vào phương thức ```handle()``` của job cho mỗi job request nó.

```
// app/Jobs/JobToBeThrottled.php
// Execute the job
public function handle() {
  // allow one job to process every 5 seconds
  Redis::throttle('key')->block(0)->allow(1)->every(5)->then(function () {
    // Handle the job
  }, function () {
    // Could not obtain lock
    return $this->release(5);
  });
}
```

Với bản release mới này, chúng ta có thể extract code đó ra khỏi ```handle()``` và chuyển nó thành một middle dành riêng cho job-specific. Bạn có thể tạo một thư mục trong ```app/Jobs/Middleware``` (hoặc bất cứ nơi nào bạn muốn, Laravel không rằng buộc về việc này) và thêm một file cho middleware trong thư mục đó.

```
// app/Jobs/Middleware/RateLimited.php
...
namespace App\Jobs\Middleware;
use Illuminate\Support\Facades\Redis;

class RateLimited {
  // Process the queued job.
  public function handle($job, $next) {
    Redis::throttle('key')
      ->block(0)->allow(1)->every(5)
      ->then(function () use ($job, $next) {
        // Lock obtained
        $next($job);
      }, function () use ($job) {
        // Could not obtain lock
        $job->release(5);
      });
  }
}
```

Bây giờ bạn có thể đính kèm middleware này vào job và nó sẽ chạy qua phần mềm trung gian trước khi xử lý. Nếu bạn quen thuộc với route middleware, quá trình này rất tương tự.

```
// app/Jobs/JobToBeThrottled.php
use App\Jobs\Middleware\RateLimited;

// get the middleware that the job will use
public function middleware() {
  return [new RateLimited];
}

public function handle() {
  // handle the job
}
```

Điều này sẽ giữ cho các job file của bạn ```nhỏ, dễ đọc hơn và tập trung vào nhiệm vụ cụ thể của nó```. Nó cũng sẽ cho phép bạn dễ dàng sử dụng lại middleware trong suốt các job.

**Lazy collections**

Laravel 6.0 giới thiệu về lazy collections, sẽ cho phép bạn ```giữ mức sử dụng bộ nhớ thấp``` khi xử lý dữ liệu nặng.

Nếu bạn đang làm việc với các Eloquent model, bạn có thể chọn tải một model vào bộ nhớ cùng lúc thay vì mọi thứ cùng một lúc bằng cách sử dụng phương thức ```cursor()``` thay vì ```all()```.

```
// This loads all eloquent models into memory at the same time
// This may be a very large number if you have thousands of posts

$posts = App\Post::all()->filter(function ($post) {
    return $post->id > 500;
});
```

Bằng cách chuyển từ ```all()``` sang ```cursor()```, chỉ có một eloquent model được tải vào bộ nhớ tại một thời điểm vì ```cursor()``` sử dụng ```LazyCollection``` instance mới.

```
$posts = App\Post::cursor()->filter(function ($post) {
  return $post->id > 500;
});

foreach ($posts as $post) {
  echo $post->id;
}
```

**Eloquent subquery enhancements**

Eloquent luôn giúp việc chạy các truy vấn phức tạp trở nên dễ dàng hơn. Bản release mới này cung cấp cho bạn nhiều trợ giúp hơn khi chạy các subquery hoặc query trong một query, trong single call. Điều này hữu ích khi bạn cần chọn thông tin từ hai bảng có mối relationship. Trong Laravel 5.x đôi khi bạn bị giới hạn với những gì bạn có thể làm trong subquery và thường sẽ bị buộc phải xâu chuỗi truy vấn bằng cách sử dụng ```DB::raw()```.

Phương thức ```addSelect()``` đã được thêm vào các subquery, điều này sẽ giúp loại bỏ rất nhiều sự khó khăn! Các subquery giờ cũng sẽ có quyền truy cập vào ```orderBy```.

Trong ví dụ này, hãy tưởng tượng bạn có 2 bảng: ```hotels``` và ```reservations```. Bạn muốn biết loại room gần đây nhất đã được đặt cho một khách sạn cụ thể. Thay vì thực hiện hai eloquent queries riêng biệt, giờ đây bạn có thể thực hiện việc này:

```
use App\Reservation;
use App\Hotel;

return Hotel::addSelect(['last_booked_room' => Reservation::select('room_type')
  ->whereColumn('hotel_id', 'hotels.id')
  ->orderBy('created_at', 'desc')
  ->latest()
  ->limit(1)  
])->get();
```

**Improved custom authorization responses**

Nếu bạn đang sử dụng authentication bên ngoài của Laravel với các fate cho authorization, thì Laravel 6.0 giới thiệu một phương thức mới ```Gate::inspect```. Điều này giúp dễ dàng cung cấp tin nhắn tùy chỉnh cho người dùng trong các authorization request, chẳng hạn như thông báo lỗi cụ thể nếu request của họ bị từ chối.

Ví dụ, giả sử bạn có phương pháp bên dưới để xác định xem người dùng có được phép chỉnh sửa bài đăng hay không. Trước 6.0, rất khó để lấy lại tin nhắn này và hiển thị lại cho người dùng.

Với việc giới thiệu phương thức ```Gate::inspect()```, giờ đây bạn có thể dễ dàng truy xuất toàn bộ response tùy chỉnh để gửi lại cho người dùng.

Nếu bạn muốn giới hạn việc chỉnh sửa bài đăng chỉ cho người dùng có role admin, bạn có thể đã tạo gate definition để chỉnh sửa bài đăng.

```
// App/Providers/AuthServiceProvider.php
...

public function boot()
{
    $this->registerPolicies();

    // Define the gate that determines who can edit posts
    Gate::define('edit', function ($user) {
        return $user->isAdmin
          ? Response::allow()
          : Response::deny('You must be an administrator to edit posts.');
    });
}
```

Thông thường bạn sẽ chỉ sử dụng phương thức ```allows``` hoặc ```denies``` để xem liệu người dùng đó có được phép thực hiện một hành động hay không. Response phụ thuộc vào phản hồi boolean từ phương thức ```Gate::define``` ở trên. Ví dụ sau đây sẽ không cung cấp cho bạn response tùy chỉnh, chỉ là boolean.

```
if (Gate::allows('edit')) {
  // let the user edit
}

if (Gate::denies('edit')) {
  // let the user edit
}
```

Nếu bạn muốn truy cập thêm denial response trùy chỉnh chi tiết hơn, bán có thể sử dụng ```Gate::inspect```.

```
// get the full authorization response returned by the gate
$response = Gate::inspect('edit');

if ($response->allowed()) {
  // Let the user edit the post
} else {
  // Display the denial message
  // 'You must be an administrator to edit posts.'
  echo $response->message();
}
```

Auth0 cũng cung cấp một cách đơn giản và nhanh gọn để [add authorization](https://auth0.com/docs/quickstart/backend/laravel/01-authorization) vào Laravel API của bạn.

**Laravel UI composer package**

Một cập nhật khác cần lưu ý là extraction của package ```laravel/ui```. Khung Front-end vẫn sẽ [tồn tại](https://github.com/laravel/ui), nó chỉ không được included theo mặc định. Điều này có nghĩa là trong một ứng dụng Laravel 6.0, bạn sẽ không thấy bất kỳ một khung Vue hoặc Bootstrap nào.

Package này bao gồm các cài đặt trước cho React, Vue và Bootstrap. Trong một tweet vào tháng 5, Otwell đề cập rằng anh ấy cũng đang cân nhắc thêm tùy chọn [Tailwind](https://tailwindcss.com/)!

Nếu bạn vẫn thích nó được included, bạn có thể mang nó trở lại với ```composer require laravel/ui``` command.

**New branding**

Với mỗi bản release chính, cũng đã có thương hiệu mới đi kèm với nó, và 6.0 cũng không ngoại lệ!

![](https://images.viblo.asia/f6837193-36d5-4288-ab22-b6807db08d7f.png)

Ngoài logo mới ở trên, bạn cũng có thể tìm thấy một thiết kế lại mới của trang web Laravel.com.

![](https://images.viblo.asia/4e7d177e-a795-4a94-8d67-427e5a967e00.png)


**Laravel Vapor**

Và cuối cùng nhưng không kém phần quan trọng, việc release Laravel 6.0 cũng bao gồm việc ra mắt một sản phẩm được mong đợi nhiều trong hệ sinh thái Laravel - [Laravel Vapor](https://vapor.laravel.com/).

![](https://images.viblo.asia/1b764aa0-25cd-403a-b140-e310cf00234c.png)


Trước khi release, hầu hết mọi người đã sử dụng [Laravel Forge](https://forge.laravel.com/) để cung cấp và triển khai các ứng dụng của họ. Với Forge, bạn có thể kết nối máy chủ đã chọn (Digital Ocean, AWS, v.v.) và Forge sẽ cung cấp cụ thể cho ứng dụng Laravel của bạn. Điều này là tuyệt vời, tất nhiên, nhưng bạn vẫn phải quản lý cập nhật cho chính mình.

Laravel Vapor làm tất cả những điều này và hơn thế nữa. Thay vì tự mình quản lý và cập nhật máy chủ cho ứng dụng Laravel của mình, Vapor hoàn toàn không có máy chủ (serverless)!

Điều này không có nghĩa là không có máy chủ liên quan, nó chỉ có nghĩa là bạn không phải đối phó với chúng. Một lợi ích khác là bạn chỉ trả tiền cho những gì bạn sử dụng. Thay vì trả một mức giá cố định hàng tháng, bạn chỉ bị tính phí khi request được gửi đến ứng dụng của bạn. Điều này cũng có nghĩa là bạn không phải lo lắng về việc mở rộng quy mô, vì nó sẽ tự động được thực hiện cho bạn.

*Dưới đây là một số tính năng tuyệt vời mà Vapor cung cấp:*

* On-demand scaling - Can execute jobs immediately as they come in
* Powered by AWS
* Ready for bursts of traffic
* Zero downtime during deployment
* Extremely fast
* Multiple environments with free vanity URL for testing (https://snowy-hurricane-12349834324432.vapor.build)
* Maintenance mode
* Searchable logs
* Create and scale your databases from Vapor
* Backup and restore databases
* Metrics and monitoring with notifications
* Purchase domains and manage DNS from Vapor dashboard
* Automatically added SSL certificates
* Jobs, workers, PHP updates, and more are handled behind the scenes
* Deployment easily configured with a simple vapor.yaml file

Chi phí cho tất cả điều này là $39 mỗi tháng hoặc $399 mỗi năm với số thành viên nhóm và dự án không giới hạn. Hãy nhớ rằng, bạn vẫn phải trả chi phí AWS của riêng bạn ngoài điều đó.

***Tài liệu tham khảo:*** https://auth0.com/blog/whats-new-in-laravel-6/
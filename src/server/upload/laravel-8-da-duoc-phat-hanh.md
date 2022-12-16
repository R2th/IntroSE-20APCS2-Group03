**Laravel 8** hiện đã được phát hành và bao gồm nhiều tính năng mới bao gồm Laravel Jetstream, thư mục mô hình, các lớp nhà máy mô hình, thu gọn di chuyển, cải tiến giới hạn tốc độ, trình trợ giúp kiểm tra thời gian, các thành phần lưỡi dao động và nhiều tính năng khác. Trong bài này chúng ta sẽ cùng tìm hiểu một số các tính năng và thay đổi mới nhé.

### Laravel Jetstream
Laravel Jetstream cải thiện dựa trên giao diện người dùng Laravel hiện có trong các phiên bản trước. Nó cung cấp điểm khởi đầu cho các dự án mới, bao gồm đăng nhập, đăng ký, xác minh email, xác thực hai yếu tố, quản lý phiên, hỗ trợ API qua Laravel và quản lý nhóm.

### Models Directory
Bộ khung của các app sử dụng Laravel 8 bao gồm một thư mục **app/Models** . Tất cả những câu lệnh tự động sinh ra các models sẽ được lưu trong thư mục đó. Tuy nhiên nếu thực mục **app/Models** không tồn tại các models đó sẽ được lưu trong **app/** folder.

### Model Factory Classes
Eloquent model factory hiện tại sẽ dựa trên lớp học từ Laravel 8 với việc hỗ trợ các mối quan hệ giữa các factories. Đây sẽ là một thay đổi tuyệt vời cho việc sinh ra và nâng cấp các bảng ghi trong model factory.
```
use App\Models\User;

User::factory()->count(50)->create();

// using a model state "suspended" defined within the factory class
User::factory()->count(5)->suspended()->create();
```

### Migration Squashing
Nếu app của bạn có nhiều file migrations, hiện tại bạn có thể tách chúng thành các file sql riêng lẻ . Những file này sẽ được chạy đầu tiên khi chúng ta chạy lệnh migration, sau đó sẽ đến những file còn lại không phải dạng sql file.Việc này giúp nâng cao tốc độ khi chạy test

### Improved Rate Limiting
Laravel 8 mang đến những cải tiến cho chức năng giới hạn tốc độ hiện có đồng thời hỗ trợ khả năng tương thích ngược với phần mềm trung gian tiết lưu hiện có và cung cấp tính linh hoạt hơn nhiều. Laravel 8 có khái niệm Giới hạn tỷ lệ mà bạn có thể xác định thông qua facade:
```
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Support\Facades\RateLimiter;

RateLimiter::for('global', function (Request $request) {
    return Limit::perMinute(1000);
});
```

### Time Testing Helpers
Người dùng Laravel có toàn quyền kiểm soát việc sửa đổi theo thời gian thông qua thư viện Carbon PHP tuyệt vời. Laravel 8 đưa điều này tiến thêm một bước nữa bằng cách cung cấp các trình trợ giúp kiểm tra thuận tiện để thao tác thời gian trong tests:
```
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

// Travel to an exact time...
$this->travelTo(now()->subHours(6));

// Return back to the present time...
$this->travelBack();
```

Trên là một số thay đổi của Laravel 8 tuy nhiên vẫn còn các thứ khác. Bạn có thể tham khảo thêm tại https://laravel.com/docs/8.x/releases

Bài viết được dịch và tham khảo tại: https://laravel-news.com/laravel8
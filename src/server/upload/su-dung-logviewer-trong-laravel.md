Laravel có 1 hệ thống logging rất dễ dàng sử dụng được lưu trong dưới dạng 1 file txt log. Nhưng đó cũng chính là nhược điểm của text file.
Nó khá khó khăn cho các developer để đọc, tìm kiếm các lỗi, thông tin cần thiết. LogViewer đã giải quyết được các vấn đề đó, biến text log file thành giao diện người dùng trực quan sinh động

Log file trước khi dùng LogViewer
![](https://res.cloudinary.com/practicaldev/image/fetch/s--fUkjfPHv--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://www.codewall.co.uk/wp-content/uploads/2019/09/log-example.png)

Sau khi dùng LogViewer có giao diện
![](https://res.cloudinary.com/practicaldev/image/fetch/s--KUrPQjxM--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://www.codewall.co.uk/wp-content/uploads/2019/09/log-viewer-screenshot1.png)
![](https://res.cloudinary.com/practicaldev/image/fetch/s--ZJl35SRu--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://www.codewall.co.uk/wp-content/uploads/2019/09/log-viewer-screenshot3.png)
![](https://res.cloudinary.com/practicaldev/image/fetch/s--BzOzI3Ny--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://www.codewall.co.uk/wp-content/uploads/2019/09/log-viewer-screenshot2.png)

### Cài đặt LogViewer
Chạy command
```
composer require arcanedev/log-viewer:~4.7.0
```

### Cấu hình
**Với laravel > 5.5**
- Chỉnh sửa file môi trường `.env` `LOG_CHANNEL=daily`
- Publish cấu hình logviewer bằng command: `php artisan log-viewer:publish`

**Với laravel <=5.5**

- Chỉnh sửa `APP_LOG=daily` trong file .env
- Thêm dòng code `Arcanedev\LogViewer\LogViewerServiceProvider::class,` vào  array `providers` trong file `config/app.php`
- Và cuối cùng cũng chạy command để publish cấu hình logviwer: `php artisan log-viewer:publish`

### Chạy Logviewer
Để view log laravel bằng Logviewer bạn access qua đường link: http://yourrooturl/log-viewer (ex: http://127.0.0.1:8000/log-viewer).
Ta sẽ thấy giao diện Logviewer dưới đây
![](https://res.cloudinary.com/practicaldev/image/fetch/s--KUrPQjxM--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://www.codewall.co.uk/wp-content/uploads/2019/09/log-viewer-screenshot1.png)

Logviewer có nhiều loại theo mức độ từ cao đến thấp:
- Emergency
- Alert
- Critical
- Warning
- Notice
- Info
- Debug

Thử tạo một số ví dụ cho các loại log trên
```
use Illuminate\Support\Facades\Log;
.
.
.

public function index() {
            Log::alert("This is a new Alert!");
            Log::critical("This is a critical error message");
            Log::debug("This is a debug message");
            Log::emergency("There is an emergency! Help!?!?!?!");
            Log::error("Houston, we have an error");
            Log::info("An informative message");
            Log::notice("Notice!");
            Log::warning("Be warned, be very warned");
            
            return view('home.index');
 }
```
Sau đó load lại trang index để cho hệ thống thực hiện việc log các thông tin. 
Reload lại Logviewer ta được kết quả
![](https://res.cloudinary.com/practicaldev/image/fetch/s--LRZv0hPX--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://www.codewall.co.uk/wp-content/uploads/2019/09/dashboard-full-of-logs.png)
![](https://res.cloudinary.com/practicaldev/image/fetch/s--jcPYQzY1--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://www.codewall.co.uk/wp-content/uploads/2019/09/log-viewer-full-logs.png)
![](https://res.cloudinary.com/practicaldev/image/fetch/s--IJbl5mJ_--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://www.codewall.co.uk/wp-content/uploads/2019/09/emergency-logs-detail.png)

Như các bạn thấy Logviewer rất tiện lợi, không chỉ giúp ích cho các developer mà nó còn rất hữu ích cho các nhà kiểm thử (tester) để dễ dàng hơn trong việc đảm bảo chất lượng của dự án
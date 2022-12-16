Bài viết sau nói về vòng đời của một Request trong Laravel 8. Hi vọng bài viết sẽ giúp bạn có thêm cái nhìn tổng quan tốt hơn về kiến trúc của framework tuyệt vời này! Let's dive into the sea!
![](https://images.viblo.asia/71fd05b2-c2a6-43fd-a7ef-7cbaf7238949.jpg)

## First step
Điểm bắt đầu của tất cả request trong một ứng dụng Laravel là tệp **public / index.php**. Tất cả các request được chuyển hướng đến tệp này bởi web server (Apache / Nginx) của bạn. Tệp **index.php** không chứa nhiều code. Đúng hơn, nó là một điểm khởi đầu để tải phần còn lại của framework. Cùng xem trong tệp này có gì nhé
 ```php
 require __DIR__.'/../bootstrap/autoload.php';
 ```
Đầu tiên, nó sẽ include composer autoload (tệp này sẽ tự động tạo lớp loader cho ứng dụng).
```php
$app = require_once __DIR__.'/../bootstrap/app.php';
```
Sau đó truy xuất một instance của ứng dụng Laravel từ **bootstrap / app.php**. Hành động đầu tiên do chính Laravel thực hiện là tạo một thể hiện của ứng dụng / service container.
## HTTP / Console Kernels
Tiếp theo, request sẽ được xử lý bởi kernel. Có hai loại kernel trong Laravel là HTTP kernel và Console kernel. Tùy thuộc vào loại request sẽ được gửi đến kernel nào. Hai kernel này đóng vai trò là vị trí trung tâm mà tất cả các request đều chạy qua. Bây giờ, chúng ta hãy chỉ tập trung vào HTTP kernel, nằm trong **app / Http / Kernel.php**.
```php
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);

$response = $kernel->handle(
    $request = Illuminate\Http\Request::capture()
);

$response->send();

$kernel->terminate($request, $response);
```

HTTP kernel kế thừa lớp **Illuminate\Foundation\Http\Kernel** , lớp này định nghĩa một mảng **bootstrappers** sẽ được chạy trước khi request được thực thi. Các bootstrappers này cấu hình error handling, logging, tìm môi trường của ứng dụng và thực hiện các tác vụ cần thiết khác trước khi request thực sự được xử lý. Thông thường, các lớp này xử lý cấu hình Laravel nội bộ mà bạn không cần phải lo lắng.


HTTP kernel cũng xác định danh sách HTTP **middleware** mà các request phải đi qua trước khi được ứng dụng xử lý. Các middleware này xử lý việc đọc và ghi HTTP session, xác định xem ứng dụng có đang ở chế độ duy trì hay không, xác minh CSRF token,... 


Chữ ký của phương thức ```handle``` trong HTTP kernel khá đơn giản: nó nhận một Request và trả về một Response.

## Service Providers
Một trong những nhiệm vụ quan trọng nhất của kernel bootstrapping là tải các service providers cho ứng dụng. Tất cả service providers cho ứng dụng đều được định cấu hình trong mảng **providers** của tệp cấu hình **config / app.php**.


Laravel sẽ duyệt qua danh sách providers này và khởi tạo từng provider. Sau khi khởi tạo các providers, phương thức ```register``` sẽ được gọi trên tất cả các providers rồi đến phương thức ```boot```.
Bằng cách gọi phương thức ```register``` của mọi nhà cung cấp dịch vụ trước, các nhà cung cấp dịch vụ có thể phụ thuộc vào mọi container binding đang được đăng ký và khả dụng vào thời điểm phương thức ```boot``` được thực thi.


Service providers chịu trách nhiệm khởi động tất cả các components khác nhau của framework, như database, queue, validation và routing. Về cơ bản, mọi tính năng chính do Laravel cung cấp đều được khởi động và cấu hình bởi service provider. Do đó, đây là khía cạnh quan trọng nhất của toàn bộ quá trình bootstrap.


## Routing
Một trong những service provider quan trọng nhất là **App \ Providers \ RouteServiceProvider**. Service provider này tải các file route có trong thư mục **routes** của ứng dụng. Hãy mở code của **RouteServiceProvider** và xem nó hoạt động như thế nào!


Khi ứng dụng đã được khởi động và tất cả service providers đã được đăng ký, Request sẽ được chuyển đến router để gửi. Router sẽ gửi request đến một route hoặc controller route middleware được chỉ định.


Middleware cung cấp một cơ chế thuận tiện để lọc hoặc kiểm tra các HTTP request gửi đến ứng dụng của bạn. Ví dụ: Laravel include một middleware xác minh xem người dùng ứng dụng của bạn có được xác thực hay không. Nếu người dùng không được xác thực, middleware sẽ chuyển hướng người dùng đến màn hình đăng nhập. Tuy nhiên, nếu người dùng được xác thực, middleware sẽ cho phép request đi sâu hơn vào ứng dụng.


Nếu request đi qua tất cả middleware được chỉ định, phương thức route hoặc controller sẽ được thực thi và  gửi lại response thông qua chuỗi middleware của route.


## Finishing Up
Khi route hoặc controller trả về một response, response sẽ truyền ngược ra ngoài thông qua middleware, tạo cơ hội cho ứng dụng sửa đổi hoặc kiểm tra response.
Cuối cùng, khi response qua middleware, phương thức ```handle``` của HTTP kernel sẽ trả về đối tượng response và tệp **index.php** gọi phương thức ```send```. Phương thức ```send``` sẽ gửi response đến trình duyệt web của người dùng. Kết thúc một request lifecycle trong Laravel!

## Tài liệu tham khảo
Tham khảo tại https://laravel.com/docs/8.x/lifecycle#focus-on-service-providers